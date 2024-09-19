// The class we will be implementing for our framework. 
// The reason we are using a class is because classes are
// templates for creating objects, and Components are
// templates for creating pieces of UI (instances), hence
// classes can. 
export class Component {
    constructor(props = {}) {
        // "this" refers to the new object we are creating.
        // So, this line add the key "props" to object with
        // the value of props. 
        this.props = props;
        this.anchor = element("div", { stlye: "display: none" });
        this.childInsts = [];
        this.rootEl = undefined;
    }

    // The function we want developers to use when trying
    // to render component instances within another component instance.
    component(ChildClass, props = {}) {
        const inst = new ChildClass(props);
        this.childInsts.push(inst);
        return inst.anchor;
    }

    // This is a functio we will call internally to control
    // when and if a component is rendered to the DOM.
    mount() {
        this.rootEl = this.render();
        this.anchor.replaceWith(this.rootEl);
        for (const childInst of this.childInsts) {
            childInst.mount();
        }
        this.onMount();
    }

    // This is a dud function in case the developer does
    // not override it in their classes that extend Component.
    onMount() {}

    // This is a functio we will call internally to control
    // when and if a component should be destroyed and removed
    // from the DOM.
    destroy() {
        this.onDestroy();
        for (const childInst of this.childInsts) {
            childInst.destroy();
        }
        this.rootEl.replaceWith(this.anchor);
        this.rootEl = undefined;
    }

    // This is another dud function in case the developer does
    // not override it in their classes that extend Component.
    onDestroy() {}

    // The idea is that the developer's component class overrides
    // this method, so this is just a placeholder implementation.
    // We could also decide to make this method throw an error
    // since this function shouldn't really execute.
    render() { return element("div"); }
}

// Function to dynamically build elements.
// Note: if we do "parameter = defaulValue", defaultValue will be
// the default value of the parameter, so element("div") becomes
// equivalent to element("div", {}, []).
export const element = (tag, props = {}, children = []) => {
    // create new element.
    const el = document.createElement(tag);
    // copy props onto the newly made element.
    for (const key in props) {
        el[key] = props[key];
    }
    // append all elements in children array to the element.
    // "..." is the spread operator and makes this line equivalent
    // to el.append(children[0], children[1], children[2], ...).
    el.append(...children);
    return el;
};