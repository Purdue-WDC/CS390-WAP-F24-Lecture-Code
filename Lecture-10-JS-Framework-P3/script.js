// We can import variables from other files.
import { element, Component } from './framework.js';

// This is an example component a developer might make.
// The idea is that a developer would inherit/extend from our
// Component class in order to use the functionality we provide.
class DevComponent extends Component {
    constructor(props) {
        // Since we extend the Component class, we need to
        // call the Component constructor via JS's super function.
        super(props);
    }

    // This is a function we allow developers to override.
    // The developer can put whatever code they want here.
    // A common use of this is fetching data from a server, then setting some state to it.
    onMount() {
        console.log("this component has mounted");
    }

    // This is a function we allow developers to override.
    // The developer can put whatever code they want here.
    // A common use of this is cleaning up things the developer create themselves.
    onDestroy() {
        console.log("this component has destroyed");
    }

    // If we declare a function with the same name as a 
    // function in extended class, it actually overrides
    // Component's render function. 
    render() {
        return element("div", { display: "flex" }, [
            // Using our component function, we can place child
            // component instances into our current component instance.
            
            // Note: currently, only the anchors of each component will
            // render. It is not until we call mount() on each child instance
            // that it will replace the anchor with what it is actually
            // supposed to render.
            this.component(DevChildComponent, { text: "child 1" }),
            this.component(DevChildComponent, { text: "child 2" })
        ]);
    }
}

// Example component a developer might create, then use in another
// component.
class DevChildComponent extends Component {
    constructor(props) {
        super(props);
    }

    onMount() {
        console.log("child component has mounted");
    }

    onDestroy() {
        console.log("child component has destroyed");
    }

    render() {
        return element("div", { textContent: this.props.text }, []);
    }
}

// Using the syntax new Class(constructor params),
// we can create instances of a class (a object), 
// which is a component in this case.
// const devCompInst = new DevComponent({ name: "hello" });

// // Add an element within the body element (app).
// const bodyEl = document.getElementsByTagName('body')[0];
// const appEl = document.createElement("div");
// appEl.textContent = "app";
// bodyEl.append(appEl);

// // Make app act as the anchor of the root component instance (so when it
// // mounts, it swaps the element it renders with an element already
// // in the DOM, thus attaching the root instance to the DOM). 
// devCompInst.anchor = appEl;
// devCompInst.mount();

// // Just to showcase that destroy() is functional. 
// setTimeout(() => {
//     devCompInst.destroy();
// }, 2000);