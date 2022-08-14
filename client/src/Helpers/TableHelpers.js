import axios from 'axios'
export { deleteFromTable, insertIntoTable, editTableRow, openDialog }

function openDialog(e, state, setState) {
    const newDialogInfo = {
        isOpened: true,
        delID: e.target.parentElement.parentElement.id,
        text: "Are you sure you want to delete this Record?",
        type: "Confirm"
    }
    setState({ ...state, dialogInfo: newDialogInfo })
}

function editTableRow(e, state, setState) {
    const editRowID = Number(e.target.parentElement.parentElement.id);
    const editData = state.tableBodyList.filter(data => data.id === editRowID)[0];
    const row = { ...state.newTableRow }
    Object.assign(row, editData);
    console.log(row)
    setState({
        ...state,
        editingActivated: true,
        editingID: editRowID,
        newTableRow: row
    })

}

function insertIntoTable(e, props, state, setState) {
    e.preventDefault();

    console.log(state.newTableRow)
    if (!state.editingActivated) {
        //When Adding new Data
        axios.post(`${props.state.ATLAS_URI}/${state.APIs.AddData}/`, state.newTableRow, props.state.configToken)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    let newTableBodyList = [...state.tableBodyList];
                    newTableBodyList.push(response.data);
                    state.APIs.updateList && props.updateList(state.APIs.updateList, newTableBodyList)
                    setState(prevState => ({
                        ...prevState,
                        tableBodyList: newTableBodyList,
                        newTableRow: state.resetNewRow
                    }))

                }
            })
            .catch(err => alert(err))

    } else {
        //When Edit is Activated
        axios.post(`${props.state.ATLAS_URI}/${state.APIs.UpdateData}/` + state.editingID, state.newTableRow, props.state.configToken)
            .then((x) => {
                const newTableBodyList = state.tableBodyList.map(data =>
                    data.id === state.editingID ? state.newTableRow : data
                )
                state.APIs.updateList && props.updateList(state.APIs.updateList, newTableBodyList)
                setState({
                    ...state,
                    editingActivated: false,
                    tableBodyList: newTableBodyList,
                    newTableRow: state.resetNewRow
                })
            })
            .catch(err => alert(err))
    }
}

function deleteFromTable(props, state, setState) {

    const delID = state.dialogInfo.delID;
    axios.delete(`${props.state.ATLAS_URI}/${state.APIs.DeleteData}/` + delID, props.state.configToken)
        .then(() => {
            const newTableBodyList = state.tableBodyList.filter(data => (data.id).toString() !== (delID).toString());
            state.APIs.updateList && props.updateList(state.APIs.updateList, newTableBodyList)
            setState({
                ...state,
                tableBodyList: newTableBodyList,
                tableBodyDisplayList: newTableBodyList,
                newTableRow: state.resetNewRow,
                dialogInfo: { isOpened: false, text: "", delID: "" }
            })
        })
        .catch(err => {
            setState({
                ...state,
                dialogInfo: { isOpened: false, text: "", delID: "" }
            })

        })

}