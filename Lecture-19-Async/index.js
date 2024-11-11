// function MakeTimeoutPromise(time, does_error) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (does_error) {
//                 reject("");
//             } else {
//                 resolve("some data");
//             }
//         }, time)
//     })
// }

let saved_reject;

const net_promise = new Promise((resolve, reject) => {
    saved_reject = reject;
    setTimeout(() => {
        resolve("some data");
    }, 1000)
});

setTimeout(() => {
    saved_reject("timeout err");
}, 5000)

// setTimeout(() => {
//     console.log(promise)
// }, 1500)