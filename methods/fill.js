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

function fill(array, value, start, end) {
	function setParametrsValues() {
		start = parseInt(start) || 0;

		if (end) {
			end = parseInt(end) || 0;
		} else if (end === 0 || Object.is(end, NaN)) {
			end = 0;
		} else {
			end = array.length;
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
	setParametrsValues();

	for (var i = start; i < end; i++) {
		array[i] = value;
	}

	return array;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			fill(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},

	'It should insert a static value from start to end index into the original array.': function() {
		var originalArray = [1, 1, 1];
		var expectedResult = ['a', 1, 1];

		fill(originalArray, 'a', 0, 1);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'It should return the modified array': function() {
		var originalArray = [1, 1, 1];
		var expectedResult = ['a', 1, 1];

		var resultFill = fill(originalArray, 'a', 0, 1);

		eq(helpers.arraysMatchLength(expectedResult, resultFill), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, resultFill), true);
	},

	'If no end, the end should be equal to array.length.': function() {
		var originalArray = [1, 1, 1];
		var expectedResult = ['a', 'a', 'a'];

		fill(originalArray, 'a', 0);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If no start, the start should be equal to 0.': function() {
		var originalArray = [1, 1, 1];
		var expectedResult = ['a', 'a', 'a'];

		fill(originalArray, 'a');

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If start is negative, the start should be equal to the (array.length + start).': function() {
		var originalArray = [1, 1, 1];
		var expectedResult = [1, 1, 'a'];

		fill(originalArray, 'a', -1);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If end is negative, the end should be equal to the (array.length + start).': function() {
		var originalArray = [1, 1, 1];
		var expectedResult = [1, 'a', 1];

		fill(originalArray, 'a', 1, -1);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If start is negative, and the calculation of (array.length + start) is smaller than 0, the start should be equal to 0.': function() {
		var originalArray = [1, 1, 1];

		var expectedResult = ['a', 'a', 'a'];

		fill(originalArray, 'a', -9);
		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If end is negative, and the calculation of (array.length + end) is smaller than 0, the end should be equal to 0.': function() {
		var originalArray = [1, 1, 1];
		var expectedResult = [1, 1, 1];

		fill(originalArray, 'a', 0, -8);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'It should insert a static value from start to end index into array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };
		var expectedResult = { 0: 'nothing', 1: 'paper', 2: 'desk', length: 3 };

		var fillResult = fill(list, 'nothing', 0, 1);

		eq(helpers.arraysMatchLength(expectedResult, fillResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, fillResult), true);
	}
});
