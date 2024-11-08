sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("mentoria.fiori.ka.model1.vsm.zkauimodel1vsm.controller.View1", {
        onInit: function () {
            let oModelJson = new JSONModel();
            oModelJson.loadData("model/TableModel.json")
            this.getView().setModel(oModelJson);
        },

        onClickNewCustomer: function(oEvent) {
            let oView = this.getView();
            var oBindingCtx = this.getView().getModel().getData();
            let oDialogCadastro = this.getView().byId("dialogCadastro");

            if (!oDialogCadastro) {
                Fragment.load({
                    id: oView.getId(),
                    name: "mentoria.fiori.ka.model1.vsm.zkauimodel1vsm.view.fragments.CadastroCliente",
                    type: "XML",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                   
                    oDialog.bindElement({path: "/dataForm/0" });
                    oDialog.open();
                })
            } else {
                oDialogCadastro.open();
            }
        },

        onSubmitCadastro: function(oEvent) {

        },

        onCloseCadastro: function(oEvent) {

        }
    });
});
