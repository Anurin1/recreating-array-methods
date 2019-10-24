function includes(array, valueToFind, fromIndex) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	fromIndex = parseInt(fromIndex) || 0;

	if (fromIndex >= array.length) return false;

	if (fromIndex < 0) {
		var fromIndexOffset = array.length + fromIndex;
		fromIndex = fromIndexOffset < 0 ? 0 : fromIndexOffset;
	}

	for (var i = fromIndex; i < array.length; i++) {
		if (array[i] === valueToFind || Object.is(valueToFind, NaN)) {
			return true;
		}
	}
	return false;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			includes(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},

	'It should return a boolean value.': function() {
		var isTypeOfBoolen = false;

		var includesResult = includes([1], function() {});
		isTypeOfBoolen = typeof includesResult === 'boolean';
		eq(isTypeOfBoolen, true);
	},

	'If the valueToFind is equal to the element of the array, it should return true.': function() {
		var includesResult = includes([1, 2, 3], 2);
		eq(includesResult, true);
	},
	'If the valueToFind is not equal to any element of the array, it should false.': function() {
		var includesResult = includes([1, 2, 3], 4);
		eq(includesResult, false);
	},
	'It should not change the original array.': function() {
		var originalArray = [1];

		includes(originalArray, function() {});
		eq(originalArray.length, 1);
		eq(originalArray[0], 1);
	},

	'If no fromIndex, the fromIndex should be equal to 0 and the whole array should be searched.': function() {
		var includesResult = includes([1, 2, 3], 3);
		eq(includesResult, true);
	},
	'If fromIndex is not a number, it should be equal to 0 and the whole array should be searched.': function() {
		var includesResult = includes([1, 2, 3], 3, 'a');
		eq(includesResult, true);
	},
	'If fromIndex is greater than array.length, it should return false and the array should not be searched.': function() {
		var includesResult = includes([1, 2, 3], 1, 5);
		eq(includesResult, false);
	},
	'If fromIndex is equal to the array.length, it should return false and the array should not be searched.': function() {
		var includesResult = includes([1, 2, 3], 1, 3);
		eq(includesResult, false);
	},
	'If fromIndex is negative, the fromIndex should be equal to the (array.length + fromIndex).': function() {
		var includesResult = includes([1, 2, 3], 1, -2);
		eq(includesResult, false);
	},
	'If fromIndex is negative, and the calculation of (array.length + fromIndex) is smaller than 0, the fromIndex should be equal to 0.': function() {
		var includesResult = includes([1, 2, 3], 1, -8);
		eq(includesResult, true);
	},
	'It should work for array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };

		var includesResult = includes(list, 'desk');	

		eq(includesResult, true);
	}
});
