import React, { useState, useEffect } from 'react'
import { deleteFromTable, insertIntoTable, editTableRow, openDialog } from '../../Helpers/TableHelpers'
import { changeHandler } from '../../Helpers/ChangeHandler'
import axios from 'axios'
import BoxHeader from '../../components/BoxHeader'
import DataTable from '../../components/DataTable'
import Dialog from '../../components/Dialog'

function AddSource(props) {

    const [state, setState] = useState({
        resetNewRow: {
            CreatedBy: props.state.operator.Username,
            Source: "",
        },
        newTableRow: {
            CreatedBy: props.state.operator.Username,
            Source: "",
        },
        tableBodyList: [],
        editingActivated: false,
        editingID: "",
        APIs: {
            AddData: "addSource",
            UpdateData: "updateSource",
            DeleteData: "deleteSource",
            updateList: 'sourcesList'
        },
        dialogInfo: {
            isOpened: false,
            text: "",
            type: ""
        },
    })

    useEffect(() => {
        if (props.state.currentPage !== "Masters > Add Sources") {
            props.state.setCurrentPage("Masters > Add Sources")
        }

        //Get All Sources
        axios.get(`${props.state.ATLAS_URI}/getSources/`, props.state.configToken)
            .then(response => {
                const responseData = response.data;
                if (typeof responseData !== 'undefined') {
                    setState({
                        ...state,
                        newTableRow: state.resetNewRow,
                        tableBodyList: responseData,
                    })
                }
            }).catch(err => console.log(err))
    }, []);

    return (
        <section className="content">
            <div className="row">

                {typeof state.dialogInfo !== 'undefined' &&
                    <Dialog
                        onFalse={(e) => setState(...state, { dialogInfo: { isOpened: false, text: "" } })}
                        onTrue={(e) => deleteFromTable(props, state, setState)}
                        dialogInfo={state.dialogInfo}
                    />}
                <div className="col-md-5">
                    <div className="box box-primary">

                        <BoxHeader title={`${state.editingActivated ? "Edit" : "Add"} Source`} />

                        <form onSubmit={(e) => insertIntoTable(e, props, state, setState)}>
                            <div className="box-body bozero">
                                <input type="hidden" name="ci_csrf_token" value="" />
                                <div className="form-group">
                                    <label >Name </label><small className="req"> *</small>
                                    <input type="text" className="form-control" name="Source" required value={state.newTableRow.Source} onChange={(e) => changeHandler(e, state, setState)} />
                                </div>
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-info pull-right ">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="box box-primary">
                        <BoxHeader title="List of Added Source" />
                        <div className="box-body">
                            <DataTable
                                tableHeader={["id", "Source", "Created By"]}
                                searchField="Source"
                                tableBody={state.tableBodyList}
                                deleteFromTable={(e) => openDialog(e, state, setState)}
                                editTableRow={(e) => editTableRow(e, state, setState)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )



}

export default AddSource