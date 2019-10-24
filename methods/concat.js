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

function concat(array) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	var concatResult = [];
	var arrayIndex = 0;

	for (var i = arrayIndex; i < arguments.length; i++) {
		//argument is an array
		if (Array.isArray(arguments[i])) {
			var arrayAsArgument = arguments[i];
			for (var j = 0; j < arrayAsArgument.length; j++) {
				concatResult[arrayIndex] = arrayAsArgument[j];
				arrayIndex++;
			}
		} // argument is not an array
		else {
			concatResult[arrayIndex] = arguments[i];
			arrayIndex++;
		}
	}
	return concatResult;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			concat(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},

	'It should return a new array.': function() {
		var isInstanceofArray = false;

		var concatResult = concat([1]);
		isInstanceofArray = concatResult instanceof Array;
		eq(isInstanceofArray, true);
	},
	'It should not change the original array.': function() {
		var originalArray = [1];

		concat(originalArray, function() {});
		eq(originalArray.length, 1);
		eq(originalArray[0], 1);
	},

	'The returned array should contain all elements of the original array.': function() {
		var originalArray = [1, 2, 3];

		var concatResult = concat(originalArray);

		eq(helpers.arraysMatchLength(originalArray, concatResult), true);
		eq(helpers.arraysMatchEveryElement(originalArray, concatResult), true);
	},
	'The returned array should contain elements of arguments in the order they are passed into the function.': function() {
		var expectedResult = [1, 2, 3, 1, 'two', true];

		var concatResult = concat([1, 2, 3], 1, 'two', true);

		eq(helpers.arraysMatchLength(expectedResult, concatResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, concatResult), true);
	},
	'If an array is passed in as an argument, the returned array should contain all elements of that array.': function() {
		var expectedResult = [1, 2, 3, 1, 'two', true, 8, 9, 10];

		var concatResult = concat([1, 2, 3], 1, 'two', true, [8, 9, 10]);
		eq(helpers.arraysMatchLength(expectedResult, concatResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, concatResult), true);
	},
	'If an original array is modified, that change should be visible in the returned array and vice versa.': function() {
		var originalArray = [[1], 2, 3];

		var concatResult = concat(originalArray);
		originalArray[0].push('x');

		eq(concatResult[0].length, 2);
	},
	'If an array passed in as an argument is modified, that change should be visible in the returned array and vice versa.': function() {
		var arrayAsArgument = [[1], 2, 3];

		var concatResult = concat([1, 2, 3], arrayAsArgument);
		arrayAsArgument[0].push('x');

		eq(concatResult[3].length, 2);
	}
});
