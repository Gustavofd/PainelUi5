sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("opensap.myapp.controller.RegistroPendenciaDialog", {
		
		_getDialog : function () {
			// create dialog lazily
			if (!this._oDialog) {
				// create dialog via fragment factory
				this._oDialog = sap.ui.xmlfragment("opensap.myapp.view.RegistroPendenciaDialog", this);
			}
			return this._oDialog;
		},
		
		onPressCloseDialog: function() {
			this._getDialog().close();
		}
		
	});
});
