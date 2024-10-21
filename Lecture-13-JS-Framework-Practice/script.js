import { Component } from './framework.js';

// To use this example, make sure this component is rendered in the root component.
class MapExample extends Component {
    constructor() {
        super();

        this.arr = this.createState([
            "item 1",
            "item 2",
            "item 3"
        ]);
        
        // Trigger an update after a second so we can see the DOM update dynamically.
        setTimeout(() => {
            // Because hasChanged is implemented as it is,
            // here we can mutate/modify the existing array and observe updates. 
            this.arr.value[2] = "item 3 (edited)";
            this.arr.value.push("item 4");
            this.arr.setValue(this.arr.value);
        }, 1000);
    }

    render() {
        return this.element("div", {}, [
            this.map(this.arr, {}, function(item, idx) { // item is a derived value of array
                return this.element("div", {
                    textContent: item // Since we use it here, if array is modified such that item changes value, we can observe the update.  
                })
            })
        ]);
    }
}

// To use this example, make sure this component is rendered in the root component.
class ConditionExample extends Component {
    constructor() {
        super();

        this.showText = this.createState(false);
        
        // Trigger updates after some time so we can see the DOM update dynamically.
        setTimeout(() => {
            this.showText.setValue(false);
            setTimeout(() => {
                this.showText.setValue(true);
            }, 1000);
        }, 1000);
    }

    render() {
        return this.element("div", {}, [
            this.condition(this.showText, {}, function() {
                return this.element("div", {
                    textContent: "hello"  
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
            // this.component(MapExample),
            this.component(ConditionExample),
        ]);
    }
}

// DO NOT REMOVE THE CODE BELOW.
// It creates an instance of the root component and mounts it to the DOM.

document.addEventListener("DOMContentLoaded", () => {
    const bodyEl = document.getElementsByTagName('body')[0];
    const rootAnchorEl = document.createElement("div");
    bodyEl.append(rootAnchorEl);
    
    const rootCompInst = new Root();
    rootCompInst.anchor = rootAnchorEl;
    rootCompInst.mount();
});