import React, { Component } from 'react'
import * as $ from 'jquery'
import emptyTableImg from '../img/addnewitem.svg'
import { Link } from 'react-router-dom';
import axios from 'axios'

class DataTable extends Component {

    state = {
        currentPage: 1,
        maxPages: 1,
        maxRecordsPerPage: 10,
        tableBody: [],
        tableBodyActive: [],
        AllBoxes: [],
        editMode: false,

    }

    constructor() {
        super();
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleMaxRecordChange = this.handleMaxRecordChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.selectAllBoxes = this.selectAllBoxes.bind(this);

        this.setEditable = this.setEditable.bind(this)
        this.deleteAll = this.deleteAll.bind(this)
        this.sortID = this.sortID.bind(this)
    }


    changeHandler(e) {
        let newValue;

        if (e.target.type === "checkbox") {
            newValue = [...this.state.AllBoxes]
            if (e.target.checked) {
                newValue.push(e.target.value)
            } else {
                newValue = newValue.filter(data => data !== e.target.value)
            }
        }
        this.setState({
            AllBoxes: newValue
        })
    }
    selectAllBoxes(e) {
        const mainBox = $("#MainBox").is(':checked')
        let boxValue = []
        if (mainBox) {
            this.state.tableBodyActive.slice(this.getBodyStartIndex(), this.getBodyEndIndex()).map(x => { boxValue.push(x.id.toString()) })
            this.setState({
                AllBoxes: boxValue
            })
        } else {
            this.setState({
                AllBoxes: []
            })
        }
    }

    componentDidMount() {
        this.setState({
            maxPages: parseInt(this.props.tableBody.length / this.state.maxRecordsPerPage) + 1,
            tableBody: this.props.tableBody,
            tableBodyActive: this.props.tableBody
        });

        this.state.maxPages > this.state.currentPage ? $("#dtNextBtn").removeClass("disabled") : $("#dtNextBtn").addClass("disabled")

    }

    shouldComponentUpdate(prevProps, prevState) {
        return (prevProps.tableBody !== this.state.tableBody ||
            prevState.tableBodyActive !== this.state.tableBodyActive) ||
            prevState.currentPage !== this.state.currentPage ||
            prevState.maxRecordsPerPage !== this.state.maxRecordsPerPage ||
            prevState.AllBoxes !== this.state.AllBoxes ||
            prevState.editMode !== this.state.editMode
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tableBody !== this.props.tableBody) {
            this.setState({
                maxPages: parseInt(this.props.tableBody.length / (this.state.maxRecordsPerPage + 1)) + 1,
                tableBody: this.props.tableBody,
                tableBodyActive: this.props.tableBody
            });

            setTimeout(() => {
                $("#dtSearch").val("");
                this.state.maxPages > this.state.currentPage ? $("#dtNextBtn").removeClass("disabled") : $("#dtNextBtn").addClass("disabled")
            }, 50)
        }

