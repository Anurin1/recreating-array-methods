//*01    Array.prototype.find           //tested  
//*02    Array.prototype.findIndex      //tested    
//*03    Array.prototype.every          //tested
//*04    Array.prototype.some           //tested
//*05    Array.prototype.reduceRight    //tested
//*06    Array.prototype.concat         //tested 
//*07    Array.prototype.indexOf        //tested
//*08    Array.prototype.lastIndexOf    //tested
//*09    Array.prototype.includes
10    Array.prototype.slice
11    Array.prototype.join
12    Array.prototype.push
13    Array.prototype.pop
14    Array.prototype.shift
15    Array.prototype.unshift
16    Array.prototype.fill
17    Array.prototype.reverse
18    Array.prototype.copyWithin
19    Array.prototype.sort
20    Array.prototype.splice


*01    find             callback		+no mutation   	+array-like objects     no default
*02    findIndex        callback		+no mutation	+array-like objects     no default
*03    every          	callback		+no mutation	+array-like objects     no default
*04    some           	callback		+no mutation	+array-like objects     no default
*05    reduceRight    	callback		+no mutation	+array-like objects     no default
*06    concat          	no callback		+no mutation	-array-like objects     no default
*07    indexOf        	no callback		+no mutation	+array-like objects     default
*08    lastIndexOf    	no callback		+no mutation	array-like objects      default
*09    includes			no callback		+no mutation	+array-like objects     default
*10    slice			no callback		+no mutation	+array-like objects     default
*11    join				no callback		+no mutation	+array-like objects     default
*12    push				no callback		mutates			+array-like objects     no default
*13    pop				no callback		mutates			+array-like objects     no default
*14    shift			no callback		mutates			+array-like objects     no default
*15    unshift			no callback		mutates			+array-like objects     no default
*16    fill				no callback		mutates			+array-like objects     default
*17    reverse          no callback		mutates			+array-like objects     no default
*18    copyWithin       no callback		mutates			+array-like objects     default
*19    sort             callback		mutates			...array-like objects   no default
20    splice            no callback		mutates			array-like objects     default









1. Read the MDN documentation to learn what the native method does
2. Play with it on the DOM.
3. If necessary, write a prototype
4. Write examples of what it should do
5. Write the english for each test. Think of edge cases. Make them all fail.
6. Make each test pass one at a time by writing out your function.


// 1. Read MDN Docs
// 2. Build prototype wihle reading docs
// 3. Copy all information form Docs
// 4. Modify Description into test







00 - forEach //----------
//- init - callback run + access to arguments
    'It should run the callback function array.length times'
    'It should pass in the ith element as the first argument to the callback'
    'It should pass in the ith position as the second argument to the callback'
    'It should pass in the original array as the third argument to the callback'
//- this
    'It should accept an optional this object'

00 - filter //----------
//- init
    'It should run the callback function array.length times'
    'It should pass in the ith element as the first argument to the callback'
    'It should pass in the ith position as the second argument to the callback'
    'It should pass in the original array as the third argument to the callback'
//- this    
    'It should accept an optional this object'
//-  function behaviour   
    'It should return an array'
    'It should return a new array, not the array being filtred'
    'It should return a new array that only has elements where callback() is true'

00 - map //----------
//- init
    'It should run the callback function array.length times'
    'It should skip unassigned indexes'
    'It should pass in the ith element as the first argument to the callback'
    'It should pass in the ith position as the second argument to the callback'
    'It should pass in the original array as the third argument to the callback'
//- this   
    'It should accept an optional this object'
//-  function behaviour 
    'It should return an array'
    'It should return a new array, not the original array':
    'It should return a mapped array

00 - reduce //----------
//- init
    'If initialValue callback should run array.length times'
    'If initialValue, callback will start at index 0.'
    'If no initialValue callback should run array.length -1 times'
    'If no initialValue, callback will start at index 1.'
    'If initial Value, it should exclude holes.'
    'If no initialValue, it should exclude holes too.
    'It should pass array as fourth argument to callback.'
