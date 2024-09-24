// This lecture, no changes were made to this code.

import { element, Component } from './framework.js';

class DevComponent extends Component {
    constructor(props) {
        super(props);
    }

    onMount() {
        console.log("this component has mounted");
    }

    onDestroy() {
        console.log("this component has destroyed");
    }

    render() {
        return element("div", { display: "flex" }, [
            this.component(DevChildComponent, { text: "child 1" }),
            this.component(DevChildComponent, { text: "child 2" })
        ]);
    }
}

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

// const bodyEl = document.getElementsByTagName('body')[0];
// const appEl = document.createElement("div");
// appEl.textContent = "app";
// bodyEl.append(appEl);

// const devCompInst = new DevComponent({ name: "hello" });
// devCompInst.anchor = appEl;
// devCompInst.mount();

// setTimeout(() => {
//     devCompInst.destroy();
// }, 2000);