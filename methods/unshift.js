var helpers = {
	arraysMatchLength: function(array1, array2) {
		return array1.length === array2.length;
	},
	arraysMatchEveryElement: function(array1, array2) {
		for (var i = 0; i < array1.length; i++) {
			if (array1[i] !== array2[i]) return false;
		}
		return true;
	}
};

function unshift(array) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	var numberOfElementsToAdd = arguments.length - 1;

	//moves original elements
	for (var i = array.length - 1; i >= 0; i--) {
		array[i + numberOfElementsToAdd] = array[i];
	}

	//adds new elements at the beginning
	for (var i = 1; i < arguments.length; i++) {
		array[i - 1] = arguments[i];
	}

	//updates length of array-like objects
	if (Array.isArray(array) === false) {
		array.length = Object.keys(array).length - 1;
	}

	return array.length;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			unshift(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},

	
	'It should add an element at the beginning of the original array.': function() {
		var originalArray = [1, 2];
		var expectedResult = [5, 1, 2];

		unshift(originalArray, 5);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If more that one element is passed in, it should add them at the beginning of the original array in the order they are passed in.': function() {
		var originalArray = [1, 2];
		var expectedResult = [7, 8, 9, 1, 2];

		unshift(originalArray, 7, 8, 9);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'It should return the new length of the original array.': function() {
		var unshiftResult = unshift([1, 2], 3, 4);
		eq(unshiftResult, 4);
	},
	'It should add elements at the beginning of array-like-object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };
		var expectedResult = { 0: 'first', 1: 'second', 2: 'pen', 3: 'paper', 4: 'desk', length: 5 };

		var unshiftResult = unshift(list, 'first', 'second');

		eq(helpers.arraysMatchLength(expectedResult, list), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, list), true);
		eq(unshiftResult, 5);
	}
});
