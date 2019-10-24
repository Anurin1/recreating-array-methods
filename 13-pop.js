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

function pop(array) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	if (Object.values(array).length === 0) return undefined;

	var lastElement = array[array.length - 1];

	//removes the last element from array-like objects
	if (Array.isArray(array) === false) {
		delete array[array.length - 1];
	}

	array.length -= 1;

	return lastElement;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			pop(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},


	'It should remove the last element from the original array.': function() {
		var originalArray = [1, 2, 3];

		var expectedResult = [1, 2];

		pop(originalArray);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'It should return an element which has been removed.': function() {
		var originalArray = [1, 2, 3];

		var popResult = pop(originalArray);

		eq(popResult, 3);
	},

	'It should update the length of the original array.': function() {
		var originalArray = [1, 2, 3];

		pop(originalArray);

		eq(originalArray.length, 2);
	},

	'If array is empty, it should return undefined.': function() {
		var popResult = pop([]);

		eq(popResult, undefined);
	},

	'It should remove the last element in array-like-object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };
		var expectedResult = { 0: 'pen', 1: 'paper', 2: 'desk', length: 2 };

		var popResult = pop(list);

		eq(helpers.arraysMatchLength(expectedResult, list), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, list), true);
		eq(popResult, 'desk');
	}
});
