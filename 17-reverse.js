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

function reverse(array) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	var arrayLength = array.length;

	for (var i = 0; i < arrayLength / 2; i++) {
		if (i !== Math.floor(arrayLength / 2)) {
			var firstPosition = i;
			var lastPosition = arrayLength - 1 - i;
			var firstElementToSwap = array[firstPosition];
			var secondElementToSwap = array[lastPosition];

			array[lastPosition] = firstElementToSwap;
			array[firstPosition] = secondElementToSwap;
		}
	}
	return array;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			reverse(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},

	
	'It should reverse the position of elements in the original array. The first element should become the last, and the last element should become the first.': function() {
		var originalArray = [1, 2, 3];
		var expectedResult = [3, 2, 1];

		reverse(originalArray);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'It should return the modified original array.': function() {
		var originalArray = [1, 2, 3, 4];
		var expectedResult = [4, 3, 2, 1];

		var reverseResult = reverse(originalArray);

		eq(helpers.arraysMatchLength(expectedResult, reverseResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, reverseResult), true);
	},

	'It should reverse the position of elements in array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };
		var expectedResult = { 0: 'desk', 1: 'paper', 2: 'pen', length: 3 };

		reverse(list);

		eq(helpers.arraysMatchLength(expectedResult, list), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, list), true);
	}
});
