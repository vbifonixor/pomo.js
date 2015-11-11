/* global jQuery */

(function ($, exports) {
	'use strict';
	// Creating masks on timer inputs
	$.mask.definitions['5'] = "[0-5]";
	$("[pomo-timer='main']").mask('59:59', {placeholder: "  :  "});
	$("[pomo-timer='short']").mask('59:59', {placeholder: "  :  "});
	$("[pomo-timer='long']").mask('59:59', {placeholder: "  :  "});

	// Main Pomo.js functionality goes from here

	var pomo = { 
				 helpers: {},
				 m: {}, // "m" is short for "methods"
				 time: {},
				 settings: {}, 
				 dom: {},
				 seq: ["main", "short", "main", "short", "main", "short", "main", "long"],
			   };

	// Helper functions and variables
	pomo.helpers.isGoing = 0;
	pomo.helpers.timeFromText = function(text) {
		return text.split(":").map( function (timeStr) { return parseInt(timeStr); } );
	}
	pomo.helpers.timeFromInput = function(input) { 
		return pomo.helpers.timeFromText(input.val());
	}
	pomo.helpers.textFromTime = function(time) {
		return time.map(function(x) { 
			var stringed = x.toString();
			return stringed.length == 2 ? stringed : "0" + stringed;
		}).join(":");
	}
	pomo.helpers.arraysAreEqual = function (firstArr, secondArr) {
		if (firstArr === secondArr) return true;
		if (firstArr == null || secondArr == null) return false;
		if (firstArr.length != secondArr.length) return false;

		// If you don't care about the order of the elements inside
		// the array, you should sort both arrays here.

		for (var i = 0; i < firstArr.length; ++i) {
		if (firstArr[i] !== secondArr[i]) return false;
		}
		return true;
	}

	// Methods
	pomo.m.isPaused = function() {
		return pomo.dom.startPauseBtn.attr("pomo-btn") == "start" ? true : false;
	}
	pomo.m.isStarted = function() {
		return !pomo.helpers.arraysAreEqual(pomo.time.mainBefore.length ? pomo.time.mainBefore : pomo.time.main, pomo.helpers.timeFromText(pomo.dom.face.text()));
	}

	pomo.m.beep = function() {
		return true;
	}

	pomo.m.start = function() {
		if (pomo.helpers.arraysAreEqual(pomo.currentTime.time.data, [])) {
			pomo.currentTime.cycle = "main";
			pomo.currentTime.time.data = pomo.time.main;
		};
		pomo.helpers.interval = setInterval(function () {
			// Countdown goes here
			pomo.dom.face.text(pomo.helpers.textFromTime(pomo.currentTime.time.data));
			if(!pomo.currentTime.time.decrease()) {
				pomo.m.beep();
				pomo.currentTime.seqNo += 1;
				pomo.currentTime.seqNo %= 8;
				pomo.currentTime.cycle = pomo.seq[pomo.currentTime.seqNo];
				pomo.currentTime.data = pomo.time[pomo.currentTime.cycle];
			}
		}, 1000)
		return true;
	}
	pomo.m.pause = function() {
		clearInterval(pomo.helpers.interval);
		return true;
	}


	// jQuery DOM objects
	pomo.dom = {
		face: $("[pomo-face]"), // The clock face
		startPauseBtn: $("[pomo-btn = \"start\""), // "start" because timer is off by default
		resetBtn: $("[pomo-btn = \"reset\""),
		timeInputs: {
			main: $("[pomo-timer=\"main\"]"),
			short: $("[pomo-timer=\"short\"]"),
			long: $("[pomo-timer=\"long\"]")
		},
		settings: {
			nonstop: $("[pomo-option=\"nonstop\""),
			mute: $("[pomo-option=\"mute\"")
		}
	}

	// Initial setups

	// Time settings
	pomo.time = {
		mainBefore: [],
		main: pomo.helpers.timeFromInput(pomo.dom.timeInputs.main),
		short: pomo.helpers.timeFromInput(pomo.dom.timeInputs.short),
		long: pomo.helpers.timeFromInput(pomo.dom.timeInputs.long) 
	};
	// An object for saving current timer time
	pomo.currentTime = {
		cycle: "main", // default value, changes when going through next cycle
		seqNo: 0,
		time: {
			data: [],
			decrease: function(){
				if (this.data[0] === 0 && this.data[1] === 0) {
					return false;
				}
				if (this.data[1] === 0) {
					this.data[0] = this.data[0] - 1;
					this.data[1] = 59;
				}
				else {
					this.data[1] = this.data[1] - 1;
				}
				return true;
			}
		}
	}
	// Nonstop and mute settings
	pomo.settings = {
		nonstop: pomo.dom.settings.nonstop[0].checked,
		mute: pomo.dom.settings.mute[0].checked
	};


	// Updating setups with inputs
	$("[pomo-timer]").on("change", function () {
		pomo.time.mainBefore = pomo.time.main;
		pomo.time[$(this).attr("pomo-timer")] = pomo.helpers.timeFromInput($(this));
		console.log(pomo); //d
	})
	$("[pomo-option]").on("change", function () {
		pomo.settings[$(this).attr("pomo-option")] = $(this)[0].checked;
		console.log(pomo); //d
	})

	// Updating clock face with input
	pomo.dom.timeInputs.main.on("change", function () {
		if (!pomo.m.isStarted()){
			pomo.dom.face.text(pomo.helpers.textFromTime(pomo.time.main));
		}
	});

	// Button events
	pomo.dom.startPauseBtn.on('click', function() {
		if (pomo.dom.startPauseBtn.attr("pomo-btn") === "start") {
			pomo.dom.startPauseBtn.attr("pomo-btn", "pause").text("Pause");
			pomo.m.start();
		}
		else {
			pomo.dom.startPauseBtn.attr("pomo-btn", "start").text("Start");
			pomo.m.pause();
		}
	});

	console.log(pomo); //d
	exports.pomo = pomo;
})(jQuery, window);
