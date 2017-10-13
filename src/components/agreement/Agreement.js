import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//redux
import { connect, subscribe } from "react-redux";
import { saveAgreement } from "./AgreementActions";

import EventMessage from '../EventMessage';
import NavBar from '../NavBar';


export class Agreement extends Component {
    constructor() {
        super();
        this.state = {
            serverResponseReceived: "",
            completionEta: "",
            supervision: "",
            misc: "",
            form: {
                studentName: "",
                studentNumber: "",
                studentAddress: "",
                studentPhone: "",
                studentEmail: "",
                studentMajor: "",

                thesisTitle: "",
                thesisStartDate: "",
                thesisCompletionEta: "",
                thesisPerformancePlace: "",

                thesisSupervisorMain: "",
                thesisSupervisorSecond: "",
                thesisSupervisorOther: "",

                thesisWorkStudentTime: "",
                thesisWorkSupervisorTime: "",
                thesisWorkIntermediateGoal: "",
                thesisWorkMeetingAgreement: "",
                thesisWorkOther: "",

                studentGradeGoal: "",
            }
        }
    }

    componentDidMount() {
        document.title = "Agreement page";
    }

    componentDidUpdate() {
        //console.log(this.props.agreement[this.props.agreement.length - 1]);
    }
    getLastAgreementAction() {
        const forReturn = this.props.agreement[this.props.agreement.length - 1];

        return (forReturn === undefined ? {} : forReturn);
    }

    getResponseMessage = () => {

        const lastAction = this.getLastAgreementAction();

        if (lastAction === undefined) { return '' }
        else {
            if (lastAction.id === 'AGREEMENT_SAVE_SUCCESS') {
                return <EventMessage type='success' message='Tiedot tallennettiin onnistuneesti' />;
            }
            else if (lastAction.id === 'AGREEMENT_SAVE_FAILURE') {
                return <EventMessage type='error' message='Ilmestyi ongelmia' />;;
            }
            else {
                return '';
            }
        }
    }

    handleFormChange = (event) => {
        //console.log("handler called " + event.target.name + " " + event.target.value);
        const oldForm = this.state.form;
        let newForm = oldForm;
        newForm[event.target.name] = event.target.value;
        this.setState({ form: newForm })
    }


    getButton() {
        const lastAction = this.getLastAgreementAction();
        const workableButton = <button className="ui primary button" type="submit" onClick={this.sendForm}>Save</button>;
        const disabledLoadingButton = <button className="ui primary disabled loading button" type="submit" onClick={this.sendForm}>Save</button>;

        if (lastAction === undefined) { return workableButton }
        else {
            if (lastAction.id == 'AGREEMENT_SAVE_ATTEMPT') { return disabledLoadingButton }
            else { return workableButton }
        }
    }

    sendForm = (event) => {
        this.setState({ serverResponseReceived: "" });

        if (event !== undefined)
            event.preventDefault();

        this.props.saveAgreement(this.state.form);
    }

    defineFieldClasses = (labelType, fieldType, required) => {
        return ("field ui small " + labelType + " " + fieldType + " " + (required === true ? 'required' : ''));
    }

    createField = (fieldData, fieldKey) => {
        let forReturn = [];
        if (fieldData.inputType === "input") {

            forReturn = [<div key={fieldKey + "label"} className="ui label" >{fieldData.label}</div>,
            <input key={fieldKey} name={fieldData.name} type="text" placeholder={fieldData.placeholder} value={this.state.form[fieldData.name]} onChange={this.handleFormChange} />];

            if (fieldData.labelType.includes("right")) {
                forReturn.reverse();
            }
        } else if (fieldData.inputType === "textarea") {
            forReturn = [<label key={fieldKey + "label"}>{fieldData.label}</label>,
            <textarea key={fieldKey} name={fieldData.name} rows={fieldData.rows} placeholder={fieldData.placeholder} value={this.state.form[fieldData.name]} onChange={this.handleFormChange}></textarea>];
        }

        return (
            <div key={fieldKey + "fieldDiv"} className={this.defineFieldClasses(fieldData.labelType, fieldData.inputType, fieldData.required)}>
                {forReturn}
            </div>
        );
    }

