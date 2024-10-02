import { Component } from './framework.js';

class Example extends Component {
    constructor() {
        super();

        this.arr = this.createState([
            "item 1",
            "item 2",
            "item 3"
        ]);
        
        setTimeout(() => {
            // this.bool.setValue(true);
            this.arr.value[2] = "item 4";
            this.arr.setValue(this.arr.value);
        }, 1000);
    }

    render() {
        return this.element("div", {}, [
            this.map(this.arr, {}, function(item, idx) {
                return this.element("div", {
                    textContent: item
                })
            })
        ]);
    }
}

class Root extends Component {
    constructor() {
        super();
    }

    // Make sure to edit this so it renders your components.
    render() {
        return this.element("div", {}, [
            this.component(Example)
        ]);
    }
}

// DO NOT REMOVE THE CODE BELOW.
// It creates an instance of the root component and mounts it to the DOM.

const bodyEl = document.getElementsByTagName('body')[0];
const rootAnchorEl = document.createElement("div");
bodyEl.append(rootAnchorEl);

const rootCompInst = new Root();
rootCompInst.anchor = rootAnchorEl;
rootCompInst.mount();