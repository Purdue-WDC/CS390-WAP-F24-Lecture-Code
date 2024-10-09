import { Component, redirect, Router } from './framework.js';

// NOTE: Router requires running an http server from this lecture's directory.
// If you would like to run it yourself: https://stackoverflow.com/questions/38497334/how-to-run-html-file-on-localhost.

class PageTemplate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.element("div", {
            textContent: this.props.text
        });
    }
}

class Root extends Component {
    constructor() {
        super();

        this.routes = {
            "/": new PageTemplate({ text: "this is the home page" }),
            "/about": new PageTemplate({ text: "this is the about page" }),
            "/documentation": new PageTemplate({ text: "this is the documentation page" }),
        };
    }

    render() {
        const nav_buttons = Object.keys(this.routes).map(route => {
            return this.element("button", {
                textContent: route,
                onclick: () => redirect(route)
            })
        });
        const nav_props = { style: "display: flex; gap: 8px" };

        return this.element("div", {}, [
            // navigation bar
            this.element("div", nav_props, nav_buttons),
            // router
            this.component(Router, { routes: this.routes }),
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
console.log("hello")