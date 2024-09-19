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

    // If we declare a function with the same name as a 
    // function in extended class, it actually overrides
    // Component's render function. 
    render() {
        return element("div", { display: "flex" }, [
            element("h1", { innerText: "item 1" }, []),
            // Here we can use the provided prop by reading 
            // from the "props" key on the current object.
            element("h1", { innerText: this.props.name }, []),
        ]);
    }
}

// using the syntax new Class(constructor params),
// we can create instances of a class (a object).
const devCompInst = new DevComponent({ name: "hello" });
console.log(devCompInst.render());