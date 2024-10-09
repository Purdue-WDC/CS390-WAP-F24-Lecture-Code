function hasChanged(a, b) {
    return a !== b;
}

class State {
    constructor(initialValue) {
        this.value = initialValue;
        this.reactions = new Set();
    }

    setValue(newValue) {
        if (hasChanged(this.value, newValue)) {
            this.value = newValue;
            this.reactions.forEach(r => r.run());
        }
    }
}

class Effect {
    constructor(effectFn, dependencies) {
        this.effectFn = effectFn;
        this.dependencies = dependencies;

        this.dependencies.forEach(dep => dep.reactions.add(this));
    }

    run() {
        this.effectFn();
    }

    destroy() {
        this.dependencies.forEach(d => {
            d.reactions.delete(this)
        });
    }
}

class DerivedValue {
    constructor(computeValue, dependencies) {
        this.computeValue = computeValue;
        this.dependencies = dependencies;
        this.reactions = new Set();

        this.value = this.computeValue();

        this.dependencies.forEach(dep => dep.reactions.add(this));
    }

    run() {
        const newValue = this.computeValue();
        if (hasChanged(this.value, newValue)) {
            this.value = newValue;
            this.reactions.forEach(r => r.run());
        }
    }

    destroy() {
        this.dependencies.forEach(d => {
            d.reactions.delete(this)
        });
    }
}

function createAnchor() {
    const el = document.createElement("div");
    el.style.display = "none";
    return el;
}

export class Map {
    constructor(
        array,      // array state or derived value.
        props,      // props to provide to new component.
        renderFunc  // render function for new component.
    ) {
        this.array = array;
        this.props = props;
        this.renderFunc = renderFunc;
        this.endAnchor = createAnchor();
        this.childInsts = [];
    }

    mount(parentInst) {
        parentInst.createEffect(() => this.resync(), [this.array]);
        this.resync();
    }

    destroy() {
        while (this.childInsts.length) {
            this.removeChild();
        }
    }

    resync() {
        const childInsts = this.childInsts;
        const correctLength = this.array.value.length;

        while (childInsts.length < correctLength) {
            this.addChild();
        }
        while (childInsts.length > correctLength) {
            this.removeChild();
        }
    }

    addChild() {
        const childInst = new Component(this.props);
        this.childInsts.push(childInst);

        const itemIdx = this.childInsts.length - 1;
        const item = childInst.createDerived(() => this.array.value[itemIdx], [this.array]);
        childInst.render = this.renderFunc.bind(childInst, item, itemIdx);

        this.endAnchor.before(childInst.anchor);
        childInst.mount();
    }

    removeChild() {
        const childInst = this.childInsts.pop();
        childInst.destroy();
        childInst.anchor.remove();
    }
}

export class Condition {
    constructor(
        boolean,    // array state or derived value.
        props,      // props to provide to new component.
        renderFunc  // render function for new component.
    ) {
        this.boolean = boolean;
        this.childInst = new Component(props);
        this.childInst.render = renderFunc.bind(this.childInst);
    }

    mount(parentInst) {
        parentInst.createEffect(() => this.resync(), [this.boolean]);
        this.resync();
    }

    destroy() {
        if (this.childInst.rootEl) {
            this.childInst.destroy();
        }
    }

    resync() {
        const isMounted = this.childInst.rootEl;
        const toBeMounted = this.boolean.value;
        if (!isMounted && toBeMounted) {
            this.childInst.mount();
        } else if (isMounted && !toBeMounted) {
            this.childInst.destroy();
        }
    }
}

export class Component {
    constructor(props = {}) {
        this.props = props;
        this.anchor = createAnchor();
        this.childInsts = [];
        this.rootEl = undefined;

        this.states = [];
        this.derivedValues = [];
        this.effects = [];

        this.maps = [];
        this.conds = [];
    }

    createState(initialValue) {
        const newState = new State(initialValue);
        this.states.push(newState);
        return newState;
    }

    createEffect(effectFn, dependencies) {
        const newEffect = new Effect(effectFn, dependencies);
        this.effects.push(newEffect);
    }

    createDerived(computeValue, dependencies) {
        const newDerived = new DerivedValue(computeValue, dependencies);
        this.derivedValues.push(newDerived);
        return newDerived;
    }

    component(ChildClass, props = {}) {
        const inst = new ChildClass(props);
        this.childInsts.push(inst);
        return inst.anchor;
    }

    map(array, props, renderFunc) {
        const newMap = new Map(array, props, renderFunc);
        this.maps.push(newMap);
        return newMap.endAnchor;
    }

    condition(boolean, props, renderFunc) {
        const newCond = new Condition(boolean, props, renderFunc);
        this.conds.push(newCond);
        return newCond.childInst.anchor;
    }

    mount() {
        // attach to DOM.
        this.rootEl = this.render();
        this.anchor.replaceWith(this.rootEl);

        // mount children.
        this.childInsts.forEach(ch => ch.mount());

        // mount maps and conditional.
        this.maps.forEach(m => m.mount(this));
        this.conds.forEach(c => c.mount(this));

        this.onMount();
    }

    onMount() { }

    destroy() {
        this.onDestroy();

        // clean up maps and conditionals
        this.maps.forEach(m => m.destroy());
        this.conds.forEach(c => c.destroy());

        // clean up cyclic references in reactive objects.
        this.effects.forEach(e => e.destroy());
        this.derivedValues.forEach(dv => dv.destroy());

        // cleanup children.
        this.childInsts.forEach(c => c.destroy());

        // remove from DOM.
        this.rootEl.replaceWith(this.anchor);
        this.rootEl = undefined;
    }

    onDestroy() { }

    element(tag, props = {}, children = []) {
        const el = document.createElement(tag);
        for (const key in props) {
            const val = props[key];
            if (val instanceof State || val instanceof DerivedValue) {
                el[key] = val.value;
                this.createEffect(() => el[key] = val.value, [val]);
            } else {
                el[key] = val;
            }
        }
        el.append(...children);
        return el;
    };

    render() {
        return this.element("div");
    }
}

// ROUTING

// create new event listener to indicate path changes.
function triggerPathChangedEvent() {
    window.dispatchEvent(new Event("pathchanged"));
}

// if the user hits forward or back arrow, popstate triggers, meaning we want to trigger the pathchanged event. 
window.addEventListener("popstate", triggerPathChangedEvent)

// change path in url, and trigger path change.
export function redirect(newRoute) {
    window.history.pushState({}, "", newRoute);
    triggerPathChangedEvent();
}

export class Router extends Component {
    /**
     * @param {{ routes: Record<string, Component> }} props
     */
    constructor(props) {
        super(props);

        this.anchors = Object.values(props.routes).map(x => x.anchor);
        this.binded_sync_route = null;
        this.rendered_component = null;
    }

    syncRoute() {
        // destroy currently rendered component instance.
        if (this.rendered_component) {
            this.rendered_component.destroy();
            this.rendered_component = null;
        }
        // mount component instance that should be rendered.
        const new_path = window.location.pathname;
        const new_component = this.props.routes[new_path];
        new_component.mount();
        this.rendered_component = new_component;
    }

    onMount() {
        this.syncRoute();
        this.binded_sync_route = this.syncRoute.bind(this);
        window.addEventListener("pathchanged", this.binded_sync_route);
    }

    onDestroy() {
        window.removeEventListener("pathchanged", this.binded_sync_route);
    }

    render() {
        return this.element("div", { id: "page-container" }, this.anchors);
    }
}