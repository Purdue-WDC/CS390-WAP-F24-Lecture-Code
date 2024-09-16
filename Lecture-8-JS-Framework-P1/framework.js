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
    }

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

// Create test element and attach it to the DOM.
// const testEl = element("div", { display: "flex" }, [
//     element("h1", { innerText: "item 1" }, []),
//     element("h1", { innerText: "item 2" }, []),
// ]);
// const bodyEl = document.getElementsByTagName('body')[0];
// bodyEl.append(testEl)
// console.log(testEl)