        if (prevState.tableBodyActive !== this.state.tableBodyActive || prevState.maxRecordsPerPage !== this.state.maxRecordsPerPage) {
            const temp = parseInt(this.state.tableBodyActive.length / this.state.maxRecordsPerPage);
            this.setState({
                maxPages: this.state.tableBodyActive.length % this.state.maxRecordsPerPage === 0 ? temp : temp + 1,
                tableBodyActive: this.state.tableBodyActive,
                currentPage: 1
            });
            $("#dtPrevBtn").addClass("disabled")

            setTimeout(() => {
                this.state.maxPages > this.state.currentPage ? $("#dtNextBtn").removeClass("disabled") : $("#dtNextBtn").addClass("disabled")
            }, 50)
        }

    }

    getPageRecord() {
        if (typeof this.props.tableBody === 'undefined' || this.state.tableBodyActive.length === 0) {
            return "0 to 0 of 0";

        } else {
            const startPage = (this.state.currentPage - 1) * this.state.maxRecordsPerPage + 1;
            const totalRecords = this.state.tableBodyActive.length;
            const endPage = this.state.tableBodyActive.length < this.state.currentPage * this.state.maxRecordsPerPage ? this.state.tableBodyActive.length : this.state.currentPage * this.state.maxRecordsPerPage

            return startPage + " to " + endPage + " of " + totalRecords;

        }

    }

    getBodyStartIndex() {
        return (this.state.currentPage - 1) * this.state.maxRecordsPerPage;
    }

    getBodyEndIndex() {
        return this.state.tableBodyActive.length < this.state.currentPage * this.state.maxRecordsPerPage ? this.state.tableBodyActive.length : this.state.currentPage * this.state.maxRecordsPerPage
    }

    handleChangePage(e) {

        let currPage = e.target.name === "next" ? this.state.currentPage + 1 : this.state.currentPage - 1;
        currPage < this.state.maxPages ? $("#dtNextBtn").removeClass("disabled") : $("#dtNextBtn").addClass("disabled")
        currPage > 1 ? $("#dtPrevBtn").removeClass("disabled") : $("#dtPrevBtn").addClass("disabled")

        this.setState({ currentPage: currPage })
    }

    onSearchChange(e) {
        this.setState({
            tableBodyActive: this.state.tableBody.filter(data => e.target.value.toLowerCase() === data[this.props.searchField].substr(0, e.target.value.length).toLowerCase())

        })
    }

    handleMaxRecordChange(e) {
        this.setState({ maxRecordsPerPage: parseInt(e.target.value) })
    }

    setEditable(e) {
        let edit = this.state.editMode

        if (edit) {
            $('#editBtn').text("Edit")
            this.props.onEdit && this.props.onEdit(this.state.AllBoxes)
            this.setState({ editMode: !edit })
        } else {
            $('#editBtn').text("Update")
            this.setState({ editMode: !edit, AllBoxes: [] })

        }
    }
    deleteAll(e) {
        const allLeads = { leads: this.state.AllBoxes }
        const configToken = {
            headers: {
                Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('operator')).token}`,
            },
        }
        axios.delete(this.props.DeleteAPI + this.state.AllBoxes, configToken)
            .then(() => {
                window.location.reload();
            })
            .catch(err => alert(err))
    }
    sortID(e) {
        e.preventDefault()
        let x = [...this.state.tableBody].reverse()
        $("#sort").toggleClass("fa-angle-down fa-angle-up");
        this.setState({
            tableBody: x,
            tableBodyActive: x
        })
    }
    render() {
        return (

            <div className="table-responsive mailbox-messages">
                <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer">

                    <div className="dataTables_maxRecords form-group">
                        <label>
                            <select className="form-control" value={String(this.state.maxRecordsPerPage)} onChange={this.handleMaxRecordChange} >
                                <option value="5">5</option>
                                <option value="10" defaultValue={"10"}>10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select> Records per page
                        </label>

                    </div>

                    <div className="dataTables_filter">
                        <input type="search" placeholder={`Search by ${this.props.searchField}`} id='dtSearch' name="searchValue" onChange={this.onSearchChange} />
                        {this.props.isEditable && <button onClick={this.setEditable} id="editBtn" className='btn btn-primary ml-5'>Edit</button>}
                        {this.props.isEditable && this.state.editMode && <button onClick={this.deleteAll} className='btn btn-primary ml-5'>Delete All</button>}
                    </div>

                    <table className="table table-bordered table-hover dataTable no-footer" cellSpacing="0" width="100%" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" style={{ "width": "100%" }}>
                        <thead>
                            <tr>
                                {this.props.isEditable && this.state.editMode &&
                                    <th key={"EditableBox"} tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1">
                                        <input type='checkbox' id='MainBox' name='MainBox' value={"MainBox"} onChange={this.selectAllBoxes} />
                                    </th>
                                }

                                {this.props.tableHeader.map(tableHeader =>
                                    <th key={tableHeader} tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1">
                                        {tableHeader === "id" || tableHeader === "_id" ? <a onClick={this.sortID}>ID <i className="fas fa-angle-down" id='sort'></i></a> : tableHeader}
                                    </th>
                                )}

                                {typeof this.props.noActions === 'undefined' &&
                                    <th className="text-right" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" aria-label="Action: activate to sort column ascending">
                                        Action
                                    </th>
                                }

                            </tr>
                        </thead>

                        <tbody>
                            {typeof this.props.tableBody === 'undefined' || this.props.tableBody.length === 0 ?
                                <tr className='odd'>
                                    <td valign="top" colSpan="12" className="dataTables_empty">
                                        <div align="center">
                                            No data available in table
                                            <br /><br />
                                            <img alt='Empty Table' src={emptyTableImg} width="150" />
                                            <br /><br />
                                            <span className="text-success bolds">
                                                <i className="fa fa-arrow-left"></i>
                                                &nbsp;Add new record or search with different criteria.
                                            </span>
                                            <div></div>
                                        </div>
                                    </td>
                                </tr>
                                :
                                this.state.tableBodyActive
                                    .slice(this.getBodyStartIndex(), this.getBodyEndIndex()).map(bodyData =>
                                        <tr className='dtFieldRows' id={bodyData.id} key={bodyData.id}>

                                            {this.props.isEditable && this.state.editMode &&
                                                <td className="bodyDataFields" >
                                                    <input
                                                        type='checkbox'
                                                        name='AllBoxes'
                                                        onChange={this.changeHandler}
                                                        value={bodyData.id.toString()}
                                                        checked={this.state.AllBoxes.includes(bodyData.id.toString())}
                                                    />
                                                </td>
                                            }

                                            {this.props.tableHeader.map(bodyField =>
                                                <td className="bodyDataFields" key={bodyField}>
                                                    {typeof bodyData[bodyField.replace(/\s/g, '')] !== 'undefined' &&
                                                        (typeof bodyData[bodyField.replace(/\s/g, '')] !== 'object' ?
                                                            bodyData[bodyField.replace(/\s/g, '')]
                                                            :
                                                            Array.isArray(bodyData[bodyField.replace(/\s/g, '')]) &&
                                                            bodyData[bodyField.replace(/\s/g, '')].map(data => <div key={data} className="dtMultiData">{data}</div>)
                                                        )
                                                    }
                                                </td>
                                            )}

                                            {typeof this.props.noActions === 'undefined' &&
                                                <td className="bodyDataActions">

                                                    {(typeof this.props.customAction === 'undefined') ?
                                                        <React.Fragment>
                                                            <button className="btn btn-default btn-xs no-focus" title="Edit" onClick={this.props.editTableRow}>
                                                                <i className="fas fa-pencil"></i>
                                                            </button>
                                                            <button className="btn btn-default btn-xs no-focus" title="Delete" onClick={this.props.deleteFromTable}>
                                                                <i className="fas fa-times text-red"></i>
                                                            </button>
                                                        </React.Fragment>
                                                        :

                                                        <React.Fragment>
                                                            {this.props.customAction.map(action =>

                                                                (action.title === "Attempt" || action.title === "Update") ?
                                                                    <Link key={action.title} className="btn btn-default btn-xs no-focus" onClick={action.onClickEvent} to={action.redirectTo}><i className={`fas fa-${action.icon}`}></i></Link>
                                                                    :
                                                                    ((!action.fieldCondition || bodyData[Object.keys(action.fieldCondition)[0]] === Object.values(action.fieldCondition)[0]) &&
                                                                        <button key={action.title} className="btn btn-default btn-xs no-focus" title={action.title} onClick={action.onClickEvent}><i className={`fas fa-${action.icon}`}></i></button>
                                                                    )
                                                            )}
                                                        </React.Fragment>

                                                    }

                                                </td>
                                            }

                                        </tr>
                                    )

                            }

                        </tbody>

                    </table>

                    <section className="dtBottomSection row">

                        <div className="dtPageDetails col-md-6">{`Record: ${this.getPageRecord()}`}</div>

                        <div className="dtPaginationArea col-md-6">

                            <button className="dtPageBtn disabled" id='dtPrevBtn' name="previous" onClick={this.handleChangePage}>
                                <i className="fa fa-angle-left"></i>
                            </button>

                            <div id="dtCurrentPage">{this.state.currentPage}</div>

                            <button className="dtPageBtn disabled" id='dtNextBtn' name="next" onClick={this.handleChangePage}>
                                <i className="fa fa-angle-right"></i>
                            </button>

                        </div>
                    </section>

                </div>

            </div>

        )
    }


}

export default DataTable