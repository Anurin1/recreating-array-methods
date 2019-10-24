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

function splice(array, start, deleteCount) {
	function setParametersValues() {
		if (start > array.length) {
			start = array.length;
		}
		if (start < 0) {
			start = array.length + start;
			if (start < 0) {
				start = 0;
			}
		}

		if (deleteCount <= 0 && items === 0) {
			//! mozna upravit
			// return [];
			deleteCount = 0;
		}

		if ((!deleteCount && deleteCount < 0) || deleteCount >= array.length + start) {
			//!upravit
			deleteCount = array.length;
		}
	}

	//----------
	var elementChange = {
		pushElementToResult: function(el) {
			spliceResult[spliceResultIndex] = el;
			spliceResultIndex++;
		},

		addItemToArray: function(arguments) {
			array[array.length] = array[i];
			array[i] = arguments[3 + itemsIndex];
			itemsIndex++;
			numberOfElementsToAdd--;
		},

		replaceElementWithItem: function(arguments) {
			array[i] = arguments[3 + itemsIndex];
			itemsIndex++;
			numberOfElementsToReplace--;
			this.pushElementToResult(array[i]);
		},

		deleteElement: function() {
			this.pushElementToResult(array[i]);
			delete array[i];
			numberOfElementsToDelete--;
		},

		swapTwoElementsNextToEachOther: function() {
			var helperLastElement = array[array.length - 1];
			array[array.length - 1] = array[i];
			array[i] = helperLastElement;
		},

		moveElementToLowerIndex: function() {
			array[i - 1] = array[i];
		}
	};
	var arrayChange = {
		onlyAddItems: function(arguments) {
			if (numberOfElementsToAdd > 0) {
				elementChange.addItemToArray(arguments);
			} else {
				elementChange.swapTwoElementsNextToEachOther();
			}
		},
		onlyReplaceElementsWithItems: function(arguments) {
			if (numberOfElementsToReplace > 0) {
				elementChange.replaceElementWithItem(arguments);
			}
		},
		addItemsAndDeleteElements: function(arguments) {
			if (numberOfElementsToDelete === 0 && numberOfElementsToReplace === 0) {
				elementChange.moveElementToLowerIndex();
			}

			if (numberOfElementsToDelete > 0 && numberOfElementsToReplace === 0) {
				elementChange.deleteElement();
			}

			if (numberOfElementsToReplace > 0) {
				elementChange.replaceElementWithItem(arguments);
			}
		},
		addItemsAndReplaceElements: function(arguments) {
			if (numberOfElementsToAdd > 0 && numberOfElementsToReplace === 0) {
				elementChange.addItemToArray(arguments);
			}
			if (numberOfElementsToReplace > 0 && numberOfElementsToAdd > 0) {
				elementChange.replaceElementWithItem(arguments);
			}
		}
	};

	if (array instanceof Object === false) throw new TypeError('Invalid argument.');

	setParametersValues();

	var items = arguments.length > 3 ? arguments.length - 3 : 0;
	var itemsIndex = 0;
	var spliceResult = [];
	var spliceResultIndex = 0;

	var numberOfElementsToReplace = 0;
	var numberOfElementsToDelete = 0;
	var numberOfElementsToAdd = 0;

	if (items > deleteCount) {
		numberOfElementsToReplace = deleteCount;
		numberOfElementsToAdd = items - deleteCount;
	} else if (items === deleteCount) {
		numberOfElementsToReplace = items;
	} else {
		numberOfElementsToReplace = items;
		numberOfElementsToDelete = deleteCount - items;
	}

	//! prepsat do kazde for pro kazdou
	//! if(..) do..

	for (var i = start; i < array.length; i++) {

		if (deleteCount === 0 && numberOfElementsToAdd > 0) {
			arrayChange.onlyAddItems(arguments);
		} else if (deleteCount === items) {
			arrayChange.onlyReplaceElementsWithItems(arguments);
		} else if (deleteCount > items) {
			arrayChange.addItemsAndDeleteElements(arguments);
		}
		else {	//items > deleteCount
			arrayChange.addItemsAndReplaceElements(arguments);
		}
	}

	if (deleteCount > items) {
		array.length = array.length - (deleteCount - items);
	}

	return spliceResult;
}

