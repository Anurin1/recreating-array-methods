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

function sort(array, compareFunction) {
	function setElementForComparison(el) {
		if (sort.arguments.length > 1 && el instanceof Object === false) {
			el = typeof el === 'number' ? el : parseInt(el);
		}
		if (sort.arguments.length === 1 && el instanceof Object === false) {
			el = typeof el === 'string' ? el : String(el);
		}
		return el;
	}
	function swapElements() {
		var helper = array[compareIndex];
		array[compareIndex] = array[compareIndex + 1];
		array[compareIndex + 1] = helper;
	}
	function swapHoleWithLastElement(el, i) {
		var lastElement = array[compareLength];
		if (lastElement === undefined) {
			arrayLength--;
			compareLength--;
		} else {
			el = lastElement;
			array[compareIndex + i] = el;
			delete array[array.length - 1];
			arrayLength--;
			compareLength--;
		}
		return el;
	}
	function defaultcompareFunction(a, b) {
		var shorterLength = a.length >= b.length ? b.length : a.length;
		for (var i = 0; i < shorterLength; i++) {
			var aCharCode = a[i].charCodeAt();
			var bCharCode = b[i].charCodeAt();

			if (aCharCode > bCharCode) {
				return 1;
			} else if (aCharCode < bCharCode) {
				return -1;
			}
		}
		if (a.length > b.length) {
			return 1;
		} else {
			return -1;
		}
	}

	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	if (!compareFunction) {
		compareFunction = defaultcompareFunction;
	}

	var arrayLength = array.length;
	var compareLength = array.length - 1;

	for (var arrayIndex = 0; arrayIndex < arrayLength; arrayIndex++) {
		for (var compareIndex = 0; compareIndex < compareLength; compareIndex++) {
			var firstEl = setElementForComparison(array[compareIndex + 1]);
			var secondEl = setElementForComparison(array[compareIndex]);

			if (Object.is(firstEl, NaN)) {
				//firstEl is hole
				firstEl = swapHoleWithLastElement(firstEl, 1);
			}
			if (Object.is(secondEl, NaN)) {
				//secondEl is hole
				secondEl = swapHoleWithLastElement(secondEl, 0);
			}

			var compareFunctionResult = compareFunction(firstEl, secondEl);

			if (compareFunctionResult < 0) {
				swapElements();
			}
		}
	}
	return array;
}

tests({
	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			sort(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},
	'It should return the sorted original array.': function() {
		var originalArray = [1];

		var resultSort = sort(originalArray);

		eq(helpers.arraysMatchLength(resultSort, originalArray), true);
		eq(helpers.arraysMatchEveryElement(resultSort, originalArray), true);
	},
	'It should pass in the ith + 1 element as the first argument to the callback comparison function.': function() {
		var originalArray = [1, 2];

		sort(originalArray, function(firstEl) {
			eq(firstEl, 2);
		});
	},
	'It should pass in the ith element as the second argument to the callback comparison function.': function() {
		var originalArray = [1, 2];

		sort(originalArray, function(firstEl, secondEl) {
			eq(secondEl, 1);
		});
	},
	'If compareFunction returns less than 0, firstEl should go before secondEl.': function() {
		var originalArray = [5, 1];
		var expectedResult = [1, 5];

		sort(originalArray, function(firstEl, secondEl) {
			if (firstEl < secondEl) {
				return -1;
			}
		});

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If compareFunction returns 0, firstEl and secondEl should stay unchanged.': function() {
		var originalArray = [5, 5];
		var expectedResult = [5, 5];

		sort(originalArray, function(firstEl, secondEl) {
			if (firstEl === secondEl) {
				return 0;
			}
		});

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If compareFunction returns more than 0, secondEl should go before firstEl.': function() {
		var originalArray = [1, 5];
		var expectedResult = [1, 5];

		sort(originalArray, function(firstEl, secondEl) {
			if (firstEl > secondEl) {
				return 1;
			}
		});

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If compareFunction function, it should sort elements in ascending order.': function() {
		var originalArray = [8, 3, 1, 5];
		var expectedResult = [1, 3, 5, 8];

		sort(originalArray, function(a, b) {
			return a - b;
		});

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If compareFunction function, it should sort elements in descending order too.': function() {
		var originalArray = [8, 3, 1, 5];
		var expectedResult = [8, 5, 3, 1];

		sort(originalArray, function(a, b) {
			return b - a;
		});

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If compareFunction function, if possible it should transfer elements into numbers and it should sort them according to the return value of the callback compare function.': function() {
		var originalArray = ['8', '3', 1, '5'];
		var expectedResult = ['8', '5', '3', 1];

		sort(originalArray, function(a, b) {
			return b - a;
		});

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If compareFunction function, all undefined elements should be sorted to the end of the array with no call to compareFunction.': function() {
		var originalArray = [1, , 10, 5, 9, , 3];
		var expectedResult = [1, 3, 5, 9, 10, , ,];

		sort(originalArray, function(a, b) {
			return a - b;
		});

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If no compareFunction, if possible all non-undefined array elements should be converted to strings.': function() {
		var originalArray = [1, 5, 10];
		var expectedResult = [1, 10, 5];

		sort(originalArray);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If no compareFunction, all non-undefined array elements should be sorted by comparing strings.': function() {
		var originalArray = ['a', 'e', 'c', 1, 10, 5];
		var expectedResult = [1, 10, 5, 'a', 'c', 'e'];

		sort(originalArray);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If no compareFunction, all undefined elements should be sorted to the end of the array.': function() {
		var originalArray = ['a', , 'e', , 'c', 1, , 10, 5];
		var expectedResult = [1, 10, 5, 'a', 'c', 'e', , , ,];

		sort(originalArray);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'It should sort array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };
		var expectedResult = { 0: 'desk', 1: 'paper', 2: 'pen', length: 3 };

		sort(list);

		eq(helpers.arraysMatchLength(expectedResult, list), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, list), true);
	}
});
