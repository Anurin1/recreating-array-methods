function lastIndexOf(array, searchElement, fromIndex) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	fromIndex = fromIndex === 0 ? 0 : parseInt(fromIndex) || array.length - 1;

	if (fromIndex >= array.length) {
		fromIndex = array.length - 1;
	}

	if (fromIndex < 0) {
		fromIndex = array.length + fromIndex;
		if (fromIndex < 0) return -1;
	}

	for (var i = fromIndex; i >= 0; i--) {
		if (array[i] === searchElement) {
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
			lastIndexOf(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},

	'It should not change the original array.': function() {
		var originalArray = [1];

		lastIndexOf(originalArray, function() {});
		eq(originalArray.length, 1);
		eq(originalArray[0], 1);
	},
	'If the searchElement is equal to the element of the array, it should return the index of that element.': function() {
		var lastIndexOfResult = lastIndexOf([1, 2, 3], 3);
		eq(lastIndexOfResult, 2);
	},
	'If the searchElement is equal to more than one element of the array, it should return the index of the first occurrence.': function() {
		var lastIndexOfResult = lastIndexOf([1, 2, 2, 1], 1);
		eq(lastIndexOfResult, 3);
	},
	'If the searchElement is not equal to any element of the array, it should return -1.': function() {
		var lastIndexOfResult = lastIndexOf([1, 2, 3], 4);
		eq(lastIndexOfResult, -1);
	},

	'If no fromIndex, the fromIndex should be equal to (array.length - 1) and the whole array should be searched.': function() {
		var lastIndexOfResult = lastIndexOf([1, 2, 3], 1);
		eq(lastIndexOfResult, 0);
	},
	'If fromIndex is not a number, it should be equal to (array.length - 1) and the whole array should be searched.': function() {
		var lastIndexOfResult = lastIndexOf([1, 2, 3], 1, 'a');
		eq(lastIndexOfResult, 0);
	},
	'If fromIndex is greater than array.length, it should be equal to (array.length - 1) and the array should not be searched': function() {
		var lastIndexOfResult = lastIndexOf([1, 2, 3], 1, 5);
		eq(lastIndexOfResult, 0);
	},
	'If fromIndex is equal to the array.length, it should be equal to (array.length - 1) and the array should not be searched.': function() {
		var lastIndexOfResult = lastIndexOf([1, 2, 3], 1, 3);
		eq(lastIndexOfResult, 0);
	},
	'If fromIndex is negative, the fromIndex should be equal to the (array.length + fromIndex)': function() {
		var lastIndexOfResult = lastIndexOf([1, 2, 1], 1, -2);
		eq(lastIndexOfResult, 0);
	},
	'If fromIndex is negative, and the calculation of (array.length + fromIndex) is smaller than 0, it should return -1 and the array should not be searched.': function() {
		var lastIndexOfResult = lastIndexOf([1, 2, 3], 1, -8);
		eq(lastIndexOfResult, -1);
	},
	'It should work array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };

		var lastIndexOfResult = lastIndexOf(list, 'paper');

		eq(lastIndexOfResult, 1);
	}
});
