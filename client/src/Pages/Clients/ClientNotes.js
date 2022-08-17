import React, { useState, useEffect } from "react";
import { changeHandler as oldChangeHandler } from "../../Helpers/ChangeHandler";
import * as $ from "jquery";
import axios from "axios";
import DataTable from "../../components/DataTable";
import SelectBox from "../../components/SelectBox";
import BoxHeader from "../../components/BoxHeader";
import SideBarItem from "../../components/SideBarItem";
import Accordion from "react-bootstrap/Accordion";
import Box from "../Clients/Box";

function ClientNotes(props) {
  const [state, setState] = useState({
    newTableRow: {
      id: "00123456",
      Name: "Nabeel Ahmed Qureshi",
      Gender: "Male",
      Age: "21",
      LastLogin: "13-08-2022",
      FoodType: "N.A",
      UserType: "New User",

      Source: "Select",
      Phone: "03333707005",
      EmergencyContact: "03332109184",
      PresentAddress: "ABC",
      PermanentAddress:
        "G-804, SAIMA SQUAREONE, NEAR MILLINEUM, GULISTANE JAUHAR, KARACHI",
      DOB: "2001-08-07",
      Gender: "Male",
      CNIC: "42201-1375055-3",
      Domicile: "Karachi",
      Nationality: "Pakistan",
      Religion: "Islam",
      BloodGroup: "-",
      FatherName: "Nadeem Ahmed Qureshi",
      FatherCNIC: "42201-8974882-0",
      GuardianName: "Nadeem Ahmed Qureshi",
      GuardianCNIC: "42201-8974882-0",
      MaritalStatus: "Single",
      Image: "",
    },
    editingActivated: false,
    sourcesList: [],
    diseaseList: [],
    tabShown: "About",
  });
  const [newNotes, setNewNotes] = useState(false);
  function changeHandler(e) {
    oldChangeHandler(e, state, setState);
  }
  const [backboxvalue, setbackboxvalue] = useState(false);
  function onInputModel(e) {
    setbackboxvalue(true);
    setNewNotes(true);
  }
  return (
    <section>
      <Box
        title={`Notes`}
        backbox={backboxvalue}
        onbackpress={() => {}}
        boxTools={[
          {
            title: "Add New",
            icon: "fas fa-plus",
            // backbox: setbackboxvalue,
            onClickEvent: (e) => {
              onInputModel(e);
            },
          },
          {
            title: "Add",
            icon: "fas fa-plus",
            onClickEvent: (e) => {},
          },
        ]}
      />

      <div className="box-body bozero ">
        {newNotes && (
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Note Title</label> <small className="req"> *</small>
                  <input
                    name="NoteTitle"
                    type="text"
                    className="form-control"
                    required
                    value={state.newTableRow.NoteTitle}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>Note Description</label>{" "}
                  <textarea
                    name="NoteDescription"
                    type="text"
                    className="form-control"
                    value={state.newTableRow.NoteDescription}
                    onChange={changeHandler}
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    name="Date"
                    type="date"
                    className="form-control"
                    value={state.newTableRow.Date}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Preparation Date</label>
                  <input
                    name="PreparationDate"
                    type="Date"
                    className="form-control"
                    value={state.newTableRow.PreparationDate}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Status</label> <small className="req"> *</small>
                  <select
                    required
                    className="form-control"
                    name="Status"
                    value={state.newTableRow.Status}
                    onChange={changeHandler}
                  >
                    <option value="">Select</option>
                    <option value="Verified">Verified</option>
                    <option value="Unverified">Unverified</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Visibility</label> <small className="req"> *</small>
                  <select
                    required
                    className="form-control"
                    name="Visibility"
                    value={state.newTableRow.Visibility}
                    onChange={changeHandler}
                  >
                    <option value="">Select</option>
                    <option value="Visible">Visible</option>
                    <option value="Invisible">Invisible</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ClientNotes;
