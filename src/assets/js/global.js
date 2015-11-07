/* global jQuery */

(function ($) {
	'use strict';

	$.mask.definitions['5'] = "[0-5]";
	$("[data-timer='main']").mask('59:59', {placeholder: "  :  "});
	$("[data-timer='short']").mask('59:59', {placeholder: "  :  "});
	$("[data-timer='long']").mask('59:59', {placeholder: "  :  "});
})(jQuery);
