import { Component } from './framework.js';

class Board extends Component {
    constructor() {
        super();

        this.board = this.createState([
            [".",".","O"],
            ["O",".","."],
            [".","X","."],
        ])

        setTimeout(() => {
            // Set the board to any value and observe the change!
            this.board.setValue([
                [".","O","O"],
                ["O","X","X"],
                ["X","X",".", "."],
            ])
        }, 1000)
    }

    render() {
        const containerProps = { style: "display: flex; flex-direction: column" };
        const rowProps = { style: "display: flex" };
        const cellProps = { style: "border: 1px solid black;  width: 20px; height: 20px;" };

        return this.element("div", containerProps, [
            this.map(this.board, {}, function(row) {
                return this.element("div", rowProps, [
                    this.map(row, {}, function(cell) {
                        const isOccupied = this.createDerived(() => cell.value !== ".", [cell]);

                        return this.element("div", cellProps, [
                            this.condition(isOccupied, {}, function() {
                                return this.element("div", { textContent: cell })
                            })
                        ]);
                    })
                ]);
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
            this.component(Board)
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