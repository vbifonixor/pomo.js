/* global jQuery */

(function ($) {
	'use strict';

	$.mask.definitions['5'] = "[0-5]";
	$(".main-timer").mask('59:59', {placeholder: "  :  "});
	$(".short-break").mask('59:59', {placeholder: "  :  "});
	$(".long-break").mask('59:59', {placeholder: "  :  "});
})(jQuery);
