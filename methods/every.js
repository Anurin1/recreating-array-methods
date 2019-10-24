function every(array, callback, thisArg) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	var arrayToEvery = array;
	var arrayToEveryLength = array.length;
	var everyCallback = callback.bind(thisArg);

	for (var i = 0; i < arrayToEveryLength; i += 1) {
		if (i in arrayToEvery) {
			var callbackResult = everyCallback(arrayToEvery[i], i, arrayToEvery);
			if (callbackResult === false) {
				return false;
			}
		}
	}
	return true;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			every(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},
	'It should run the callback array.length times.': function() {
		var numberOfCallbackRuns = 0;

		every([1, 2, 3], function() {
			numberOfCallbackRuns++;
		});
		eq(numberOfCallbackRuns, 3);
	},
	'It should skip unassigned indexes': function() {
		var numberOfCallbackRuns = 0;

		every([, 1, 2, , 3], function() {
			numberOfCallbackRuns++;
		});
		eq(numberOfCallbackRuns, 3);
	},
	'It should pass in the ith element as the first argument to the callback.': function() {
		every([1], function(element) {
			eq(element, 1);
		});
	},
	'It should pass in the ith position as the second argument to the callback.': function() {
		every([1], function(element, index) {
			eq(index, 0);
		});
	},
	'It should pass in the original array as the third argument to the callback.': function() {
		var originalArray = [1, 2];

		every(originalArray, function(element, index, array) {
			eq(array, originalArray);
		});
	},


	'It should accept optional this object.': function() {
        var thisArg = {name: 'stepan'};
        every([1], function() {
            eq('stepan', this.name);
        }, thisArg);
    },

    
	'It should return a boolean value.': function() {
		var isTypeOfBoolen = false;

		var everyResult = every([1], function() {});

		isTypeOfBoolen = typeof everyResult === 'boolean';
		eq(isTypeOfBoolen, true);
	},
	'If the array is empty, it should return true.': function() {
		var everyResult = every([], function() {});
		eq(everyResult, true);
	},
	'If the callback returns false, it should return false.': function() {
		var everyResult = every([1, 2, 3], function(element) {
			return element < 2;
		});
		eq(everyResult, false);
	},
	'If the callback returns false, it should not check the remaining elements.': function() {
		var numberOfCallbackRuns = 0;
		every([1, 2, 3], function(element) {
			numberOfCallbackRuns++;
			return element < 2;
		});
		eq(numberOfCallbackRuns, 2);
	},
	'If callbacks return only true, it should return true.': function() {
		var numberOfCallbackRuns = 0;
		var everyResult = every([1, 2, 3], function(element) {
			numberOfCallbackRuns++;
			return element > 0;
		});
		eq(everyResult, true);
		eq(numberOfCallbackRuns, 3);
	},
	'It should not change the original array.': function() {
		var originalArray = [1];

		every(originalArray, function() {});
		eq(originalArray.length, 1);
		eq(originalArray[0], 1);
	},
	'It should skip an element that is deleted.': function() {
		var numberOfCallbackRuns = 0;

		every([1, 2, 3], function(element, index, array) {
			delete array[1];
			numberOfCallbackRuns++;
		});
		eq(numberOfCallbackRuns, 2);
	},
	'It should not run the callback for an element that has been appended to the array after the function is called.': function() {
		var numberOfCallbackRuns = 0;

		every([1, 2, 3], function(element, index, array) {
			numberOfCallbackRuns++;
			array.push(5);
		});
		eq(numberOfCallbackRuns, 3);
	},
	'If the unvisited element is changed, when it gets processed, that changed value should be passed into the callback.': function() {
		var everyResult = every([true, false, true], function(element, index, array) {
			array[1] = true;
			return element;
		});
		eq(everyResult, true);
	},
	'If the callback returns false, it should return false for array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };

		var everyResult = every(list, function(element) {
			return element === 'paper';
		});	

		eq(everyResult, false);
	}
});
