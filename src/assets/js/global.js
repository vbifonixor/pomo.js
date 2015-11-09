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
			   };

	// Helper functions
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
	})


	console.log(pomo); //d
	exports.pomo = pomo;
})(jQuery, window);