//-  function behaviour 
    'If initialValue, previousValue should start with initialValue.'
    'If initialValue, currentValue should start with array[0].'
    'If no initialValue, previousValue should start with array[0].'
    'If no initialValue, currentValue should start with array[1].'
    'If initialValue, an array is empty, return initialValue without calling callback.'
    'If no initialValue, an array has one element, it should return that element without calling callback.'
    'It should actually reduce.'
    'If array is empty, and no initialValue, throw TypeError.'
    'If input array is no an array, throw TypeError'

//*01 - find //----------has callback, no mutation
//- init
    'If the first argument of the function is not an Array, it should throw TypeError.'
    'It should run the callback array.length times.'
    'It should run the callback for unassigned indexes too.'
    'It should pass in the ith element as the first argument to the callback.'
    'It should pass in the ith position as the second argument to the callback.'
    'It should pass in the original array as the third argument to the callback.'
//- this     
    'It should accept optional this object.'
//- function behaviour 
    'If the callback returns true, it should return the value of that element.'
    'If the callback returns true, it should not check the remaining elements.'
    'If callbacks return only false, it should return undefined.'
    'It should not change the original array.'
    'It should run the callback for an element that is deleted too.'
    'It should not run the callback for an element that has been appended to the array after the function is called.'
    'If the unvisited element is changed, when it gets processed, that changed value should be passed into the callback.'
//*-----

//*02 - findIndex //----------has callback, no mutation
//- init
    'If the first argument of the function is not an Array, it should throw TypeError.'
    'It should run the callback array.length times.'
    'It should run the callback for unassigned indexes too.'
    'It should pass in the ith element as the first argument to the callback.'
    'It should pass in the ith position as the second argument to the callback.'
    'It should pass in the original array as the third argument to the callback.'
//- this     
    'It should accept optional this object.'
//- function behaviour 
    'If the callback returns true, it should return the index of that element.'    
    'If the callback returns true, it should not check the remaining elements.'
    'If callbacks return only false, it should return -1.'
    'If the array is empty, it should return -1.'
    'It should not change the original array.'
    'It should run the callback for an element that is deleted too.'
    'It should not run the callback for an element that has been appended to the array after the function is called.'
    'If the unvisited element is changed, when it gets processed, that changed value should be passed into the callback.'
//*-----

//*03 - every //----------has callback,  no mutation
//- init
    'If the first argument of the function is not an Array, it should throw TypeError.'
    'It should run the callback array.length times.'
    'It should skip unassigned indexes.'    
    'It should pass in the ith element as the first argument to the callback.'
    'It should pass in the ith position as the second argument to the callback.'
    'It should pass in the original array as the third argument to the callback.'
//- this     
    'It should accept optional this object.'
//- function behaviour 
    'It should return a boolean value.'
    'If the array is empty, it should return true.'
    'If the callback returns false, it should return false.'
    'If the callback returns false, it should not check the remaining elements.'
    'If callbacks return only true, it should return true.'
    'It should not change the original array.'
    'It should skip an element that is deleted.'
    'It should not run the callback for an element that has been appended to the array after the function is called.'
    'If the unvisited element is changed, when it gets processed, that changed value should be passed into the callback.'
//*-----

//*04 - some //----------has callback,  no mutation
//- init
    'If the first argument of the function is not an Array, it should throw TypeError.'
    'It should run the callback array.length times.'
    'It should skip unassigned indexes.'    
    'It should pass in the ith element as the first argument to the callback.'
    'It should pass in the ith position as the second argument to the callback.'
    'It should pass in the original array as the third argument to the callback.'
//- this     
    'It should accept optional this object.'
//- function behaviour 
    'It should return a boolean value.'
    'If the array is empty, it should return false.'
    'If the callback returns true, it should return true.'
    'If the callback returns true, it should not check the remaining elements.'
    'If callbacks return only false, it should return false.'
    'It should not change the original array.'
    'It should skip an element that is deleted.'
    'It should not run the callback for an element that has been appended to the array after the function is called.'
    'If the unvisited element is changed, when it gets processed, that changed value should be passed into the callback.'
