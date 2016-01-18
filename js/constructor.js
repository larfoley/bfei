function Room(name, bool, timetables) {
	this.name = name;
	this.hasComputers = bool;
	this.timetables = timetables;
}

function Timetable(day, free_periods) {
	this.day = this.day;
	this.free_periods = free_periods;
}

function FreePeriod(start, finnish) {
	this.start = start;
	this.finnish = finnish;
}


function newRoom() {
	var newRoom;
	//var roomFoo = new Room("room foo", true, []);
	//var timetable = new Timetable("Monday" free_periods);
	//var free_period = new FreePeriod(1500, 2000);
	return newRoom;
}

//console.log(newRoom());