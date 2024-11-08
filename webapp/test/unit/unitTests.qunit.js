/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"mentoriafiorikamodel1vsm/zkaui_model1_vsm/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
