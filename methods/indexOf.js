function indexOf(array, searchElement, fromIndex) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	fromIndex = parseInt(fromIndex) || 0;

	if (fromIndex >= array.length) return -1;

	if (fromIndex < 0) {
		var fromIndexOffset = array.length + fromIndex;
		fromIndex = fromIndexOffset < 0 ? 0 : fromIndexOffset;
	}

	for (var i = fromIndex; i < array.length; i++) {
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
			indexOf(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},

	'It should not change the original array.': function() {
		var originalArray = [1];

		indexOf(originalArray, function() {});
		eq(originalArray.length, 1);
		eq(originalArray[0], 1);
	},
	'If the searchElement is equal to the element of the array, it should return the index of that element.': function() {
		var indexOfResult = indexOf([1, 2, 3], 2);
		eq(indexOfResult, 1);
	},
	'If the searchElement is equal to more than one element of the array, it should return the index of the first occurrence.': function() {
		var indexOfResult = indexOf([1, 2, 2], 2);
		eq(indexOfResult, 1);
	},
	'If the searchElement is not equal to any element of the array, it should return -1.': function() {
		var indexOfResult = indexOf([1, 2, 3], 4);
		eq(indexOfResult, -1);
	},

	'If no fromIndex, the fromIndex should be equal to 0 and the whole array should be searched.': function() {
		var indexOfResult = indexOf([1, 2, 3], 3);
		eq(indexOfResult, 2);
	},
	'If fromIndex is not a number, it should be equal to 0 and the whole array should be searched.': function() {
		var indexOfResult = indexOf([1, 2, 3], 3, 'a');
		eq(indexOfResult, 2);
	},
	'If fromIndex is greater than array.length, it should return -1 and the array should not be searched.': function() {
		var indexOfResult = indexOf([1, 2, 3], 1, 5);
		eq(indexOfResult, -1);
	},
	'If fromIndex is equal to the array.length, it should return -1 and the array should not be searched.': function() {
		var indexOfResult = indexOf([1, 2, 3], 1, 3);
		eq(indexOfResult, -1);
	},
	'If fromIndex is negative, the fromIndex should be equal to the (array.length + fromIndex)': function() {
		var indexOfResult = indexOf([1, 2, 3], 1, -2);
		eq(indexOfResult, -1);
	},
	'If fromIndex is negative, and the calculation of (array.length + fromIndex) is smaller than 0, the fromIndex should be equal to 0.': function() {
		var indexOfResult = indexOf([1, 2, 3], 1, -8);
		eq(indexOfResult, 0);
	},
	'It should work array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };

		var indexOfResult = indexOf(list, 'paper');

		eq(indexOfResult, 1);
	}
});