//*-----

//*05 - reduceRight //----------has callback, no mutation
//- init
    'If the first argument of the function is not an Array, it should throw TypeError.'
    'If initialValue, the callback starts at the index equal to (array.length - 1) and should run array.length times.'
    'If no initialValue, the callback starts at the index equal to (array.length - 2) and should run array.length -1 times.'
    'If initialValue, it should skip unassigned indexes.'
    'If no initialValue, it should skip unassigned indexes too.'
    'It should pass in the currentValue as the second argument to the callback.'
    'It should pass in the ith position as the third argument to the callback.'
    'It should pass the array as the fourth argument to the callback.'
//-  function behaviour 
    'It should not change the original array.'
    'If initialValue, accumulator should start with initialValue.',
    'If initialValue, currentValue should start with array[array.length-1].'
    'If initialValue, and an array is empty, it should return initialValue without calling the callback.'
    'If no initialValue, accumulator should start with array[array.length-1].'
    'If no initialValue, currentValue should start with array[array.length-2].'
    'If no initialValue, and array is empty throw TypeError.'
    'If no initialValue, an array has one element, it should return that element without calling the callback.'
    'It should actually reduce.'
//*-----

//*06 - concat //----------no callback, no mutation
//- init
    'If the first argument of the function is not an Array, it should throw TypeError.'

//- function behaviour 
    'It should return a new array.'
    'It should not change the original array.'
    'The returned array should contain all elements of the original array.'
    'The returned array should contain elements of arguments in the order they are passed into the function.'
    'If an array is passed in as an argument, the returned array should contain all elements of that array.'
    'If an original array is modified, that change should be visible in the returned array and vice versa.'    
    'If an array passed in as an argument is modified, that change should be visible in the returned array and vice versa.'
//*-----

//*07 - indexOf //----------no callback, no mutation
//- init
    'If the first argument of the function is not an Array, it should throw TypeError.'
    
//- function behaviour  
    'It should not change the original array.'
    'If the searchElement is equal to the element of the array, it should return the index of that element.'
    'If the searchElement is equal to more than one element of the array, it should return the index of the first occurrence.'
    'If the searchElement is not equal to any element of the array, it should return -1.'

    'If no fromIndex, the fromIndex should be equal to 0 and the whole array should be searched.'
    'If fromIndex is not a number, it should be equal to 0 and the whole array should be searched.'
    'If fromIndex is greater than array.length, it should return -1 and the array should not be searched.'
    'If fromIndex is equal to the array.length, it should return -1 and the array should not be searched.'
    'If fromIndex is negative, the fromIndex should be equal to the (array.length + fromIndex)'
    'If fromIndex is negative, and the calculation of (array.length + fromIndex) is smaller than 0, the fromIndex should be equal to 0.'
    
//*08 - lastIndexOf //----------no callback, no mutation
//- init
    'If the first argument of the function is not an Array, it should throw TypeError.'

//- function behaviour 
    'It should not change the original array.' 
    'If the searchElement is equal to the element of the array, it should return the index of that element.'
    'If the searchElement is equal to more than one element of the array, it should return the index of the first occurrence.'
    'If the searchElement is not equal to any element of the array, it should return -1.'

    'If no fromIndex, the fromIndex should be equal to (array.length - 1) and the whole array should be searched.'
    'If fromIndex is not a number, it should be equal to (array.length - 1) and the whole array should be searched.'
    'If fromIndex is greater than array.length, it should be equal to (array.length - 1) and the array should not be searched.'
    'If fromIndex is equal to the array.length, it should be equal to (array.length - 1) and the array should not be searched.'
    'If fromIndex is negative, the fromIndex should be equal to the (array.length + fromIndex)'
    'If fromIndex is negative, and the calculation of (array.length + fromIndex) is smaller than 0, it should return -1 and the array should not be searched.'
//*-----

//*09 - includes //----------no callback, no mutation
//- init
'If the first argument of the function is not an Array, it should throw TypeError.'
    
