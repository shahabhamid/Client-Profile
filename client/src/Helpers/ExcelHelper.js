import * as $ from 'jquery'
import axios from 'axios'
import { getFormattedDate } from './DateHelpers'

export { importData }

function importData(e, props, state, setState) {
    e.preventDefault();

    let newTableBodyList = [...state.tableBodyList];
    let wrongData = []
    let newClientList = []
    let newLeadsList = []
    let localClientList = [...state.clientsList]
    const importedFile = $("#importFile")[0].files[0]

    axios.get(`${props.state.ATLAS_URI}/getConfigurationById/1`, props.state.configToken)
        .then(res => {
            const configData = res.data;
            if (typeof configData !== 'undefined') {
                let automaticAssignment = configData.AutoLeadsAssignment
                if (importedFile) {
                    const formData = new FormData();
                    formData.append('ImportedFile', importedFile);

                    axios.post(`${props.state.ATLAS_URI}/importData`, formData)
                        .then(response => {

                            const fileData = response.data.FileData
                            console.log(fileData, "FileData")
                            if (fileData !== null) {
                                const totalStaff = state.userList.filter(x => x.Role === 2).length
                                let leadNo = -1;
                                fileData.forEach(element => {
                                    try {
                                        leadNo++;
                                        let clientName = "";
                                        let clientPhone = "";
                                        let clientEmail = ""
                                        let _Sources = ""
                                        let _PropertyTypes = ""
                                        let __AssignedTo = ""


                                        if (typeof element[0] !== 'undefined' || element[0] !== null) {
                                            clientName = element[0]
                                        }
                                        if (typeof element[1] !== 'undefined' || element[1] !== null) {
                                            clientPhone = String(element[1])
                                        }
                                        if (typeof element[2] !== 'undefined' || element[2] !== null) {
                                            clientEmail = element[2]
                                        }
                                        if (typeof element[3] !== 'undefined' || element[3] !== null) {
                                            _Sources = element[3]
                                        }
                                        if (typeof element[4] !== 'undefined' || element[4] !== null) {
                                            _PropertyTypes = element[4]
                                        }
                                        if ((typeof element[5] !== 'undefined' || element[5] !== null)) {
                                            __AssignedTo = element[5]
                                        }


                                        let source = state.sourceList.filter(item =>
                                            item.Source.toLowerCase() === _Sources.toLowerCase())[0]

                                        let propertyType = state.propertyTypeList.filter(item =>
                                            item.PropertyType.toLowerCase() === _PropertyTypes.toLowerCase())[0]

                                        let assigned;
                                        //    if (automaticAssignment) {
                                        //  assigned = state.userList.filter(x => x.Role === 2)[leadNo % totalStaff]
                                        //   console.log(assigned,"Assigned")
                                        //   __AssignedTo = assigned.Username
                                        //  } else {
                                        assigned = state.userList.filter(item =>
                                            item.Username.toLowerCase() === __AssignedTo.toLowerCase())[0]
                                        //   }

                                        if (typeof source === 'undefined' || typeof propertyType === 'undefined' || typeof assigned === 'undefined') {
                                            wrongData.push({
                                                clientName: clientName,
                                                clientPhone: clientPhone,
                                                clientEmail: clientEmail,
                                                Sources: _Sources,
                                                PropertyTypes: _PropertyTypes,
                                                AssignedTo: __AssignedTo,
                                            })

                                        } else {
                                            let date = getFormattedDate()
                                            let lead = newTableBodyList.filter(item =>
                                                item.ClientName === clientName &&
                                                item.ClientPhone === clientPhone &&
                                                item.ClientEmail === clientEmail &&
                                                item.Source === source.id &&
                                                item.PropertyType === propertyType.id &&
                                                item.AssignedTo === assigned.id &&
                                                item.LeadDate === date)

                                            if (typeof lead[0] === 'undefined') {

                                                let newLead = {
                                                    id: "",
                                                    Client: "",
                                                    ClientName: clientName,
                                                    ClientPhone: clientPhone,
                                                    ClientEmail: clientEmail,
                                                    //   LeadStatus: "Un-Attempted",
                                                    LeadDate: date,
                                                    InterestedIn: "",
                                                    NextFollowUpDate: "",
                                                    CreatedBy: props.state.operator.Name,
                                                    Remarks: [],
                                                    PropertyType: propertyType.id,
                                                    Source: source.id,
                                                    Sources: _Sources,
                                                    PropertyTypes: _PropertyTypes,
                                                    AssignedTo: assigned.id,
                                                    _AssignedTo: __AssignedTo
                                                }

                                                newLead.Client = null
                                                newLeadsList.push(newLead)
                                                newTableBodyList.unshift(newLead);
                                            }
                                        }
                                    } catch (e) { console.log(e) }
                                });
                                console.log(newLeadsList, "New Leads List")

                                axios.post(`${props.state.ATLAS_URI}/addLeads/`, newLeadsList, props.state.configToken)
                                    .then(res2 => {
                                        console.log(res2)
                                        if (res2.status === 200) {

                                            setState(prevState => ({
                                                ...prevState,
                                                tableBodyList: newTableBodyList,
                                                newTableRow: state.resetNewRow
                                            }))

                                            axios.delete(`${props.state.ATLAS_URI}/file/${response.data.FileName}`);
                                            if (wrongData.length > 1) {

                                                const newDialogInfo = {
                                                    isOpened: true,
                                                    delID: e.target.parentElement.parentElement.id,
                                                    text: "While Importing Data there was some Wrong Data. Do you want to Download it?",
                                                    type: "Confirm",
                                                    onTrueFn: downloadWrongData,
                                                    wrongData: wrongData
                                                }
                                                setState(prevState => ({ ...prevState, dialogInfo: newDialogInfo }))

                                            } else {
                                                //    window.location.reload();
                                            }

                                        }
                                    })
                                    .catch(err => alert(err))

                            }

                        }).catch(err => alert(err))
                }
            }
        }).catch(err => console.log(err))
}

function downloadWrongData(e, props, state, setState) {
    axios.post(`${props.state.ATLAS_URI}/downloadExcel/`, state.dialogInfo.wrongData)
        .then(res3 => {
            if (res3.status === 200) {

                if (res3.data !== null) {
                    const downloadWin = window.open(`${props.state.ATLAS_URI}/excel/${res3.data}`);
                    if (downloadWin) downloadWin.opener = null;
                    window.location.reload();

                }
            }
            setState({
                dialogInfo: { isOpened: false, text: "", wrongData: [] }
            })
        })
        .catch(err => alert(err))
}