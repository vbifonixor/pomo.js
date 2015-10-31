/* global jQuery */

(function ($) {
	'use strict';

	VMasker(document.querySelector(".main-timer")).maskPattern('99:99');
	VMasker(document.querySelector(".short-break")).maskPattern('99:99');
	VMasker(document.querySelector(".long-break")).maskPattern('99:99');
})(jQuery);
