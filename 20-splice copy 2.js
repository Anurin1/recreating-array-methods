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
	if (array instanceof Object === false) throw new TypeError('Not an array');

	if (start > array.length) {
		start = array.length;
	}
	if (start < 0) {
		start = array.length + start;
		if (start < 0) {
			start = 0;
		}
	}

	var items = arguments.length > 3 ? arguments.length - 3 : 0;
	var itemsIndex = 0;

	if (deleteCount <= 0 && items === 0) {
		//! mozna upravit
		return [];
	}

	if (!deleteCount && deleteCount < 0 || deleteCount >= array.length + start) {	//!upravit
		deleteCount = array.length;
	}

	var spliceResult = [];
	var spliceResultIndex = 0;

	
	var numberOfElementsToReplace = 0;

	var numberOfElementsToDelete = 0;

	var numberOfElementsToAdd = 0;
	var finalArrayLength = array.length;

	if (items > deleteCount) {
		numberOfElementsToReplace = deleteCount;
		numberOfElementsToDelete = 0;
		numberOfElementsToAdd = items - deleteCount;
	} else if (items === deleteCount) {
		numberOfElementsToReplace = items;
		numberOfElementsToDelete = 0;
		numberOfElementsToAdd = 0;
	} else {
		numberOfElementsToReplace = items;
		numberOfElementsToDelete = deleteCount - items;
		numberOfElementsToAdd = 0;
	}

	finalArrayLength = finalArrayLength - numberOfElementsToDelete + numberOfElementsToAdd;

	// console.log('TCL: numberOfElementsToReplace', numberOfElementsToReplace);
	// console.log('TCL: numberOfElementsToDelete', numberOfElementsToDelete);
	// console.log('TCL: numberOfElementsToAdd', numberOfElementsToAdd);

	var arrayLength = array.length;


	//delete count 0, some elements to add
	if(deleteCount === 0 && numberOfElementsToAdd > 0) {
		for (var i = start; i < array.length; i++) {
			if(numberOfElementsToAdd > 0) {
				array[array.length] = array[i];
				array[i] = arguments[3 + itemsIndex];
				itemsIndex++;
				numberOfElementsToAdd--;
			}
			else {
				var helperLastElement = array[array.length - 1]
				array[array.length - 1] = array[i];
				array[i] = helperLastElement
			}
			
		}
	}
	if(deleteCount === items) {
		for (var i = start; i < array.length; i++) {
			if(numberOfElementsToReplace > 0) {
				array[i] = arguments[3 + itemsIndex];
				itemsIndex++;
				numberOfElementsToReplace--;
				spliceResult.push(array[i]); 	//*prepsat na bez push
			}
		}
	}
	if(deleteCount > items) {
		for (var i = start; i < array.length; i++) {

			//reindex rest
			if(numberOfElementsToDelete === 0 && numberOfElementsToReplace === 0) {
				array[i-1] = array[i]
			}

			if(numberOfElementsToDelete > 0 && numberOfElementsToReplace === 0) {
				spliceResult.push(array[i]); //*prepsat na bez push
				delete array[i];
				numberOfElementsToDelete--;
			}


			if(numberOfElementsToReplace > 0 ) {
				array[i] = arguments[3 + itemsIndex];
				itemsIndex++;
				numberOfElementsToReplace--;
				spliceResult.push(array[i]); 	//*prepsat na bez push
			}
			
			
			
		}
		array.length = array.length - (deleteCount - items);
	}

	if(items > deleteCount) {
		for (var i = start; i < array.length; i++) {
			//2.add
			if(numberOfElementsToAdd > 0 && numberOfElementsToReplace === 0 ) {
				array[array.length] = array[i];
				array[i] = arguments[3 + itemsIndex];
				itemsIndex++;
				numberOfElementsToAdd--;
				
			}


			//1.replace first
			if(numberOfElementsToReplace > 0 && numberOfElementsToAdd > 0) {
				array[i] = arguments[3 + itemsIndex];
				itemsIndex++;
				numberOfElementsToReplace--;
				spliceResult.push(array[i]); 	//*prepsat na bez push
			}
			
		}
		
	

	}




	// for (var i = start; i < array.length; i++) {
	// 	//inserting elements a posunuti ostatnich
	// 	if(deleteCount === 0) {
	// 		if (numberOfElementsToAdd > 0) {

	// 		}
	// 	}

	// 	if (numberOfElementsToReplace > 0) {
	// 		array[i] = arguments[3 + itemsIndex];
	// 		itemsIndex++;
	// 		numberOfElementsToReplace--;
	// 		spliceResult.push(array[i]); //!prepsat na bez push
	// 	} else {
	// 		if (numberOfElementsToAdd > 0) {
	// 			array[array.length] = array[i];
	// 			array[i] = arguments[3 + itemsIndex];
	// 			itemsIndex++;
	// 			numberOfElementsToAdd--;
	// 			spliceResult.push(array[i]); //!prepsat na bez push
	// 		} else {
	// 			if (numberOfElementsToDelete > 0) {
	// 				spliceResult.push(array[i]); //!prepsat na bez push
	// 				delete array[i];
	// 				numberOfElementsToDelete--;
	// 			} else {
	// 				if (i > 0) {
	// 					if (i - 1 in array === false) {
	// 						array[i - 1] = array[i];
	// 						delete array[i];
	// 						// console.log('xxxxxx')
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	// adjust lenght
	// if (finalArrayLength > 0) {
	// 	array.length = finalArrayLength;
	// }

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