tests({
	//item
	// 'xxxxx.': function() {
	// 	var originalArray = ['Jan', 'March', 'April', 'June'];
	// 	var expectedResult = [1, 'a', 3, 4, 5];
	// 	// debugger
	// 	splice(originalArray, 1, 0, 'Feb');
	// 	console.log('TCL: originalArray', originalArray);

	// 	eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
	// 	eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	// },

	// 'If item1, it should replace element on the start index with item1.': function() {
	// 	var originalArray = [1, 2, 3, 4, 5];
	// 	var expectedResult = [1, 'a', 3, 4, 5];
	// 	// debugger
	// 	splice(originalArray, 1, 1, 'a');
	// 	console.log('TCL: originalArray', originalArray);

	// 	eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
	// 	eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	// },
	// 'If item1, it should replace element on the start index with item1 and delete next element from the original.': function() {
	// 	var originalArray = [1, 2, 3, 4, 5];
	// 	var expectedResult = [1, 'a', 4, 5];
	// 	// debugger;
	// 	splice(originalArray, 1, 2, 'a');
	// 	console.log('TCL: originalArray', originalArray);

	// 	eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
	// 	eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	// },

	// 'If more items that deleteCount, it should extend original array length.': function() {
	// 	var originalArray = [1, 2, 3, 4, 5];
	// 	var expectedResult = ['a', 'a', 'a', 'a', 'a', 3, 4, 5];
	// 	// debugger
	// 	splice(originalArray, 0, 2, 'a', 'a', 'a', 'a', 'a');
	// 	console.log('TCL: originalArray', originalArray);
	// 	eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
	// 	eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	// }

	'If the first argument of the function is not an Object, it should throw TypeError.': function() {
		var isTypeError = false;
		var invalidInput = 33;

		try {
			splice(invalidInput);
		} catch (e) {
			isTypeError = e instanceof TypeError;
		}
		eq(isTypeError, true);
	},
	'If no elements are removed, it should return an empty array.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [];

		var spliceResult = splice(originalArray);
		console.log('TCL: originalArray', originalArray);
		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'It should remove an element from the original array': function() {
		var originalArray = [1, 2, 3, 4, 5];
		// debugger;
		var expectedResult = [1, 2, 4, 5];

		splice(originalArray, 2, 1);
		console.log('TCL: originalArray', originalArray);
		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'It should return an array containing the deleted elements.': function() {
		var originalArray = [1, 2, 3, 4, 5];

		var expectedResult = [3, 4, 5];

		var spliceResult = splice(originalArray, 2, 3);
		console.log('TCL: spliceResult', spliceResult);
		console.log('TCL: originalArray', originalArray);
		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},

	//start
	'If no start, it should return an empty array.': function() {
		//!mozna smazat
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [];

		var spliceResult = splice(originalArray);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If start is greater than array.length, the start should be equal to array.length.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [];

		var spliceResult = splice(originalArray, 6, 2);
		console.log('TCL: originalArray', originalArray);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If start is negative, the start should be equal to the (array.length + start).': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [4];

		var spliceResult = splice(originalArray, -2, 1);
		console.log('TCL: spliceResult', spliceResult);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If start is negative, and the calculation of (array.length + start) is smaller than 0, the start should be equal to 0.': function() {
		// . If the absolute value of start is greater than the length of the array, it will begin from index 0.
		//!absolute value

		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [1];

		var spliceResult = splice(originalArray, -8, 1);
		console.log('TCL: spliceResult', spliceResult);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},

	//deleteCount
	'If no deleteCount is not a number, the deleteCount should be equal to array.length.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [2, 3, 4, 5];

		var spliceResult = splice(originalArray, 1);
		console.log('TCL: spliceResult', spliceResult);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If deleteCount is equal to (array.length - start), the deleteCountit should be equal to array.length.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [2, 3, 4, 5];

		var spliceResult = splice(originalArray, 1, 4);
		console.log('TCL: spliceResult', spliceResult);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If deleteCount is greater than (array.length - start), the deleteCount should be equal to array.length.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [2, 3, 4, 5];

		var spliceResult = splice(originalArray, 1, 8);
		console.log('TCL: spliceResult', spliceResult);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If deleteCount is equal to 0, no elements should be removed.': function() {
		var originalArray = [1, 2, 3, 4, 5]; //!upravit
		var expectedResult = [1, 2, 3, 4, 5];

		splice(originalArray, 1, 0);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If deleteCount is negative, no elements should be removed.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [1, 2, 3, 4, 5];

		splice(originalArray, 1, -2);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	//item
	'If item1, it should replace element on the start index with item1.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [1, 'a', 3, 4, 5];
		// debugger
		splice(originalArray, 1, 1, 'a');
		console.log('TCL: originalArray', originalArray);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If item1, it should replace element on the start index with item1 and delete next element from the original.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [1, 'a', 4, 5];
		// debugger
		splice(originalArray, 1, 2, 'a');
		console.log('TCL: originalArray', originalArray);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If more items that deleteCount, it should extend original array length.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = ['a', 'a', 'a', 'a', 'a', 3, 4, 5];

		splice(originalArray, 0, 2, 'a', 'a', 'a', 'a', 'a');
		console.log('TCL: originalArray', originalArray);
		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	}
	// 'b': function() {
	// 	var arr = [1,2,3,4,5];
	// 	splice(arr, 0,2,'a','a')
	// 	console.log('TCL: arr', arr);
	// 	// ["a", "a", 3, 4, 5]
	// },

	// 'c': function() {
	// 	// debugger;
	// 	var arr = [1,2,3,4,5];
	// 	splice(arr, 0,2,'a')
	// 	console.log('TCL: arr', arr);
	// 	// ["a", 3, 4, 5]
	// },
	// 'xxx': function() {
	// 	fail()
	// },
});
