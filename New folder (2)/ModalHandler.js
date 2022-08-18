import { getNormalDate } from './DateHelpers'
import * as $ from 'jquery'
import axios from 'axios'

export { openInputModal, openInputModalLeads, closeInputModal, openFollowUpModal, closeFollowUpModal, openEmailModal, closeEmailModal, updateFollowUp, updateFollowUpStatus, deleteFollowUp }

function openInputModal(setState) {
    setState(prevState => ({
        ...prevState,
        isModalOpen: true
    }))
}
function openInputModalLeads(setState, leads) {
    setState(prevState => ({
        ...prevState,
        SelectedLeads: leads,
        isModalOpen: true
    }))
}

function closeInputModal(setState) {
    setState(prevState => ({
        ...prevState,
        isModalOpen: false
    }))
}

function openFollowUpModal(e, state, setState) {
    e.preventDefault()
    const editRowID = $(e.target).parents(".dtFieldRows").attr("id");
    const editData = state.tableBodyList.filter(data => data.id.toString() === editRowID)[0];
    setState(prevState => ({
        ...prevState,
        editingActivated: true,
        editingID: editRowID,
        newTableRow: editData,
        isFollowUpModalOpen: true
    }))
}

function closeFollowUpModal(setState) {
    setState(prevState => ({
        ...prevState,
        isFollowUpModalOpen: false,
    }))
}

function openEmailModal(e, state, setState) {

    const editRowID = $(e.target).parents(".dtFieldRows").attr("id");
    const editData = state.tableBodyList.filter(data => data.id.toString() === editRowID)[0];
    setState(prevState => ({
        ...prevState,
        Email: editData,
        isEmailModalOpen: true
    }))
}

function closeEmailModal(e, setState) {
    // e.preventDefault()
    setState(prevState => ({
        ...prevState,
        Email: "",
        isEmailModalOpen: false,
    }))
}

function updateFollowUp(e, props, state, setState) {
    e.preventDefault()
    console.log(state)
    const newFollowUpData = {
        FollowUpTakenBy: props.state.operator.Name,
        FollowUpDate: getNormalDate($("#followUpDate").val()),
        NextFollowUpDate: getNormalDate($("#nextFollowUpDate").val()),
        Response: $("#followUpResponse").val(),
        Note: $("#followUpNote").val(),
        LeadId: state.editingID
    }

    let tempList = [...state.newTableRow.FollowUpList];
    tempList.unshift(newFollowUpData)
    let newLeadData = state.newTableRow;
    newLeadData.FollowUpList = tempList;

    newLeadData.LastFollowUpDate = getNormalDate($("#followUpDate").val());
    newLeadData.NextFollowUpDate = getNormalDate($("#nextFollowUpDate").val());

    axios.post(`${props.state.ATLAS_URI}/addFollowUp`, newFollowUpData, props.state.configToken)
        .then(() => {
            const newTableBodyList = state.tableBodyList.map(data =>
                data.id === state.editingID ? newLeadData : data
            )

            const newTableBodyDisplayList = typeof state.tableBodyDisplayList !== 'undefined' ?
                state.tableBodyDisplayList.map(data =>
                    data.id === state.editingID ? newLeadData : data
                ) : []

            setState(prevState => ({
                ...prevState,
                tableBodyList: newTableBodyList,
                tableBodyDisplayList: newTableBodyDisplayList
            }))
            resetFollowUp()

        }).catch(err => alert(err))
}

function updateFollowUpStatus(e, props, state, setState) {

    let newLeadData = state.newTableRow;
    newLeadData.LeadStatus = e.target.value;

    axios.post(`${props.state.ATLAS_URI}/updateLead/` + state.editingID, newLeadData, props.state.configToken)
        .then(() => {

            newLeadData.LeadStatus = props.state.statusList.filter(status => status.id.toString() === newLeadData.LeadStatus)[0].Status
            newLeadData.LeadStatusID = props.state.statusList.filter(status => status.id.toString() === newLeadData.LeadStatus)[0]

            const newTableBodyList = state.tableBodyList.map(data =>
                data.ID === state.editingID ? newLeadData : data
            )

            const newTableBodyDisplayList = typeof state.tableBodyDisplayList !== 'undefined' ?
                state.tableBodyDisplayList.map(data =>
                    data.id === state.editingID ? newLeadData : data
                ) : []

            setState(prevState => ({
                ...prevState,
                tableBodyList: newTableBodyList,
                tableBodyDisplayList: newTableBodyDisplayList
            }))

        }).catch(err => alert(err))
}

function deleteFollowUp(e, props, state, setState) {

    const confirmed = window.confirm("Are you sure you want to delete this Follow Up?");

    if (confirmed) {
        const deleteIndex = $(e.target).attr("index");
        let tempList = [...state.newTableRow.FollowUpList]
        const x = tempList.splice(deleteIndex, 1)[0].id;

        let tempLead = state.newTableRow;
        tempLead.FollowUpList = tempList;

        axios.delete(`${props.state.ATLAS_URI}/deleteFollowUp/` + x, props.state.configToken)
            .then(() => {

                setState(prevState => ({
                    ...prevState,
                    newTableRow: tempLead
                }))

            }).catch(err => alert(err))
    }

}

function resetFollowUp() {
    const today = new Date();
    $("#followUpDate").val(today.getFullYear() + "-" + String(parseInt(today.getMonth()) + 1) + "-" + today.getDate());
    $("#nextFollowUpDate").val("");
    $("#followUpResponse").val("");
    $("#followUpNote").val("");

}