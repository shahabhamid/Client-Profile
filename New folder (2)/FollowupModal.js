import React from 'react'
import { Modal } from 'react-bootstrap'

function FollowupModal(props) {

    const data = props.state.newTableRow

    return (

        <Modal show={props.state.isFollowUpModalOpen} onHide={props.closeFollowUpModal}>
            <Modal.Header >
                <Modal.Title>Follow Up Leads</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <div className="taskFieldArea">
                            <form onSubmit={props.updateFollowUp}>
                                <div className="row">

                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Follow Up Date</label><small className="req"> *</small>
                                            <input type="datetime-local" id="followUpDate" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Next Follow Up Date</label><small className="req"> *</small>
                                            <input type="datetime-local" id="nextFollowUpDate" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Response</label><small className="req"> *</small>
                                            <textarea id="followUpResponse" className="form-control"></textarea>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label>Note</label>
                                            <textarea id="followUpNote" className="form-control"></textarea>
                                        </div>
                                    </div>

                                </div>

                                <div className="box-footer pr0">
                                    <button className="btn btn-info pull-right">Save</button>
                                </div>

                            </form>
                            <div className="ptbnull">
                                <h4 className="box-title titlefix pb5">Follow Up ({data.ClientName})</h4>
                                <div className="box-tools pull-right">
                                </div>
                            </div>

                            <div className="pt20">

                                <div className="tab-pane active" id="timeline">
                                    <ul className="timeline timeline-inverse">

                                        {typeof data.FollowUpList !== 'undefined' &&
                                            data.FollowUpList.map((data, index) =>
                                                <React.Fragment key={index}>
                                                    <li className="time-label">
                                                        <span className="bg-blue">{data.FollowUpDate}</span>
                                                    </li>

                                                    <li>
                                                        <i className="fas fa-phone bg-blue"></i>
                                                        <div className="timeline-item">
                                                            <span className="time">
                                                                <button className="transparentBtn text-right" title="Delete" index={index} onClick={props.deleteFollowUp}><i className="fa fa-trash"></i></button>
                                                            </span>
                                                            <h3 className="timeline-header">{data.FollowUpTakenBy}</h3>
                                                            <div className="timeline-body">
                                                                {data.Response}
                                                                <hr />
                                                                {data.Note}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </React.Fragment>
                                            )}

                                        <li></li>
                                        <li><i className="far fa-clock bg-gray"></i></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-4 col-eq">
                        <div className="taskside">

                            <div className='taskHeading'>
                                <span className='fs20'>Summary</span>

                                <div className="box-tools pull-right">
                                    <div className="form-group">
                                        <label>Lead Status</label>

                                        <select className="form-control" value={data.LeadStatusID && data.LeadStatusID.id} onChange={props.updateFollowUpStatus}>
                                            <option value={null}>{"Select"}</option>
                                            {
                                                props.state.statusList.map((status) =>
                                                    <option value={status.id}>{status.Status}</option>
                                                )
                                            }

                                        </select>
                                    </div>
                                </div>

                                <h5 className="py10 fs14">Created By: <span>{data.CreatedBy}</span></h5>

                            </div>


                            <hr className="taskseparator" />

                            <div className="taskInfo">
                                <div><i className="far fa-calendar-plus"></i> Lead Date: {data.LeadDate}</div>
                                <div><i className="far fa-calendar-plus"></i> Last Follow Up Date: {data.LastFollowUpDate}</div>
                                <div><i className="far fa-calendar-plus"></i> Next Follow Up Date: {data.NextFollowUpDate}</div>
                            </div>

                            <div className="taskInfo">
                                <div><span>Client Name: </span>{data.ClientName}</div>
                                <div><span>Client Contact: </span>{data.ClientPhone}</div>
                                <div><span>Client Email: </span>{data.ClientEmail}</div>
                                <div><span>Required Location: </span>{data.RequiredLocation}</div>
                                <div><span>Interested In: </span>{data.InterestedIn}</div>
                                <div><span>Last Remark: </span>{data.LastRemarks}</div>
                                <div><span>Source: </span>{data.Sources}</div>
                                <div><span>Property Type: </span>{data.PropertyTypes}</div>
                                <div><span>Property Min Area: </span>{data.MinArea}</div>
                                <div><span>Property Max Area: </span>{data.MaxArea}</div>
                                <div><span>Client Min Budget: </span>{data.MinBudget}</div>
                                <div><span>Client Max Budget: </span>{data.MaxBudget}</div>
                                <div><span>Required Loan: </span>{data.RequiredLoan}</div>
                            </div>

                        </div>
                    </div>

                </div>

            </Modal.Body>

        </Modal>

    )



}

export default FollowupModal