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
	if (array instanceof Object === false) throw new TypeError('Not an array');

	// var a = array[1];
	// var b = array[0];

	// var compareFunctionResult = compareFunction(a, b);
	// if(compareFunctionResult < 0) {
	// 	//a goes before b
	// 	var helper = array[0];
	// 	array[0] = array[1]
	// 	array[1] = helper;
	// }
	// if(compareFunctionResult === 0) {
	// 	//no swap
	// }
	// if(compareFunctionResult > 0) {
	// 	//b goes before a
	// 	var helper = a;
	// 	array[0] = b;
	// 	array[1] = helper;

	//-----

	//! 1. add holes to the end
	//! 2. sort without
	//! 3 add holes back

	//check assent [1,2,3]
	function checkCompeteAscendingOrder() {
		var hasCompeteAscendingOrder = true;

		for (var i = 0; i < array.length - 1; i++) {
			var compare = array[i] - array[i + 1];
			if (compare > 0) {
				hasCompeteAscendingOrder = false;
				break;
			}
		}
		return hasCompeteAscendingOrder;
	}

	//check dessent [3,2,1]
	function checkCompeteDesceningOrder() {
		var hasCompeteDesceningOrder = true;

		for (var i = 0; i < array.length - 1; i++) {
			var compare = array[i] - array[i + 1];
			if (compare < 0) {
				hasCompeteDesceningOrder = false;
				break;
			}
		}
		return hasCompeteDesceningOrder;
	}

	//check assent [1,2,3]
	function checkCompeteAscendingOrderCharacters() {
		var hasCompeteAscendingOrder = true;

		for (var i = 0; i < array.length - 1; i++) {
			var compare = String(array[i]).charCodeAt() - String(array[i + 1]).charCodeAt();
			if (compare > 0) {
				hasCompeteAscendingOrder = false;
				break;
			}
		}
		return hasCompeteAscendingOrder;
	}

	var hasCompeteAscendingOrder = false;
	var hasCompeteDesceningOrder = false;

	if (arguments.length === 2) {
		while (!(hasCompeteAscendingOrder || hasCompeteDesceningOrder)) {
			for (let index = 0; index < array.length - 1; index++) {
				// !zkusit prohodit poradi a - prvni element...
				var a = parseInt(array[index + 1]);
				var b = parseInt(array[index]);

				var compareFunctionResult = compareFunction(a, b);
				//!on function
				//a goes before b
				if (compareFunctionResult < 0) {
					var helperForB = array[index];
					//position b
					array[index] = array[index + 1];
					//position a
					array[index + 1] = helperForB;
				}
				//b goes before a	//! no need for this swap
				if (compareFunctionResult > 0) {
					var helperForA = array[index + 1];
					array[index] = array[index];
					array[index + 1] = helperForA;
				}
			}
			hasCompeteAscendingOrder = checkCompeteAscendingOrder();
			hasCompeteDesceningOrder = checkCompeteDesceningOrder();
		}
	} else {
		while (!hasCompeteAscendingOrder) {
			for (let index = 0; index < array.length - 1; index++) {
				//! if not a string
				var a = String(array[index + 1]).charCodeAt();
				var b = String(array[index]).charCodeAt();

				var compareFunctionResult = a - b;

				//a goes before b
				if (compareFunctionResult < 0) {
					var helperForB = array[index];
					//position b
					array[index] = array[index + 1];
					//position a
					array[index + 1] = helperForB;
				}
				//b goes before a
				if (compareFunctionResult > 0) {
					var helperForA = array[index + 1];
					array[index] = array[index];
					array[index + 1] = helperForA;
				}
			}
			hasCompeteAscendingOrder = checkCompeteAscendingOrderCharacters();
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
	'It should returned the sorted original array.': function() {
		var originalArray = [1];

		var resultSort = sort(originalArray);

		eq(helpers.arraysMatchLength(resultSort, originalArray), true);
		eq(helpers.arraysMatchEveryElement(resultSort, originalArray), true);
	},
	'It should pass in the ith + 1 element as the first argument to the callback comparison function.': function() {
		var originalArray = [1, 2];

		sort(originalArray, function(a) {
			eq(a, 2);
		});
	},
	'It should pass in the ith element as the second argument to the callback comparison function.': function() {
		var originalArray = [1, 2];

		sort(originalArray, function(a, b) {
			eq(b, 1);
		});
	},

	'If compareFunction returns less than 0, A should go before B': function() {
		var originalArray = [5, 1];
		var expectedResult = [1, 5];

		sort(originalArray, function(a, b) {
			if (a < b) {
				return -1;
			}
		});
	
		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If compareFunction returns 0, A and B should stated unchanged.': function() {
		var originalArray = [5, 5];
		var expectedResult = [5, 5];

		sort(originalArray, function(a, b) {
			if (a === b) {
				return 0;
			}
		});
		
		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If compareFunction returns more than 0, B should go before A': function() {
		var originalArray = [1, 5];
		var expectedResult = [1, 5];

		sort(originalArray, function(a, b) {
			if (a > b) {
				return 1;
			}
		});

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If compareFunction function, it should sort element in ascending order': function() {
		var originalArray = [8, 3, 1, 5];
		var expectedResult = [1, 3, 5, 8];

		sort(originalArray, function(a, b) {
			return a - b;
		});

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If compareFunction function, it should sort element in in descending order too': function() {
		var originalArray = [8, 3, 1, 5];
		var expectedResult = [8, 5, 3, 1];

		sort(originalArray, function(a, b) {
			return b - a;
		});

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	//! ['8', '3', 1, 'a'];
	'If compareFunction function, if it is posible, it should transfer elements into numbers and it should sorted them according to the return value of the compare function': function() {
		var originalArray = ['8', '3', 1, '5'];
		var expectedResult = ['8', '5', '3', 1];

		sort(originalArray, function(a, b) {
			return b - a;
		});

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	//!not done
	'If compareFunction function, all undefined elements are sorted to the end of the array, with no call to compareFunction.': function() {
		var originalArray = [1, 10, 5, , 9, , 3];
        
		var expectedResult = [1, 3, 5, 9, 10, ,,];

		sort(originalArray, function(a, b) {
			return b - a;
		});
		console.log('TCL: originalArray', originalArray);
		
		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	//!smazat
	// 'If no compareFunction, all non-undefined array elements should be converted to strings.': function() { 
	// 	var originalArray = [1, 5, 10];

	// 	var expectedResult = [1, 10, 5];

	// 	sort(originalArray);
	// 	console.log('TCL: originalArray', originalArray);
	// 	eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
	// 	eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	// },

	'If no compareFunction, all non-undefined array elements should be sorted by converting them to strings and comparing strings in UTF-16 code units.': function() {
		var originalArray = ['a', 'e', 'c', 1, 10, 5];
	
		var expectedResult = [1, 10, 5, 'a', 'c', 'e'];

		sort(originalArray);
		console.log('TCL: originalArray', originalArray);
		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	//!not done
	'If no compareFunction, all undefined elements should be sorted to the end of the array.': function() {
		fail()
		var originalArray = ['a', , 'e', , 'c', 1, , 10, 5];
	
		var expectedResult = [1, 10, 5, "a", "c", "e", , , ,];

		sort(originalArray);
		console.log('TCL: originalArray', originalArray);
		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	
});
