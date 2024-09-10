// Element references.
let parentEl;
let allowPropEl;
let stopPropEl;
let stopImediatePropEl;

// Since the script may run before our HTML finishes rendering,
// we must wait until the onDOMContentLoaded event is triggered
// in order to save a reference to each element.
// Note: We could have also used window.onload, but this also waits
// for styling, images, iframes, etc. to finished loading as well.
document.addEventListener("DOMContentLoaded", () => {
    parentEl = document.getElementById("parent");
    allowPropEl = document.getElementById("allowPropButton");
    stopPropEl = document.getElementById("stopPropButton");
    stopImediatePropEl = document.getElementById("stopImediatePropButton");

    initEventListeners();
});

const initEventListeners = () => {
    const els = [parentEl, allowPropEl, stopPropEl, stopImediatePropEl];

    // Note: 
    //   - First defined event is first executed. Placing this before or after the for-loop changes the execution order of same-element, same-phase events.
    //   - stopPropagation does NOT stop remaining same-element, same-phase event from executing.
    //   - Moving this to the capture phase shows how stopPropagation stops propagation beyond this element.
    stopPropEl.addEventListener('click', (event) => {
        console.log("stopPropagation()");
        event.stopPropagation();
    }, false);

    // Note:
    //   - stopImmediatePropagation DOES stop the remaining same-element, same-phase event from executing.
    //   - Otherwise, this function is similar to stopPropagation.
    stopImediatePropEl.addEventListener('click', (event) => {
        console.log("stopImmediatePropagation()");
        event.stopImmediatePropagation();
    }, false);

    // Add events for each element to mark the capturing and bubbling phases.
    for (const el of els) {
        el.addEventListener('click', () => console.log(el.id + " (capture phase)"), true);
        el.addEventListener('click', () => console.log(el.id + " (bubble phase)"), false);
    }
};