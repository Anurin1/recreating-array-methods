function some(array, callback, thisArg) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	var arrayToSome = array;
	var arrayToSomeLength = array.length;
	var someCallback = callback.bind(thisArg);

	for (var i = 0; i < arrayToSomeLength; i += 1) {
		if (i in arrayToSome) {
			var callbackResult = someCallback(arrayToSome[i], i, arrayToSome);
			if (callbackResult === true) {
				return true;
			}
		}
	}
	return false;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			some(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},
	'It should run the callback array.length times.': function() {
		var numberOfCallbackRuns = 0;

		some([1, 2, 3], function() {
			numberOfCallbackRuns++;
		});
		eq(numberOfCallbackRuns, 3);
	},
	'It should skip unassigned indexes': function() {
		var numberOfCallbackRuns = 0;

		some([, 1, 2, , 3], function() {
			numberOfCallbackRuns++;
		});
		eq(numberOfCallbackRuns, 3);
	},
	'It should pass in the ith element as the first argument to the callback.': function() {
		some([1], function(element) {
			eq(element, 1);
		});
	},
	'It should pass in the ith position as the second argument to the callback.': function() {
		some([1], function(element, index) {
			eq(index, 0);
		});
	},
	'It should pass in the original array as the third argument to the callback.': function() {
		var originalArray = [1, 2];

		some(originalArray, function(element, index, array) {
			eq(array, originalArray);
		});
	},


	'It should accept optional this object.': function() {
        var thisArg = {name: 'stepan'};
        some([1], function() {
            eq('stepan', this.name);
        }, thisArg);
    },

    
	'It should return a boolean value.': function() {
		var isTypeOfBoolen = false;

		var someResult = some([1], function() {});

		isTypeOfBoolen = typeof someResult === 'boolean';
		eq(isTypeOfBoolen, true);
	},
	'If the array is empty, it should return false': function() {
		var someResult = some([], function() {});
		eq(someResult, false);
	},
	'If the callback returns true, it should return true.': function() {
		var someResult = some([1, 2, 3], function(element) {
			return element > 2;
		});
		eq(someResult, true);
	},
	'If the callback returns true, it should not check the remaining elements.': function() {
		var numberOfCallbackRuns = 0;
		some([1, 2, 3], function(element) {
			numberOfCallbackRuns++;
			return element > 2;
		});
		eq(numberOfCallbackRuns, 3);
	},
	'If callbacks return only false, it should return false.': function() {
		var numberOfCallbackRuns = 0;
		var someResult = some([1, 2, 3], function(element) {
			numberOfCallbackRuns++;
			return element > 3;
		});
		eq(someResult, false);
		eq(numberOfCallbackRuns, 3);
	},
	'It should not change the original array.': function() {
		var originalArray = [1];

		some(originalArray, function() {});
		eq(originalArray.length, 1);
		eq(originalArray[0], 1);
	},
	'It should skip an element that is deleted.': function() {
		var numberOfCallbackRuns = 0;

		some([1, 2, 3], function(element, index, array) {
			delete array[1];
			numberOfCallbackRuns++;
		});
		eq(numberOfCallbackRuns, 2);
	},
	'It should not run the callback for an element that has been appended to the array after the function is called.': function() {
		var numberOfCallbackRuns = 0;

		some([1, 2, 3], function(element, index, array) {
			numberOfCallbackRuns++;
			array.push(5);
		});
		eq(numberOfCallbackRuns, 3);
	},

	'If the unvisited element is changed, when it gets processed, that changed value should be passed into the callback.': function() {
		var someResult = some([true, false, true], function(element, index, array) {
			array[1] = true;
			return element;
		});
		eq(someResult, true);
	},
	'If the callback returns true, it should return true for array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };

		var someResult = some(list, function(element) {
			return element === 'paper';
		});	

		eq(someResult, true);
	}
});
