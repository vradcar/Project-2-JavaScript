"use strict";

function MakeMultiFilter(originalArray) {
    // Initialize currentArray with the originalArray
    let currentArray = originalArray;

    // Return the arrayFilterer function
    return function arrayFilterer(filterCriteria, callback) {
        // If filterCriteria is not a function, return the currentArray
        if (typeof filterCriteria !== 'function') {
            return currentArray;
        }

        // Apply the filterCriteria to currentArray
        currentArray = currentArray.filter(filterCriteria);

        // If a callback is provided and is a function, call it with the currentArray
        if (typeof callback === 'function') {
            callback.call(originalArray, currentArray);
        }

        // Return the arrayFilterer function itself to allow chaining
        return arrayFilterer;
    };
}



//  const arrayFilterer1 = MakeMultiFilter([1, 2, 3]);
// arrayFilterer1(function (elem) {
//     return elem !== 2; // check if element is not equal to 2
// }, function (currentArray) {
//     // 'this' within the callback function should refer to originalArray which is [1, 2, 3]
//     console.log(this); // prints [1, 2, 3]
//     console.log(currentArray); // prints [1, 3]
// });

// const arrayFilterer1 = MakeMultiFilter([1,3]);
// arrayFilterer1(function (elem) {
//     return elem !== 3; // check if element is not equal to 3
// });

// // Calling arrayFilterer1 with no filterCriteria should return the currentArray.
// const currentArray = arrayFilterer1();
// console.log('currentArray', currentArray); // prints [1] since we filtered out 2 and 3

// // Since arrayFilterer returns itself, calls can be chained
// function filterTwos(elem) { return elem !== 2; }
// function filterThrees(elem) { return elem !== 3; }

// const arrayFilterer2 = MakeMultiFilter([1, 2, 3]);
// const currentArray2 = arrayFilterer2(filterTwos)(filterThrees)();
// console.log('currentArray2', currentArray2); // prints [1] since we filtered out 2 and 3

// // Multiple active filters at the same time
// const arrayFilterer3 = MakeMultiFilter([1, 2, 3]);
// const arrayFilterer4 = MakeMultiFilter([4, 5, 6]);
// console.log(arrayFilterer3(filterTwos)()); // prints [1, 3]
// console.log(arrayFilterer4(filterThrees)()); // prints [4, 5, 6]