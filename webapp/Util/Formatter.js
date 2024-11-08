sap.ui.define(function () {
    "use strict";

    let Formatter = {

        calcula_idade(vDtNasc) { 

            let vData = new Date(vDtNasc);

            let vDiff_ms = Date.now() - vData.getTime();

            let vData_aux = new Date(vDiff_ms); 

            return Math.abs(vData_aux.getUTCFullYear() - 1970);
        },

        idade: function (vDtNasc) {
            return Formatter.calcula_idade(vDtNasc);
        },

        iconSexo: function (vSexo) {

            let sTextMale = this.getView().getModel("i18n").getResourceBundle().getText("GeneroMasculino");
            let sTextFemale = this.getView().getModel("i18n").getResourceBundle().getText("GeneroFeminino");
            let sTextOutros = this.getView().getModel("i18n").getResourceBundle().getText("GeneroOutros");

            let sResult = "";

            if( vSexo == sTextFemale ) {
                sResult = "sap-icon://female";
            }
            else if( vSexo == sTextMale ) {
                sResult = "sap-icon://male";
            }
            else if( vSexo == sTextOutros ) {
                sResult = "";
            }

            return sResult;
        },

        stateSexo: function (vSexo) {

            let sTextMale = this.getView().getModel("i18n").getResourceBundle().getText("GeneroMasculino");
            let sTextFemale = this.getView().getModel("i18n").getResourceBundle().getText("GeneroFeminino");
            let sTextOutros = this.getView().getModel("i18n").getResourceBundle().getText("GeneroOutros");

            let sResult = "";

            if( vSexo == sTextFemale ) {
                sResult = "Error";
            }
            else if( vSexo == sTextMale ) {
                sResult = "Information";
            }
            else if( vSexo == sTextOutros ) {
                sResult = "None";
            }

            return sResult;
        }
    };

    return Formatter;

}, true);