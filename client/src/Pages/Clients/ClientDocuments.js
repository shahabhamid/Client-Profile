import React, { useState, useEffect } from "react";
import { changeHandler as oldChangeHandler } from "../../Helpers/ChangeHandler";
import * as $ from "jquery";
import axios from "axios";
import DataTable from "../../components/DataTable";
import SelectBox from "../../components/SelectBox";
import BoxHeader from "../../components/BoxHeader";
import SideBarItem from "../../components/SideBarItem";
import Accordion from "react-bootstrap/Accordion";

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

  function changeHandler(e) {
    oldChangeHandler(e, state, setState);
  }

  return (
    <section>
      <BoxHeader title={`Client Documents`} />

      <div className="box-body bozero "></div>
    </section>
  );
}

export default ClientNotes;
