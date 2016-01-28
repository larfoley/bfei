function today() {
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var d = new Date();
	return days[d.getDay()];
}

function time(){
	var d = new Date();
	var hours = function() {
		h = d.getHours();
		if (h <= 9) {
			h = 0 + "" + h;
		}
		return h;
	};
	var mins = function() {
		var m = d.getMinutes();
		//var m = 8;
		if (m <= 9 ) {
			m = 0 + "" + m;
		}
		return m
	}
	t = hours() + "" + mins();
	t = parseFloat(t);
	return t;
}

function findFreeRooms(atTime) {

	var freeRooms = [];
	var freePeriods = [];
	var freeRoomIndex = 0;
	var searchTime;

	if (atTime !== undefined | atTime !== "") {
		//Set the searchTime var to a specified time
		searchTime = atTime;
	} else {
		// Set the searchTime var to the current time
		searchTime = time();
	}
	console.log(searchTime);
	//search the rooms
	for (var i = 0; i < rooms.length; i++) {
		//console.log("Checking Room " + rooms[i].name )
		for (var j = 0; j < rooms[i].timetables.length; j++) {
			//Check todays timetable
			if (today() === rooms[i].timetables[j].day) {
				// Find out what periods are free
				for (var k = 0; k < rooms[i].timetables[j].free_periods.length; k++) {
					if (
						searchTime >= rooms[i].timetables[j].free_periods[k].start &&
						searchTime < rooms[i].timetables[j].free_periods[k].finnish
						) {
						// Push object data of the free room
						freeRooms[freeRoomIndex] = {};
						freeRooms[freeRoomIndex].name = rooms[i].name;
						freeRooms[freeRoomIndex].freeUntil = convertTime(rooms[i].timetables[j].free_periods[k].finnish);
						freeRoomIndex++;
					}
				};
			};	
		};
	}
	// This function takes a numered format 
	// such for example 1800 and converts it to string value of 18:00
	function convertTime(time) {

 		var time = time.toString();
		strArray = time.split("");
		newString = "";
		for (var i = 0; i < strArray.length; i++) {
			if ( i === strArray.length - 2) {
				newString += ":";
			}
			newString += strArray[i]
		};

		return newString;
	}
	console.log(freeRooms);
	return freeRooms;
}
// Start searching for any free rooms
// and append them to the document
function init() {
	var searchTime;
	var freeRooms;
	var selectedTime;
	// Make sure the results html element is empty
	document.getElementById("ul").innerHTML = "";
	document.getElementById("h2").innerHTML = "";
	//Check which option is used
	if (document.getElementById("now").checked) {
		searchTime = time();
		console.log("checked")
		freeRooms = findFreeRooms(searchTime);
	} else {
		// Get Selceted elements values
		var selectEls = document.querySelector(".timeSelect").getElementsByTagName("option");
		console.log(selectEls)
		// iterate through the select options and get the selected one
		for (var i = 0; i < selectEls.length; i++) {
			if (selectEls[i].selected) {
				searchTime = parseInt(selectEls[i].value);
			}
		};
		freeRooms = findFreeRooms(searchTime);
	}

	function createListItems(x) {
		var els = [];
		for (var i = 0; i < x; i++) {
			els.push(document.createElement("li"));
		};
		return els;	
	}

	function updateListItems() {
		// Append list items contaning a free room  
		var els = createListItems(freeRooms.length);
		for (var i = 0; i < els.length; i++) {
			els[i].innerHTML = "<strong>" + freeRooms[i].name + "</strong>" + " is free until " + "<strong>" + freeRooms[i].freeUntil + "</strong>" ;
		};
		return els;
	}


	function renderHTML() {
		if (true/*isScoolOpen()*/) {
			// If only one result is found output 'there is one free room'
			// instead if 'there are x free rooms'
			if (freeRooms.length > 0) {
				document.getElementById('h2').innerText = "There is " + freeRooms.length + " free room";
				if (freeRooms.length > 1) {document.getElementById('h2').innerText += "s"};
				for (var i = 0; i < updateListItems().length; i++) {
					document.getElementById('ul').appendChild(updateListItems()[i]);
				};
			} else {
				document.getElementById('h2').innerText = "No free rooms available :(";
			}
		}
	};

	function scrollToResults() {
		var index = 0;
		function scroll(i) {
			document.body.scrollTop = i;
		}
		for (var i = 0; i < 500; i++) {
			scroll(index);
			index++
		};
		
	}
	// Delay html render
	setTimeout(function(){
		renderHTML();
		scrollToResults();
	}, 500)

}

document.getElementById("btn").onclick = init;