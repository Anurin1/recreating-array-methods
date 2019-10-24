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

function push(array) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	var arrayIndex = array.length;

	for (var i = 1; i < arguments.length; i++) {
		array[arrayIndex] = arguments[i];
		arrayIndex++;
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
			push(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},


	'It should add an element at the end of the original array.': function() {
		var originalArray = [1, 2];
		var expectedResult = [1, 2, 3];

		push(originalArray, 3);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If more that one element is passed in, it should add them at the end of the original array in the order they are passed in.': function() {
		var originalArray = [1, 2];
		var expectedResult = [1, 2, 7, 8, 9];

		push(originalArray, 7, 8, 9);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'It should return the new length of the original array.': function() {
		var pushResult = push([1, 2], 3, 4);
		eq(pushResult, 4);
	},
	'It should add elements at the end of the array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };
		var expectedResult = { 0: 'pen', 1: 'paper', 2: 'desk', 3: 'pencil', length: 4 };

		var pushResult = push(list, 'pencil');

		eq(helpers.arraysMatchLength(expectedResult, list), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, list), true);
		eq(pushResult, 4);
	}
});
