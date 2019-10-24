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
		if ((!start && start !== 0) || start > array.length) {
			start = array.length;
			deleteCount = 0;
			return;
		} else {
			start = start === 0 ? 0 : parseInt(start) || array.length;
		}
		if (start < 0) {
			startOffset = array.length + start;
			start = startOffset < 0 ? 0 : startOffset;
		}

		deleteCount = deleteCount === 0 ? 0 : parseInt(deleteCount) || array.length - 1;
		if (deleteCount <= 0) {
			deleteCount = 0;
		}
		if (deleteCount >= array.length - start) {
			deleteCount = array.length - start;
		}
	}
	function pushElementToResult(el) {
		spliceResult[spliceResultIndex] = el;
		spliceResultIndex++;
	}
	function addNewItems(arguments) {
		for (let i = 0; i < items; i++) {
			array[start + i] = arguments[3 + i];
		}
	}
	function deleteElements() {
		for (let i = 0; i < deleteCount; i++) {
			pushElementToResult(array[i + start]);
			delete array[i + start];
		}
	}

	if (array instanceof Object === false) throw new TypeError('Invalid argument.');
	setParametersValues();

	var items = arguments.length > 3 ? arguments.length - 3 : 0;
	var spliceResult = [];
	var spliceResultIndex = 0;
	var finalLength = array.length - (deleteCount - items);
	var arrayLength = array.length;

	if (deleteCount === 0 && items > 0) {
		//reindexes existing elements
		for (let i = arrayLength - 1; i >= start; i--) {
			array[i + items] = array[i];
		}
		addNewItems(arguments);

	} else if (deleteCount === items) {
		deleteElements();
		addNewItems(arguments);

	} else if (deleteCount > items) {
		deleteElements();
		if (items) {
			addNewItems(arguments);
		}
		//reindexes existing elements
		for (let i = start + items; i < array.length; i++) {
			array[i] = array[i + deleteCount - items];
		}
		//update array length
		array.length = finalLength;

	} else {	//items > deleteCount
		deleteElements();
		//reindexes existing elements
		var counter = 0;
		for (let i = arrayLength - 1; i >= start + deleteCount; i--) {
			array[finalLength - 1 + counter] = array[i];
			counter--;
		}
		addNewItems(arguments);
	}

	return spliceResult;
}

tests({
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

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'It should remove an element from the original array.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [1, 2, 4, 5];

		splice(originalArray, 2, 1);

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'It should return an array containing the deleted elements.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [3, 4, 5];

		var spliceResult = splice(originalArray, 2, 3);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If no start, it should return an empty array.': function() {
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

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If start is negative, the start should be equal to the (array.length + start).': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [4];

		var spliceResult = splice(originalArray, -2, 1);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If start is negative, and the calculation of (array.length + start) is smaller than 0, the start should be equal to 0.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [1];

		var spliceResult = splice(originalArray, -8, 1);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If no deleteCount, the deleteCount should be equal to (array.length - 1).': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [2, 3, 4, 5];

		var spliceResult = splice(originalArray, 1);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If deleteCount is equal to (array.length - start), the deleteCount should be equal to (array.length - start).': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [2, 3, 4, 5];

		var spliceResult = splice(originalArray, 1, 4);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If deleteCount is greater than (array.length - start), the deleteCount should be equal to (array.length - start).': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [2, 3, 4, 5];

		var spliceResult = splice(originalArray, 1, 8);

		eq(helpers.arraysMatchLength(expectedResult, spliceResult), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, spliceResult), true);
	},
	'If deleteCount is equal to 0, no elements should be removed.': function() {
		var originalArray = [1, 2, 3, 4, 5];
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
	'If items and deleteCount are equal, it should replace element on the start index with the item.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [1, 'a', 3, 4, 5];

		splice(originalArray, 1, 1, 'a');

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'If deleteCount is greater than items, it should replace element on the start index with the item and delete the next element from the original array.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = [1, 'a', 4, 5];

		splice(originalArray, 1, 2, 'a');

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},

	'If items are greater than deleteCount, it should extend original array length and add items.': function() {
		var originalArray = [1, 2, 3, 4, 5];
		var expectedResult = ['a', 'a', 'a', 'a', 'a', 3, 4, 5];

		splice(originalArray, 0, 2, 'a', 'a', 'a', 'a', 'a');

		eq(helpers.arraysMatchLength(expectedResult, originalArray), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, originalArray), true);
	},
	'It should remove and add elements in array-like object too.': function() {
		var list = { 0: 'pen', 1: 'paper', 2: 'desk', length: 3 };
		var expectedResult = { 0: 'table', 1: 'paper', 2: 'desk', length: 3 };

		splice(list, 0, 1, 'table');

		eq(helpers.arraysMatchLength(expectedResult, list), true);
		eq(helpers.arraysMatchEveryElement(expectedResult, list), true);
	}
});
