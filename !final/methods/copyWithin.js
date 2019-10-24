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

function copyWithin(array, target, start, end) {
	function setParametersValues() {
		target = parseInt(target) || 0;
		start = parseInt(start) || 0;
		end = end === 0 ? 0 : parseInt(end) || array.length;

		if (target >= array.length) {
			return array;
		}

		if (target < 0) {
			targetOffset = array.length + target;
			target = targetOffset < 0 ? 0 : targetOffset;
		}

		if (start < 0) {
			startOffset = array.length + start;
			start = startOffset < 0 ? 0 : startOffset;
		}

		if (end < 0) {
			endOffset = array.length + end;
			end = endOffset < 0 ? 0 : endOffset;
		}
	}

	if (array instanceof Object === false) throw new TypeError('Invalid argument.');
	setParametersValues();

	var partOfArrayToCopy = [];
	var partOfArrayToCopyIndex = 0;

	for (var i = start; i < end; i++) {
		partOfArrayToCopy[partOfArrayToCopyIndex] = array[i];
		partOfArrayToCopyIndex++;
	}

	partOfArrayToCopyIndex = 0;

	for (var i = target; i < array.length; i++) {
		if (partOfArrayToCopyIndex < partOfArrayToCopy.length) {
			array[i] = partOfArrayToCopy[partOfArrayToCopyIndex];
			partOfArrayToCopyIndex++;
		}
	}

	return array;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			copyWithin(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},

	'It should copy part of the original array to another location within the original array.': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['d', 'b', 'c', 'd', 'e'];

		copyWithin(originalArray, 0, 3, 4);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'It should return the modified original array.': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['d', 'b', 'c', 'd', 'e'];

		var resultCopyWithin = copyWithin(originalArray, 0, 3, 4);

		eq(helpers.arraysMatchLength(expectedResult, resultCopyWithin), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, resultCopyWithin), true);
	},
	'It should not change the length of the original array.': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var originalLength = originalArray.length;

		copyWithin(originalArray, 0, 3, 4);

		eq(originalLength, originalArray.length);
	},

	'If target is equal to array.length, nothing should be copied.': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['a', 'b', 'c', 'd', 'e'];

		copyWithin(originalArray, 5, 3, 4);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If target is greater than array.length, nothing should be copied.': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['a', 'b', 'c', 'd', 'e'];

		copyWithin(originalArray, 6, 3, 4);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If target is negative, the target should be equal to the (array.length + target).': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['a', 'b', 'c', 'd', 'd'];

		copyWithin(originalArray, -1, 3, 4);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If start is negative, and the calculation of (array.length + target) is smaller than 0, the target should be equal to 0.': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['d', 'b', 'c', 'd', 'e'];

		copyWithin(originalArray, -8, 3, 4);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If target is greater than start, the copied sequence should be trimmed to fit the length of the original array.': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['a', 'b', 'c', 'd', 'c'];

		copyWithin(originalArray, 4, 2, 4);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If no end, the end should be equal to array.length.': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['d', 'e', 'c', 'd', 'e'];

		copyWithin(originalArray, 0, 3);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If end is negative, the end should be equal to the (array.length + end).': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['d', 'b', 'c', 'd', 'e'];

		copyWithin(originalArray, 0, 3, -1);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If end is negative, and the calculation of (array.length + end) is smaller than 0, the end should be equal to 0.': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['a', 'b', 'c', 'd', 'e'];

		copyWithin(originalArray, 0, 3, -8);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If no start, the start should be equal to 0.': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['a', 'b', 'a', 'b', 'c'];

		copyWithin(originalArray, 2);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If start is negative, the start should be equal to the (array.length + start).': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['d', 'e', 'c', 'd', 'e'];

		copyWithin(originalArray, 0, -2);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If start is negative, and the calculation of (array.length + start) is smaller than 0, the start should be equal to 0.': function() {
		var originalArray = ['a', 'b', 'c', 'd', 'e'];
		var expectedResult = ['a', 'b', 'c', 'd', 'e'];

		copyWithin(originalArray, 0, 0);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'It should copy part of the array-like object to another location within array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };
		var expectedResult = { 0: 'desk', 1: 'paper', 2: 'desk', length: 3 };

		copyWithin(list, 0, 2);

		eq(helpers.arraysMatchLength(expectedResult, list), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, list), true);
	}
});
