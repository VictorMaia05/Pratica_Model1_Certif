sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "mentoria/fiori/ka/model1/vsm/zkauimodel1vsm/Util/Formatter",
    "sap/m/MessageBox"
],
function (Controller, JSONModel, Fragment, Formatter, MessageBox) {
    "use strict";

    return Controller.extend("mentoria.fiori.ka.model1.vsm.zkauimodel1vsm.controller.View1", {

        Formatter: Formatter,

        onInit: function () {
            let oModelJson = new JSONModel();
            oModelJson.loadData("model/TableModel.json")
            this.getView().setModel(oModelJson);
        },

        check_inputs: function () {
            let sError = false;

            let sNome = this.getView().byId("inputNome").getValue();
            if (sNome.length <= 0) {
                sError = true; 
            };

            let sData = this.getView().byId("inputDt").getValue();
            if (sData.length <= 0) {
                sError = true; 
            }
            else if (this.getView().byId("inputDt").isValidValue() == false) {
                sError = true; 
            };

            let sAltura = this.getView().byId("inputAltura").getValue();
            if (sAltura == 0.00) {
                sError = true; 
            }
            //else if (isNaN(sAltura) && isNaN(parseFloat(sAltura))) {
            //    sError = true; 
            //}

            return sError;
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

            let sHasError = this.check_inputs();

            if (sHasError == false) {

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
            }
            else {
                MessageBox.error("Preencher campos obrigatórios no padrão correto!");
            }
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
