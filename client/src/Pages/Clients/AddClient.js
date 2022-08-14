import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BoxHeader from '../../components/BoxHeader'
import SelectBox from '../../components/SelectBox'
import Dialog from '../../components/Dialog'
import { getNormalDate, getInputDate } from '../../Helpers/DateHelpers'
import { changeHandler as oldChangeHandler } from '../../Helpers/ChangeHandler'

function AddClient(props) {

    const [state, setState] = useState({
        resetNewRow: {
            Name: "",
            Phone: "",
            Email: "",
            DOB: "",
            PAN: "",
            Address: "",
            City: "",
            State: "",
            PINCode: "",
            Occupation: "",
            Organization: "",
            Designation: "",
            Source: "Select",
            Type: "",
            Anniversary: ""
        },
        newTableRow: {
            Name: "",
            Phone: "",
            Email: "",
            DOB: "",
            PAN: "",
            Address: "",
            City: "",
            State: "",
            PINCode: "",
            Occupation: "",
            Organization: "",
            Designation: "",
            Source: "Select",
            Type: "",
            Anniversary: ""
        },
        tableBodyList: [

        ],
        dialogInfo: {
            isOpened: false,
            text: ""
        },
        editingActivated: false,
        editingID: "",
        sourceList: [],
        occupationList: ["Self Employed", "Full-time Job", "Part-time Job", "Business"]
    })

    useEffect(() => {
        if (props.state.currentPage !== "Clients > Add Client") {
            props.state.setCurrentPage("Clients > Add Client")
        }
        let sourceList = props.state.sourcesList
        if (typeof props.state.EditDetailsData.id !== 'undefined' && props.state.EditDetailsData.id !== null) {
            //Get Client with ID
            axios.get(`${props.state.ATLAS_URI}/getClientByID/${props.state.EditDetailsData.id}`, props.state.configToken)
                .then(response => {
                    const responseData = response.data;
                    if (typeof responseData !== 'undefined' && responseData !== null) {
                        if (typeof responseData.DOB !== 'undefined' && responseData.DOB !== '') { responseData.DOB = getInputDate(responseData.DOB); }
                        if (typeof responseData.Anniversary !== 'undefined' && responseData.Anniversary !== '') { responseData.Anniversary = getInputDate(responseData.Anniversary); }
                        setState({ ...state, newTableRow: responseData, editingActivated: true, sourceList: sourceList })

                    }

                }).catch(err => console.log(err))
        } else {
            setState({ ...state, newTableRow: state.resetNewRow, sourceList: sourceList })
        }
    }, []);



    const validateThenAddClient = (e) => {
        if (state.newTableRow.Source === "Select") {
            e.preventDefault();
            const newDialogInfo = { isOpened: true, text: "Source Empty", type: "Error" }
            setState({ ...state, dialogInfo: newDialogInfo })
            setTimeout(() => { setState({ ...state, dialogInfo: { isOpened: false, text: "", type: "" } }) }, 3000)
        } else {
            addNewClient(e);
        }
    }

    function addNewClient(e) {
        e.preventDefault();

        let newClientData = state.newTableRow;
        let AnniversaryDate = state.newTableRow.Anniversary
        let DateOB = state.newTableRow.DOB
        if (typeof DateOB !== 'undefined' && DateOB !== '') {
            newClientData.DOB = getNormalDate(DateOB);
        }
        if (typeof AnniversaryDate !== 'undefined' && AnniversaryDate !== '') {
            newClientData.Anniversary = getNormalDate(AnniversaryDate);
        }
        if (!state.editingActivated) {
            axios.post(`${props.state.ATLAS_URI}/addClient/`, newClientData, props.state.configToken)
                .then(response => {
                    if (response.status === 200) {
                        let list = [...props.state.clientsList]
                        let row = { ...state.newTableRow }
                        row.id = response.data.id
                        list.unshift(row)
                        setState({ ...state, dialogInfo: { isOpened: true, text: "Client Added Successfully", type: "Success" }, newTableRow: state.resetNewRow })
                        setTimeout(() => {
                            setState({ ...state, dialogInfo: { isOpened: false, text: "", type: "" } })
                            props.updateList('clientsList', list);
                        }, 3000)
                    }
                })
                .catch(err => alert(err))

        } else {
            axios.post(`${props.state.ATLAS_URI}/updateClient/` + props.state.EditDetailsData.id, newClientData, props.state.configToken)
                .then(() => {
                    let list = [...props.state.clientsList]
                    var foundIndex = list.findIndex(x => x.id.toString() == props.state.EditDetailsData.id);
                    list[foundIndex] = newClientData;

                    props.updateList('clientsList', list)
                    props.redirectFromEditDetails(props.state.EditDetailsData.redirectFrom)
                })
                .catch(err => alert(err))

        }

    }

    function changeHandler(e) {
        oldChangeHandler(e, state, setState);
    }

    return (
        <section className="content">
            <div className="row">
                {state.dialogInfo && <Dialog
                    onClose={(e) => setState(...state, { dialogInfo: { isOpened: false, text: "", type: "" } })}
                    dialogInfo={state.dialogInfo}
                />}
                <div className="col-md-12">
                    <div className="box box-primary">
                        <BoxHeader title={`${state.editingActivated ? "Edit" : "Add"} Client`} />
                        <form onSubmit={validateThenAddClient}>
                            <div className="box-body bozero mx5p">
                                <input type="hidden" name="ci_csrf_token" value="" />
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Client Name</label> <small className="req"> *</small>
                                            <input name="Name" type="text" className="form-control" required value={state.newTableRow.Name} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Client Phone</label> <small className="req"> *</small>
                                            <input name="Phone" type="text" className="form-control" required value={state.newTableRow.Phone} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Client Email</label> <small className="req"> *</small>
                                            <input name="Email" type="email" className="form-control" required value={state.newTableRow.Email} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label>Type</label> <small className="req"> *</small>
                                            <select required className="form-control" name="Type" value={state.newTableRow.Type} onChange={changeHandler} >
                                                <option value="">Select</option>
                                                <option value="Seller">Seller</option>
                                                <option value="Buyer">Buyer</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>PAN</label>
                                            <input name="PAN" type="text" className="form-control" value={state.newTableRow.PAN} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>DOB</label>
                                            <input name="DOB" type="date" className="form-control" value={state.newTableRow.DOB} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <textarea name="Address" type="text" className="form-control" value={state.newTableRow.Address} onChange={changeHandler} rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input name="City" type="text" className="form-control" value={state.newTableRow.City} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>State</label>
                                            <input name="State" type="text" className="form-control" value={state.newTableRow.State} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>PIN Code</label>
                                            <input name="PINCode" type="text" className="form-control" value={state.newTableRow.PINCode} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Occupation</label>
                                            <select className="form-control" name="Occupation" value={state.newTableRow.Occupation} onChange={changeHandler} >
                                                <option value="">Select</option>
                                                {typeof state.occupationList !== 'undefined' && state.occupationList.map(classData => <option key={classData} value={classData}>{classData}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Organization</label>
                                            <input name="Organization" type="text" className="form-control" value={state.newTableRow.Organization} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Designation</label>
                                            <input name="Designation" type="text" className="form-control" value={state.newTableRow.Designation} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Anniversary</label>
                                            <input name="Anniversary" type="date" className="form-control" value={state.newTableRow.Anniversary} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">

                                        <SelectBox
                                            label="Source"
                                            name="Source"
                                            options={props.state.sourcesList}
                                            attributeShown="Source"
                                            changeHandler={changeHandler}
                                            value={state.newTableRow.Source}
                                            resetValue={() => setState(({ ...state, newTableRow: { ...state.newTableRow, Source: "Select" } }))}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-info pull-right">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )



}

export default AddClient