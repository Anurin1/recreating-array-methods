function findIndex(array, callback, thisArg) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	var arrayToFindIndex = array;
	var arrayToFindIndexLength = array.length;
	var findIndexCallback = callback.bind(thisArg);

	for (var i = 0; i < arrayToFindIndexLength; i += 1) {
		var callbackResult = findIndexCallback(arrayToFindIndex[i], i, arrayToFindIndex);
		if (callbackResult === true) {
			return i;
		}
	}
	return -1;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			findIndex(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},
	'It should run the callback array.length times.': function() {
		var numberOfCallbackRuns = 0;

		findIndex([1, 2, 3], function() {
			numberOfCallbackRuns++;
		});
		eq(numberOfCallbackRuns, 3);
	},
	'It should run the callback for unassigned indexes too.': function() {
		var numberOfCallbackRuns = 0;

		findIndex([, 1, 2, , 3], function() {
			numberOfCallbackRuns++;
		});
		eq(numberOfCallbackRuns, 5);
	},
	'It should pass in the ith element as the first argument to the callback': function() {
		findIndex([1], function(element) {
			eq(element, 1);
		});
	},
	'It should pass in the ith position as the second argument to the callback.': function() {
		findIndex([1], function(element, index) {
			eq(index, 0);
		});
	},
	'It should pass in the original array as the third argument to the callback.': function() {
		var originalArray = [1, 2];

		findIndex(originalArray, function(element, index, array) {
			eq(array, originalArray);
		});
	},


	'It should accept optional this object.': function() {
        var thisArg = {name: 'stepan'};
        findIndex([1], function() {
            eq('stepan', this.name);
        }, thisArg);
    },

    
	'If the callback returns true, it should return the index of that element.': function() {
		var findIndexResult = findIndex([1, 2, 3], function(element) {
			return element > 1;
		});
		eq(findIndexResult, 1);
	},
	'If the callback returns true, it should not check the remaining elements.': function() {
		var numberOfCallbackRuns = 0;

		findIndex([1, 2, 3], function(element) {
			numberOfCallbackRuns++;
			return element > 1;
		});
		eq(numberOfCallbackRuns, 2);
	},
	'If callbacks return only false, it should return -1.': function() {
		var findIndexResult = findIndex([1, 2, 3], function(element) {
			return element > 3;
		});
		eq(findIndexResult, -1);
	},
	'It should not change the original array.': function() {
		var originalArray = [1];

		findIndex(originalArray, function() {});
		eq(originalArray.length, 1);
		eq(originalArray[0], 1);
	},
	'It should run the callback for an element that is deleted too.': function() {
		var numberOfCallbackRuns = 0;

		findIndex([1, 2, 3], function(element, index, array) {
			delete array[2];
			numberOfCallbackRuns++;
		});
		eq(numberOfCallbackRuns, 3);
	},
	'It should not run the callback for an element that has been appended to the array after the function is called.': function() {
		var numberOfCallbackRuns = 0;

		findIndex([1, 2, 3], function(element, index, array) {
			numberOfCallbackRuns++;
			array.push(5);
		});
		eq(numberOfCallbackRuns, 3);
	},
	'If the unvisited element is changed, when it gets processed, that changed value should be passed into the callback.': function() {
		var findIndexResult = findIndex([1, 2, 3], function(element, index, array) {
			array[2] = 5;
			return element > 1;
		});
		eq(findIndexResult, 1);
	},
	'If the callback returns true, it should return the index of that element for array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };

		var findResult = findIndex(list, function(element) {
			return element === 'paper';
		});	

		eq(findResult, 1);
	}
});
