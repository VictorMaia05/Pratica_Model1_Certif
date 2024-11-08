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
            let sNome = this.getView().byId("inputNome").getValue();

            let sDtNasc = this.getView().byId("inputDt").getValue();

            let sSexo = this.getView().byId("inputSexo").getSelectedKey();

            let sAltura = this.getView().byId("inputAltura").getValue();

            let oAddDialog = {
                "Nome": sNome,
                "Idade": sDtNasc,
                "Sexo": sSexo,
                "Altura": sAltura
            }

            let oModel = this.getView().getModel().getData().dataTable;

            oModel.push(oAddDialog);

            this.getView().byId("customerTable").getBinding("items").refresh();

            oEvent.getSource().getParent().destroy();
        },

        onCloseCadastro: function(oEvent) {
            oEvent.getSource().getParent().destroy();
        }
    });
});
