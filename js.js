$(document).ready(function(){
	//Once submit is clicked, the sorting begins
	$('#submitdiv').click(function(){
		//Splits the input for sorting
		var a = document.getElementById('input').value.split(',');
		//Runs the quicksort and displays the results with the if sorting it forward (low to high) if forward is selected, otherwise sorting it backward (high to low)
		if(document.getElementById('dir').selectedIndex=='0'){
			document.getElementById("display").innerHTML = extract(a);
		} 
		else{
			document.getElementById("display").innerHTML = extract(a).reverse();
		};
	});

	//For objects, does not currently work
	/*$('#objectsort').click(function(){
		var objarray = [{fname:'Justin',lname:'Cook',age:'17'},{fname:'Simran',lname:'Singh',age:'18'},{fname:'Lisa',lname:'Pham',age:'16'}];
		var a = []
		var show = []
		for(i=0;i<objarray.length;i++){
			//First Name
			if(document.getElementById('dir').selectedIndex=='0'){
				a=a.push(objarray[i][fname])
			}
			//Last Name
			else if(document.getElementById('dir').selectedIndex=='1'){
				a=a.push(objarray[i][lname])
			}
			//Age
			else{
				a=a.push(objarray[i][age])
			};
		}
		a=extract(a);
		for(i=0;i<objarray.length;i++){
			for(b=0;b<a.length;b++){
				if(a[b]==objarray[i][document.getElementById('dir').selectedIndex==i]){
					if(show.indexOf("<div class='container'>" + testArr[t].fname + " ----- " + testArr[t].lname + " ----- " + testArr[t].age + "</div>") < 0){
    					 show.push("<div class='container'>" + testArr[t].fname + " ----- " + testArr[t].lname + " ----- " + testArr[t].age + "</div>");
  					}
				}
			}
		}
		document.write(show);

	});*/
	//Runs the actual quicksort (next function) and then splits up the results into two arrays and joins for letters and numbers are seperated
	function extract(item){
		//Letter and number arrays
		var letters2 = [];
		var numbers2 = [];
		//Runs the actual sorting (below)
		var b = qsort(item);
		//If a comma or illegal character was found below displays error message
		if(b===false){
			return 'Please check for extra commas or illegal characters';
		};
		//Goes through the sorted input, splitting into the two above arrays
		for(i=0;i<b.length;i++){
			//Checks if the value at i is a number, if it is it puts it into the number array, otherwise into the letter array
			if(isNaN(b[i])===false){
				numbers2.push(b[i]);
			}
			else{
				letters2.push(b[i]);
			};
		};
		//Returns the letters and then the numbers to be displayed
		return letters2.concat(numbers2);
	};

	//Quick sorting function
	function qsort(list){
		//Checks if the list has a length of 0, if so returns a blank array for ending the function
		//Having a length of 0 means that all elements were moved into the left/right arrays and sorted
		if(list.length==0){
			return [];
		};
		//Left and right arrays for recursion, pivot for comparison (which is the first element in the array)
		var left = [];
		var right = [];
		var pivot = list[0];
		for(i=1;i<list.length;i++){
			//Checks if the value at i is a number, if it is it parses the value into an integer
			if(isNaN(list[i])===false){
				list[i]=parseInt(list[i]);
				//Checks to see if it was actually a number, if it wasn't (meaning comma or illegal character) then returns false for above
				if(isNaN(list[i])===true){
					return false;
				};
			};
			//If the list at this point is less than the pivot value, it sorts it into the left array (consisting of the lower values)
			//If it is sorted then push returns a value of 0, thus ending the sorting due to the initial if statement
			if(list[i]<pivot){
				left.push(list[i])
			}
			//If not the above then it does it to right array (consisting of the higher values)
			else{
				right.push(list[i])
			};
		};
		//Repeats the process for the new left array and then again for the new right array, with it gradually breaking each array up and repeating
		//This is the recursion portion
		//concat then joins the pivot and the now sorted higher numbers to the now sorted lower numbers, with higher to right of pivot and pivot in middle
		return qsort(left).concat(pivot,qsort(right));
	};
});