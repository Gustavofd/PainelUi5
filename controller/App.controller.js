sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV"
], function (Controller, Filter, FilterOperator, Export, ExportTypeCSV) {
	"use strict";

	return Controller.extend("opensap.myapp.controller.App", {

		onFilterPendencias : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("City", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("tabelaPendenciasId");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		
		_getDialogRegistroPendencia : function () {
			 if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("opensap.myapp.view.RegistroPendenciaDialog");
				this.getView().addDependent(this._oDialog);
			 }
			 return this._oDialog;
		},
		
		/*onPressViewRegistroPendencia : function () {
			 this._getDialogRegistroPendencia().open();
		},*/
		
		onPressViewRegistroPendencia:function(oEvent) {
			var oControl = oEvent.getSource();
			var oItemPath = oControl.getBindingContext().getPath();
			//var oItemDetailPath = oItemPath + "/Customers(CustomerID)";

			//if (!this.selectLoadProfile) {
				  this.selectLoadProfile = sap.ui.xmlfragment(this.getView().getId(), 
						  "opensap.myapp.view.RegistroPendenciaDialog", this);
				  this.getView().addDependent(this.selectLoadProfile);

			//}
			
			//this.selectLoadProfile.bindElement(oItemDetailPath);
			this.selectLoadProfile.bindElement(oItemPath);
			this.selectLoadProfile.open();
		},
		
		onDataExport : function(oEvent) {

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType : new ExportTypeCSV({
					separatorChar : ";"
				}),

				// Pass in the model created above
				models : this.getView().getModel(),

				// binding information for the rows aggregation
				rows : {
					path : "/Customers"
				},

				// column definitions with column name and binding info for the content
				
				columns : [{
					name : "CustomerID",
					template : {
						content : "{CustomerID}"
					}
				}, {
					name : "ContactTitle",
					template : {
						content : "{ContactTitle}"
					}
				}, {
					name : "ContactName",
					template : {
						content : "{ContactName}"
					}
				}, {
					name : "Address",
					template : {
						content : "{Address}"
					}
				}, {
					name : "City",
					template : {
						content : "{City}"
					}
				}]
			});

			// download exported file
			oExport.saveFile().catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
		}
	});
});
