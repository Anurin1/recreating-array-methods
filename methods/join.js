function join(array, separator = ',') {
	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	var joinResult = '';

	if (separator instanceof Object) {
		separator = separator.toString();
	}

	for (var i = 0; i < array.length; i++) {
		if (i === array.length - 1) {
			joinResult += array[i];
		} else {
			joinResult += array[i] + separator;
		}
	}

	return joinResult;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			join(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},
	'It should return a new string.': function() {
		var isTypeofString = false;

		var joinResult = join([1, 2, 3]);
		isTypeofString = typeof joinResult === 'string';
		eq(isTypeofString, true);
	},

	
	'It should not change the original array.': function() {
		var originalArray = [1];

		join(originalArray, function() {});
		eq(originalArray.length, 1);
		eq(originalArray[0], 1);
	},


	'It should insert the separator between each pair of adjacent elements of the array': function() {
		var joinResult = join([1, 2, 3], '-');
		eq(joinResult, '1-2-3');
	},

	'If no separator, the separator should be equal to ",".': function() {
		var joinResult = join([1, 2, 3]);
		eq(joinResult, '1,2,3');
	},

	'If separator is an empty string, the separator should be equal to "".': function() {
		var joinResult = join([1, 2, 3], '');
		eq(joinResult, '123');
	},

	'If separator is not a string, it should be converted into a string.': function() {
		var joinResult = join([1, 2, 3], [9, 9]);
		eq(joinResult, '19,929,93');
	},

	'If the array has one element, it should return that element without using the separator.': function() {
		var joinResult = join([1], 'x');
		eq(joinResult, '1');
	},
	'If an array is empty, it should return "".': function() {
		var joinResult = join([], 'x');
		eq(joinResult, '');
	},

	'It should join array-like objects too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };

		var joinResult = join(list, ' - ');

		eq(joinResult, 'pen - paper - desk');
	}
});
