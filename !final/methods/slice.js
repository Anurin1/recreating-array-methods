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

function slice(array, begin, end) {
	function setParametersValues() {
		begin = parseInt(begin) || 0;
		end = end === 0 ? 0 : parseInt(end) || array.length;

		if (begin < 0) {
			var beginOffset = array.length + begin;
			begin = beginOffset < 0 ? 0 : beginOffset;
		}
		if (end < 0) {
			var endOffset = array.length + end;
			end = endOffset < 0 ? 0 : endOffset;
		}
		if (end > array.length) {
			end = array.length;
		}
	}

	if (array instanceof Object === false) throw new TypeError('Invalid argument.');
	setParametersValues();

	var sliceResult = [];
	var arrayIndex = 0;

	for (var i = begin; i < end; i++) {
		sliceResult[arrayIndex] = array[i];
		arrayIndex++;
	}

	return sliceResult;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			slice(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},

	'It should return a new array.': function() {
		var isInstanceofArray = false;

		var sliceResult = slice([1, 2, 3]);
		isInstanceofArray = sliceResult instanceof Array;
		eq(isInstanceofArray, true);
	},

	'It should not change the original array.': function() {
		var originalArray = [1];

		slice(originalArray, function() {});
		eq(originalArray.length, 1);
		eq(originalArray[0], 1);
	},

	'It should return a new array as a portion of originalArray from begin index to end index.': function() {
		var expectedResult = [1, 2];

		var sliceResult = slice([1, 2, 3], 0, 2);

		eq(helpers.arraysMatchLength(expectedResult, sliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, sliceResult), true);
	},

	'If no begin, the begin should be equal to 0.': function() {
		var expectedResult = [1, 2];

		var sliceResult = slice([1, 2, 3], undefined, 2);

		eq(helpers.arraysMatchLength(expectedResult, sliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, sliceResult), true);
	},

	'If no end, the end should be equal to array.length.': function() {
		var expectedResult = [1, 2, 3];

		var sliceResult = slice([1, 2, 3], 0);

		eq(helpers.arraysMatchLength(expectedResult, sliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, sliceResult), true);
	},

	'If end, it should not include an element on the position equal to end.': function() {
		var expectedResult = [1, 2];

		var sliceResult = slice([1, 2, 3], 0, 2);

		eq(helpers.arraysMatchLength(expectedResult, sliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, sliceResult), true);
	},

	'If begin is negative, the begin should be equal to the (array.length + begin).': function() {
		var expectedResult = [4];

		var sliceResult = slice([1, 2, 3, 4], -1);

		eq(helpers.arraysMatchLength(expectedResult, sliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, sliceResult), true);
	},

	'If begin is negative, and the calculation of (array.length + begin) is smaller than 0, the begin should be equal to 0.': function() {
		var expectedResult = [1, 2, 3, 4];

		var sliceResult = slice([1, 2, 3, 4], -9);

		eq(helpers.arraysMatchLength(expectedResult, sliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, sliceResult), true);
	},

	'If end is negative, the end should be equal to the (array.length + end).': function() {
		var expectedResult = [1, 2];

		var sliceResult = slice([1, 2, 3, 4], 0, -2);

		eq(helpers.arraysMatchLength(expectedResult, sliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, sliceResult), true);
	},

	'If end is negative, and the calculation of (array.length + end) is smaller than 0, the end should be equal to 0.': function() {
		var expectedResult = [];

		var sliceResult = slice([1, 2, 3, 4], 0, -9);

		eq(helpers.arraysMatchLength(expectedResult, sliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, sliceResult), true);
	},

	'If begin is greater than array.length, it should return an empty array.': function() {
		var expectedResult = [];

		var sliceResult = slice([1, 2, 3, 4], 5, 3);

		eq(helpers.arraysMatchLength(expectedResult, sliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, sliceResult), true);
	},

	'If end argument is greater than array.length, the end should be equal to the array.length.': function() {
		var expectedResult = [2, 3, 4];

		var sliceResult = slice([1, 2, 3, 4], 1, 8);

		eq(helpers.arraysMatchLength(expectedResult, sliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, sliceResult), true);
	},

	'It should return a new array as a portion of array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3};
		var expectedResult = ['pen', 'paper'];

		var sliceResult = slice(list, 0, 2);

		eq(helpers.arraysMatchLength(expectedResult, sliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, sliceResult), true);
	}
});
