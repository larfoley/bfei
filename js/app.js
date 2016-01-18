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

function findFreeRooms(free) {
	var freeRooms = [];
	var free_periods;

	//search rooms
	for (var i = 0; i < rooms.length; i++) {
		console.log("Checking Room " + rooms[i].name )
		for (var j = 0; j < rooms[i].timetables.length; j++) {
			//Check timetables		
			if (today() === rooms[i].timetables[j].day) {
				for (var k = 0; k < rooms[i].timetables[j].free_periods.length; k++) {
					if (
						time() >= rooms[i].timetables[j].free_periods[k].start &&
						time() <= rooms[i].timetables[j].free_periods[k].finnish
						) { 
						freeRooms.push(rooms[i]);
						free_period = rooms[i].timetables[j].free_periods[k];
					}
				};
			};	
		};
	}
	if (free === "period") {
		return free_period
	} else {
		return freeRooms;
	}
	
}

function createListItems(x) {
	var els = [];
	for (var i = 0; i < x; i++) {
		els.push(document.createElement("li"));
	};
	return els;	
}

function updateListItems() {
	var freeRooms = findFreeRooms();

	for (var i = 0; i < freeRooms[0].timetables.length; i++) {
		if (freeRooms[0].timetables[i].day === today()) {
			for (var i = 0; i < freeRooms[0].timetables[i].free_periods.length; i++) {
		
			};
		}
	};
	
	var els = createListItems(freeRooms.length);
	for (var i = 0; i < els.length; i++) {
		els[i].innerText = freeRooms[i].name;
	};
	return els;
}

function setMode(mode) {
	var bool = false;
	if (localStorage.getItem("mode") === null) {
		alert("empty cache; setting mode to default");
		localStorage.setItem("mode", "default");
		return "default";
	}
	function changeMode(mode) {
		localStorage.setItem("mode", mode)
	}
	document.body.onclick = function() {
		var mode;
		if (bool) {
			mode = "auto"
			bool = false;
		} else {
			mode = "default"
			bool = true;
		}
		changeMode(mode);
		alert("mode has been changed to " + mode)

	}

}

function renderHTML() {
	if (true/*isScoolOpen()*/) {
		//Create html and upadte 
		if (findFreeRooms().length > 0) {
			document.getElementById('h2').innerText = "The Following Rooms are Free";
			for (var i = 0; i < updateListItems().length; i++) {
				document.getElementById('ul').appendChild(updateListItems()[i]);
			};
		} else {
			document.getElementById('h2').innerText = "No free rooms avilable :(";
		}
	} else {
		document.getElementById('h2').innerText = "School is closed";
	}	
};

function init() {
	if (localStorage.getItem("mode") === "default") {
		renderHTML();
	} else if (localStorage.getItem("mode") === "auto") {
		//autoMode();
	} else {
		//findFreeRooms();
		document.getElementById("btn").onclick = renderHTML();
	}
}

init();

document.getElementById("btn").onclick = renderHTML;



function convertTimeFormat(time) {
	var newTime;
	time = time.toString()

	newTime = time.charAt(0);
	newTime += time.charAt(1);
	newTime += ":";
	newTime += time.charAt(2);
	newTime += time.charAt(3)
	newTime += " PM"
	return newTime
}


window.onbeforeunload = function (e) {
  var e = e || window.event;
  var message = "You have not finnished the Quiz."
  //IE & Firefox
  if (e) {
    e.returnValue = message;
  }

  // For Safari
  return message;
};
console.log(convertTimeFormat(1890));