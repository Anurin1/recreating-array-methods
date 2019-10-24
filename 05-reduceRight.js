function reduceRight(array, callback, initialValue) {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	var arrayLenght = array.length;
	var startingIndex = arrayLenght - 1;
	var accumulator = initialValue;
	var arrayValues = Object.values(array);

	// no initialValue
	if (arguments.length < 3) {
		//array is empty
		if (arrayValues.length === 0) throw new TypeError('Reduce of empty array with no initial value');

		//array has one element
		if (arrayValues.length === 1) return arrayValues[0];

		//array has more than one element
		accumulator = array[startingIndex];
		startingIndex -= 1;

	// has initialValue
	} else {
		//array is empty
		if (arrayValues.length === 0) return initialValue;
	}

	for (var i = startingIndex; i >= 0; i -= 1) {
		if (i in array) {
			accumulator = callback(accumulator, array[i], i, array);
		}
	}
	return accumulator;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			reduceRight(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},
	'If initialValue, the callback starts at the index equal to (array.length - 1) and should run array.length times.': function() {
		var numberOfCallbackRuns = 0;

		reduceRight(
			[1, 2, 3, 4, 5],
			function() {
				numberOfCallbackRuns++;
			},
			0
		);
		eq(numberOfCallbackRuns, 5);
	},
	'If no initialValue, the callback starts at the index equal to (array.length - 2) and should run array.length -1 times.': function() {
		var numberOfCallbackRuns = 0;

		reduceRight([1, 2, 3, 4, 5], function() {
			numberOfCallbackRuns++;
		});
		eq(numberOfCallbackRuns, 4);
	},
	'If initialValue, it should skip unassigned indexes.': function() {
		var numberOfCallbackRuns = 0;

		reduceRight(
			[, 1, 2, , 3],
			function() {
				numberOfCallbackRuns++;
			},
			0
		);
		eq(numberOfCallbackRuns, 3);
	},
	'If no initialValue, it should skip unassigned indexes too.': function() {
		var numberOfCallbackRuns = 0;

		reduceRight([, 1, 2, 3, ,], function() {
			numberOfCallbackRuns++;
		});
		eq(numberOfCallbackRuns, 3);
	},
	'It should pass in the currentValue as the second argument to the callback.': function() {
		reduceRight(
			[1],
			function(accumulator, currentValue) {
				eq(currentValue, 1);
			},
			0
		);
	},
	'It should pass in the ith position as the third argument to the callback.': function() {
		reduceRight(
			[1],
			function(accumulator, currentValue, index) {
				eq(index, 0);
			},
			0
		);
	},
	'It should pass the array as the fourth argument to the callback.': function() {
		var originalArray = [1, 2];

		reduceRight(
			originalArray,
			function(accumulator, currentValue, index, array) {
				eq(array, originalArray);
			},
			0
		);
	},

	'It should not change the original array.': function() {
		var originalArray = [1];

		reduceRight(originalArray, function() {});
		eq(originalArray.length, 1);
		eq(originalArray[0], 1);
	},
	'If initialValue, accumulator should start with initialValue.': function() {
		reduceRight(
			[1],
			function(accumulator) {
				eq(accumulator, 0);
			},
			0
		);
	},
	'If initialValue, currentValue should start with array[array.length-1].': function() {
		reduceRight(
			[1],
			function(accumulator, currentValue) {
				eq(currentValue, 1);
			},
			0
		);
	},
	'If initialValue, and an array is empty, it should return initialValue without calling the callback.': function() {
		var numberOfCallbackRuns = 0;

		var reduceRightResult = reduceRight(
			[],
			function() {
				numberOfCallbackRuns++;
			},
			0
		);
		eq(reduceRightResult, 0);
		eq(numberOfCallbackRuns, 0);
	},
	'If no initialValue, accumulator should start with array[array.length-1].': function() {
		reduceRight([1], function(accumulator) {
			eq(accumulator, 1);
		});
	},
	'If no initialValue, currentValue should start with array[array.length-2].': function() {
		reduceRight([1, 2], function(accumulator, currentValue) {
			eq(currentValue, 1);
		});
	},
	'If no initialValue, and array is empty throw TypeError.': function() {
		var isTypeError = false;

		try {
			reduceRight([], function() {});
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},
	'If no initialValue, an array has one element, it should return that element without calling the callback.': function() {
		var numberOfCallbackRuns = 0;

		var reduceRightResult = reduceRight([1], function() {
			numberOfCallbackRuns++;
		});
		eq(reduceRightResult, 1);
		eq(numberOfCallbackRuns, 0);
	},
	'It should actually reduce.': function() {
		var reduceRightResult = reduceRight(
			[1, 2, 3, 4, 5],
			function(accumulator, currentValue) {
				return accumulator + currentValue;
			},
			0
		);
		eq(reduceRightResult, 15);
	},
	'It should actually reduce for array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };

		var reduceRightResult = reduceRight(list, function(a, b) {
			return a + b;
		}, '');	

		eq(reduceRightResult, 'deskpaperpen');
	}
});
