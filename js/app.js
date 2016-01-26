function today() {
	var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
		searchTime = time();
	}

	//search the rooms
	for (var i = 0; i < rooms.length; i++) {
		console.log("Checking Room " + rooms[i].name )
		for (var j = 0; j < rooms[i].timetables.length; j++) {
			//Check todays timetable
			if (today() === rooms[i].timetables[j].day) {
				// Find out what periods are free
				for (var k = 0; k < rooms[i].timetables[j].free_periods.length; k++) {
					if (
						searchTime >= rooms[i].timetables[j].free_periods[k].start &&
						searchTime <= rooms[i].timetables[j].free_periods[k].finnish
						) {
						// Push
						freeRooms[freeRoomIndex] = {};
						freeRooms[freeRoomIndex].name = rooms[i].name;
						freeRooms[freeRoomIndex].freeUntil = convertTime(rooms[i].timetables[j].free_periods[k].finnish);
						freeRoomIndex++;
						//freePeriods.push(rooms[i].timetables[j].free_periods[k]);
					}
				};
			};	
		};
	}
	// This function takes a numered format and converts it to time string
	function convertTime(time) {
		/*var timePeriod;
		if (timePeriod >= 1300) {
			timePeriod = " PM"
		} else timePeriod = " AM";*/

 		var time = time.toString();
		strArray = time.split("");
		newString = "";
		for (var i = 0; i < strArray.length; i++) {
			if ( i === strArray.length - 2) {
				newString += ":";
			}
			newString += strArray[i]
		};

		//newString += timePeriod;

		return newString;
	}
	console.log(freeRooms)
	return freeRooms;
}
// Serachs for free rooms and appends them to the document
// pass the time paramater a value for a specific time 
function init() {
	// 
	var searchTime;
	// Clear the Serach Results
	document.getElementById("ul").innerHTML = "";
	document.getElementById("h2").innerHTML = "";
	//Check which option is used
	if (document.getElementById("now").checked === "checked") {
		alert(this);
		searchTime = time();
	} else {
		var selectedTime;
		// Get Selceted elements values
		// iterate through the select options and get the selected one
		searchTime = selectedTime;
	}
	var freeRooms = findFreeRooms(later);

	function createListItems(x) {
		var els = [];
		for (var i = 0; i < x; i++) {
			els.push(document.createElement("li"));
		};
		return els;	
	}

	function updateListItems() {
		var els = createListItems(freeRooms.length);
		for (var i = 0; i < els.length; i++) {
			els[i].innerHTML = "<strong>" + freeRooms[i].name + "</strong>" + " is free until " + "<strong>" + freeRooms[i].freeUntil + "</strong>" ;
		};
		return els;
	}


	function renderHTML() {
		if (true/*isScoolOpen()*/) {
			if (freeRooms.length > 0) {
				document.getElementById('h2').innerText = "The Following Rooms are Free";
				for (var i = 0; i < updateListItems().length; i++) {
					document.getElementById('ul').appendChild(updateListItems()[i]);
				};
			} else {
				document.getElementById('h2').innerText = "No free rooms available :(";
			}
		} else {
			document.getElementById('h2').innerText = "School is closed";
		}
		
	};

	setTimeout(function(){
		renderHTML();
	}, 500)

}

document.getElementById("btn").onclick = init;