//- function behaviour  
'It should return a boolean value.'
'If the valueToFind is equal to the element of the array, it should return true.'
'If the valueToFind is not equal to any element of the array, it should false.'
'It should not change the original array.' 

'If no fromIndex, the fromIndex should be equal to 0 and the whole array should be searched.'
'If fromIndex is not a number, it should be equal to 0 and the whole array should be searched.'
'If fromIndex is greater than array.length, it should return false and the array should not be searched.'
'If fromIndex is equal to the array.length, it should return false and the array should not be searched.'
'If fromIndex is negative, the fromIndex should be equal to the (array.length + fromIndex).'
'If fromIndex is negative, and the calculation of (array.length + fromIndex) is smaller than 0, the fromIndex should be equal to 0.'
//*-----


//*10 - slice //----------no callback, no mutation
//- init
'If the first argument of the function is not an Array, it should throw TypeError.'
//- function behaviour  
'It should return a new array.'
'It should not change the original array.'
'It should return a new array as a portion of originalArray from begin index to end index.'
'If no begin, the begin should be equal to 0.'
'If no end, the end should be equal to (array.length - 1).'
'If end, it should not include an element on the position equal to end.'
'If begin is negative, the begin should be equal to the (array.length + begin).'
'If begin is negative, and the calculation of (array.length + begin) is smaller than 0, the begin should be equal to 0.'
'If end is negative, the end should be equal to the (array.length + end).'
'If end is negative, and the calculation of (array.length + end) is smaller than 0, the end should be equal to array.length.'
'If begin is greater than array.length, it should return an empty array.'
'If end argument is greater than array.length, the end should be equal to the array.length.'
//*-----


//*11 - join //----------no callback, no mutation
//- init
'If the first argument of the function is not an Array, it should throw TypeError.'

//- function behaviour  
'It should return a new string.'
'It should not change the original array.'
'It should insert the separator between each pair of adjacent elements of the array'
'If no separator, the separator should be equal to ",".'
'If separator is an empty string, the separator should be equal to "".'
'If separator is not a string, it should be converted into a string.'
'If the array has one element, it should return that element without using the separator.'
'If an array is empty, it should return "".'
'It should join array-like objects too.'
//*-----

//---------- 
//*12 - push //----------no callback, mutates
//- init
'If the first argument of the function is not an Object, it should throw TypeError.'

//- function behaviour  
'It should add an element at the end of the original array.'
'If more that one element is passed in, it should add them at the end of the original array in the order they are passed in.'
'It should return the new length of the original array.'
'It should add elements at the end of the array-like object too.'
//*-----


//*13 - pop ///----------no callback, mutates
//- init
'If the first argument of the function is not an Object, it should throw TypeError.'

//- function behaviour  
'It should remove the last element from the original array.'
'It should return an element which has been removed.'
'It should update the length of the original array.'
'If array is empty, it should return undefined.'
'It should remove the last element in array-like-object too.'
//*-----


//*14 - shift //-----------no callback, mutates
//- init
'If the first argument of the function is not an Object, it should throw TypeError.'

//- function behaviour  
'It should remove the first element of the original array.'
'It should return an element which has been removed.'
'It should update the length of the original array.'
'If array is empty, it should return undefined.'
'It should remove the first element of array-like object too.'
//*-----


//*15 - unshift //-----------no callback, mutates
//- init
'If the first argument of the function is not an Object, it should throw TypeError.'
//- function behaviour  
'It should add an element at the beginning of the original array.'
'If more that one element is passed in, it should add them at the beginning of the original array in the order they are passed in.'
'It should return the new length of the original array.'
'It should add elements at the beginning of array-like-object too.'
//*-----


//*16 - fill //-----------no callback, mutates
//- init
'If the first argument of the function is not an Object, it should throw TypeError.'

