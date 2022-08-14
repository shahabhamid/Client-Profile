import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BoxHeader from '../../components/BoxHeader'
import DataTable from '../../components/DataTable'
import Dialog from '../../components/Dialog'

function ListClients(props) {


    const [state, setState] = useState({
        tableBodyList: [],
        dialogInfo: {
            isOpened: false,
            text: "",
            type: ""
        },
    })

    useEffect(() => {
        if (props.state.currentPage !== "Clients > List Clients") {
            props.state.setCurrentPage("Clients > List Clients")
        }
        //Get All Clients
        let clientsData = props.state.clientsList;
        if (clientsData.length !== 0) {
            setTimeout(() => {
                setState({
                    ...state,
                    tableBodyList: clientsData
                })
            }, 100)
        }
    }, [])


    function editRecord(e) {
        const temp = e.target.parentElement.parentElement.id;
        props.updateEditDetails({ id: temp, editingActivated: true, redirectFrom: "/Clients/listClients", pageFlag: "Clients > Add Client" });
    }

    function openDialog(e) {
        const newDialogInfo = {
            isOpened: true,
            delID: e.target.parentElement.parentElement.id,
            text: "Are you sure you want to delete this Client?",
            type: "Confirm"
        }
        setState({ ...state, dialogInfo: newDialogInfo })
    }

    function deleteFromTable(e) {

        const delID = state.dialogInfo.delID;
        axios.delete(`${props.state.ATLAS_URI}/deleteClient/` + delID, props.state.configToken)
            .then(() => {
                const newTableBodyList = state.tableBodyList.filter(data => data.id.toString() !== delID);
                props.updateList('clientsList', newTableBodyList)
                setState({
                    ...state,
                    tableBodyList: newTableBodyList,
                    dialogInfo: { isOpened: false, text: "", delID: "" }
                })
            })
            .catch(err => alert(err))

    }


    return (
        <div className="content">
            <div className="row">

                {state.dialogInfo.isOpened && <Dialog
                    onFalse={(e) => setState({ ...state, dialogInfo: { isOpened: false, text: "" } })}
                    onTrue={(e) => deleteFromTable(e)}
                    dialogInfo={state.dialogInfo}
                />}

                <div className="col-md-12">

                    <div className="box box-primary">

                        <BoxHeader title="Clients List" />

                        <div className="box-body">

                            <DataTable
                                tableHeader={["id", "Name", "Phone", "Email", "Occupation", "Type"]}
                                tableBody={state.tableBodyList}
                                searchField="Name"
                                customAction={[
                                    { title: "Update", icon: "edit", redirectTo: "/Clients/addClient", onClickEvent: editRecord },
                                    { title: "Delete", icon: "times text-red", onClickEvent: openDialog }
                                ]}
                                isEditable={true}
                                DeleteAPI={`${props.state.ATLAS_URI}/deleteManyClients/`}
                            />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )


}

export default ListClients