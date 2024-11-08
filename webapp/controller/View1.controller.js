sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "mentoria/fiori/ka/model1/vsm/zkauimodel1vsm/Util/Formatter"

],
function (Controller, JSONModel, Fragment, Formatter) {
    "use strict";

    return Controller.extend("mentoria.fiori.ka.model1.vsm.zkauimodel1vsm.controller.View1", {

        Formatter: Formatter,

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
                   
                    oDialog.bindElement({path: "/dataForm" });
                    oDialog.open();
                })
            } else {
                oDialogCadastro.open();
            }
        },

        onSubmitCadastro: function(oEvent) {

            let oModelForm = this.getView().getModel().getProperty("/dataForm");

            let oModelTable = this.getView().getModel().getProperty("/dataTable");

            // Se não seleciono nenhum, ele não consegue entender o FEMININO.
            // Ao colocar o código abaixo não sei pq ele carrega no MODEL. \\

            let sSexo = this.getView().byId("selectedSexo").getSelectedKey(); 

            oModelTable.push(oModelForm);

            oEvent.getSource().getParent().destroy();

            this.getView().getModel().setProperty("/dataTable", oModelTable);

            // Criei esse objeto pois ao mudar o model direto estava alterando também o model da tabela. \\
            let oModelFormNew = Object.create(oModelForm);

            for (const property in oModelFormNew) {
                oModelFormNew[property] = "";
            };

            this.getView().getModel().setProperty("/dataForm", oModelFormNew);

            // Sei que não necessitamos desse código,
            // pois já setamos o SETPROPERTY do MODEL,
            // Mas por algum motivo algumas vezes notei que o dado está no MODEL mas não atualiza a tabela. \\
            this.byId("customerTable").getBinding("items").refresh();

        },

        onCloseCadastro: function(oEvent) {
            oEvent.getSource().getParent().destroy();

            let oModelForm = this.getView().getModel().getProperty("/dataForm");

            for (const property in oModelForm) {
                oModelForm[property] = "";
            };

            this.getView().getModel().setProperty("/dataForm", oModelForm);
        }
    });
});