//- function behaviour  
'It should insert a static value from start to end index into the original array.'
'It should return the modified array'
'If no end, the end should be equal to array.length.'
'If no start, the start should be equal to 0.'
'If start is negative, the start should be equal to the (array.length + start).'
'If end is negative, the end should be equal to the (array.length + start).'
'If start is negative, and the calculation of (array.length + start) is smaller than 0, the begin should be equal to 0.'
'If end is negative, and the calculation of (array.length + end) is smaller than 0, the begin should be equal to 0.'
'It should insert a static value from start to end index into array-like object too.'
//*-----


//*17 - reverse //-----------no callback, mutates
//- init
'If the first argument of the function is not an Object, it should throw TypeError.'

//- function behaviour  
'It should reverse the position of elements in the original array. The first element should become the last, and the last element should become the first.'
'It should return the modified original array.'
'It should reverse the position of elements in array-like object too.'
//*-----

//*18 - copyWithin //-----------no callback, mutates
//- init
'If the first argument of the function is not an Object, it should throw TypeError.'

//- function behaviour  
'It should copy part of the original array to another location within the original array.'
'It should return the modified original array.'
'It should not change the length of the original array.'
'If target is not a number, the target should be equal to 0.'
'If target is equal to array.length, nothing should be copied.'
'If target is greater than array.length, nothing should be copied.'
'If target is negative, the target should be equal to the (array.length + target).'
'If start is negative, and the calculation of (array.length + target) is smaller than 0, the target should be equal to 0.'
'If target is greater than start, the copied sequence should be trimmed to fit the length of the original array.'
'If no end, the end should be equal to array.length.'
'If end is negative, the end should be equal to the (array.length + end).'
'If end is negative, and the calculation of (array.length + end) is smaller than 0, the end should be equal to 0.'
'If no start, the start should be equal to 0.'
'If start is negative, the start should be equal to the (array.length + start).'
'If start is negative, and the calculation of (array.length + start) is smaller than 0, the start should be equal to 0.'
'It should copy part of the array-like object to another location within array-like object too.'
//*-----


//*19 - sort //----------
//- init
'If the first argument of the function is not an Object, it should throw TypeError.'
'It should return the sorted original array.'
'It should pass in the ith + 1 element as the first argument to the callback comparison function.'
'It should pass in the ith element as the second argument to the callback comparison function.'
//- function behaviour  
'If compareFunction returns less than 0, firstEl should go before secondEl.'
'If compareFunction returns 0, firstEl and secondEl should stay unchanged.'
'If compareFunction returns more than 0, secondEl should go before firstEl.'
'If compareFunction function, it should sort elements in ascending order.'
'If compareFunction function, it should sort elements in descending order too.'
'If compareFunction function, if possible it should transfer elements into numbers and it should sort them according to the return value of the callback compare function.'
'If compareFunction function, all undefined elements should be sorted to the end of the array with no call to compareFunction.'
'If no compareFunction, if possible all non-undefined array elements should be converted to strings.'
'If no compareFunction, all non-undefined array elements should be sorted by comparing strings.'
'If no compareFunction, all undefined elements should be sorted to the end of the array.'
//*-----

//*20 - splice //----------
//- init
//- function behaviour  
'If the first argument of the function is not an Object, it should throw TypeError.'
'If no elements are removed, it should return an empty array.'
'It should remove an element from the original array.'
'It should return an array containing the deleted elements.'
'If no start, it should return an empty array.'
'If start is greater than array.length, the start should be equal to array.length.'
'If start is negative, the start should be equal to the (array.length + start).'
'If start is negative, and the calculation of (array.length + start) is smaller than 0, the start should be equal to 0.'
'If no deleteCount, the deleteCount should be equal to (array.length - 1).'
'If deleteCount is equal to (array.length - start), the deleteCount should be equal to (array.length - start).'
'If deleteCount is greater than (array.length - start), the deleteCount should be equal to (array.length - start).'
'If deleteCount is equal to 0, no elements should be removed.'
'If deleteCount is negative, no elements should be removed.'
'If items and deleteCount are equal, it should replace element on the start index with the item.'
'If deleteCount is greater than items, it should replace element on the start index with the item and delete the next element from the original array.'
'If items are greater than deleteCount, it should extend original array length and add items.'
//*-----