    createFormSectionLine = (sectionLineData, sectionLineKey) => {
        if (sectionLineData.fields.length === 1) {
            return (this.createField(sectionLineData.fields[0], sectionLineKey + "field0"));
        } else if (sectionLineData.fields.length === 2) {
            return (
                <div key={sectionLineKey} className="two fields">
                    {this.createField(sectionLineData.fields[0], sectionLineKey + "field0")}
                    {this.createField(sectionLineData.fields[1], sectionLineKey + "field1")}
                </div>
            );
        }
    }


    createFormSection = (sectionData, sectionKey) => {
        let sectionLineList = sectionData.sectionLines.map(
            (sectionLineData, sectionLineKey) => {
                return this.createFormSectionLine(sectionLineData, "section" + sectionKey + "sectionLine" + sectionLineKey);
            })

        return (
            <div key={"section" + sectionKey}><br />
                <h3 className="ui dividing header">{sectionData.header}</h3>
                {sectionLineList}
            </div>
        );
    }

    createForm = () => {
        const formFieldProperties = {
            sections:
            [{
                header: "Opinnäytetyön tekijä",
                sectionLines: [
                    {
                        fields: [
                            { inputType: "input", name: "studentName", label: "Nimi", labelType: "right labeled", required: true, placeholder: "Etu- ja Sukunimi" },
                            { inputType: "input", name: "studentNumber", label: "Opiskelijanumero", labelType: "right labeled", required: true, placeholder: "XXXXXXX" },
                        ]
                    },
                    {
                        fields: [
                            { inputType: "input", name: "studentAddress", label: "Lähiosoite", labelType: "right labeled", required: true, placeholder: "Peräpolku 2 C 45, Nuppulinna" },
                            { inputType: "input", name: "studentPhone", label: "Puhelinnumero", labelType: "right labeled", required: true, placeholder: "000 000 00 00" },
                        ]
                    },
                    {
                        fields: [
                            { inputType: "input", name: "studentEmail", label: "Sähköpostiosoite", labelType: "right labeled", required: true, placeholder: "nimi@domain.com" },
                            { inputType: "input", name: "studentMajor", label: "Pääaine", labelType: "right labeled", required: true, placeholder: "(jos muu kuin TKTL)" },
                        ]
                    }
                ]
            },
            {
                header: "Opinnäytetyö",
                sectionLines: [
                    {
                        fields: [
                            { inputType: "textarea", rows: 2, name: "thesisTitle", label: "Opinnäytetyön otsikko (työnimi) tekokielellä", labelType: "fluid", required: true, placeholder: "Opinnäytetyön otsikko (työnimi) tekokielellä" },
                        ]
                    },
                    {
                        fields: [
                            { inputType: "input", name: "thesisStartDate", label: "Aloitusajankohta", labelType: "labeled", required: true, placeholder: "" },
                            { inputType: "input", name: "thesisCompletionEta", label: "Arvioitu valmistumisajankohta", labelType: "labeled", required: true, placeholder: "" },
                        ]
                    },
                    {
                        fields: [
                            { inputType: "textarea", rows: 2, name: "thesisPerformancePlace", label: "Suorituspaikka", labelType: "fluid labeled", required: true, placeholder: "(projekti, työnantaja, tms.) ja yhteystiedot" },
                        ]
                    },
                ]
            },
            {
                header: "Ohjausvastuut",
                sectionLines: [
                    {
                        fields: [
                            { inputType: "input", name: "thesisSupervisorMain", label: "Vastuuohjaaja", labelType: "labeled fluid", required: true, placeholder: "(nimi, oppiarvo ja/tai tehtävänimike, organisaatio, yhteystiedot)" },
                        ]
                    },
                    {
                        fields: [
                            { inputType: "input", name: "thesisSupervisorSecond", label: "2. ohjaaja", labelType: "labeled fluid", required: true, placeholder: "(nimi, oppiarvo ja/tai tehtävänimike, organisaatio, yhteystiedot)" },
                        ]
                    },
                    {
                        fields: [
                            { inputType: "input", name: "thesisSupervisorOther", label: "Muu ohjaaja", labelType: "labeled fluid", required: true, placeholder: "(nimi, oppiarvo ja/tai tehtävänimike, organisaatio, yhteystiedot)" },
                        ]
                    },
                ]
            },
            {
                header: "Työskentelyn tavoitteet ja ajankäyttö",
                sectionLines: [
                    {
                        fields: [
                            { inputType: "textarea", rows: 1, name: "thesisWorkStudentTime", label: "Opiskelijan arvioima opinnäytetyöhön käytettävä työaika", labelType: "fluid", required: true, placeholder: "(esim. tuntia / vko)" },
                        ]
                    },
                    {
                        fields: [
                            { inputType: "textarea", rows: 2, name: "thesisWorkSupervisorTime", label: "Ohjaajien ohjaukseen varaama aika (työn eri vaiheissa)", labelType: "fluid", required: true, placeholder: "" },
                        ]
                    },
                    {
                        fields: [
                            { inputType: "textarea", rows: 2, name: "thesisWorkIntermediateGoal", label: "Välitavoitteet (deadlinet työn eri vaiheille)", labelType: "fluid", required: true, placeholder: "" },
                        ]
                    },
                    {
                        fields: [
                            { inputType: "textarea", rows: 2, name: "thesisWorkMeetingAgreement", label: "Sopimus tapaamistiheydestä, yhteydenpitotavoista ja keskusteluun käytettävissä olevasta ajasta", labelType: "fluid", required: true, placeholder: "" },
                        ]
                    },
                    {
                        fields: [
                            { inputType: "textarea", rows: 2, name: "thesisWorkOther", label: "Muuta", labelType: "fluid", required: false, placeholder: "(esim. opiskelijan odotukset ohjaajalle / ohjaajan odotukset opiskelijalle" },
                        ]
                    },
                ]
            },
            {
                header: "Tavoitearvosana",
                sectionLines: [
                    {
                        fields: [
                            { inputType: "textarea", rows: 1, name: "studentGradeGoal", label: "Opiskelija on tutustunut laitoksen opinnäytetyön arviointimatriisiin ja määrittää tavoitearvosanakseen:", labelType: "right labeled", required: true, placeholder: "Etu- ja Sukunimi" },
                        ]
                    },
                ]
            }]
        }

        let sectionList = formFieldProperties.sections.map(
            (sectionData, sectionKey) => {
                return this.createFormSection(sectionData, "form" + sectionKey);
            });



        const lastAction = this.getLastAgreementAction();
        return (
            <div className={"ui form " + lastAction.formClass}>
                <form onSubmit={this.handlePost}>
                    {sectionList}
                    <br />
                    {this.getButton()}
                    <br />

                </form>
            </div>

        );
    }

    render() {
        return (
            <div className="App">

                <div className="ui inverted segment">
                    <h2>Thesis Agreement</h2>
                </div>
                <NavBar active="Agreement" />
                <div className="ui segment">
                    <h2>Gradusopimus tehdään gradunohjauksen alkaessa</h2>
                    <p>Sopimusta voidaan muuttaa osapuolten yhteisestä päätöksestä.</p>
                    <br />

                    {this.createForm()}
                    {this.getResponseMessage()}
                    <br />
                    
                </div>
            </div>

        );
    }

    getSuccessMessage() {
        return (
            <div className='ui success message'>
                <i className="close icon"></i>
                <div className="header">
                    Tiedot tallennettiin onnistuneesti
                  </div>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
    saveAgreement(data) {
        dispatch(saveAgreement(data));
    },
});

const mapStateToProps = (state) => {
    return { agreement: state.agreement };
}

export default connect(mapStateToProps, mapDispatchToProps)(Agreement);
