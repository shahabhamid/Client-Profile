import React, { useState, useEffect } from "react";
import { changeHandler as oldChangeHandler } from "../../Helpers/ChangeHandler";
import * as $ from "jquery";
import axios from "axios";
import DataTable from "../../components/DataTable";
import SelectBox from "../../components/SelectBox";
import BoxHeader from "../../components/BoxHeader";
import SideBarItem from "../../components/SideBarItem";
import Accordion from "react-bootstrap/Accordion";

function ClientBooking(props) {
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

  function setTabShown(e) {
    $(".profileInfo li").removeClass("active");
    $(e.target).addClass("active");
    const tabShown = $(e.target).html();
    if (tabShown === "About") {
      $(".profileTab").animate({ left: "+=100%", opacity: "-=1" }, 250);
    } else {
      $(".profileTab").animate({ left: "-=100%", opacity: "-=1" }, 250);
    }
    setTimeout(() => {
      setState((prevState) => ({ ...prevState, tabShown: tabShown }));
      if (tabShown === "About") {
        $(".profileTab").css({ left: "-100%" });
        $(".profileTab").animate({ left: "+=100%", opacity: "+=1" }, 250);
      } else {
        $(".profileTab").css({ left: "100%" });
        $(".profileTab").animate({ left: "-=100%", opacity: "+=1" }, 250);
      }
    }, 300);
  }

  function updateInfo(e) {
    e.preventDefault();

    if (state.editingActivated) {
      axios
        .post(
          `${props.state.ATLAS_URI}/updateStudent/` + state.newTableRow._id,
          state.newTableRow
        )
        .then(() => {
          alert("Student Edited");
        })
        .catch((err) => alert(err));
    }
  }

  function changeHandler(e) {
    oldChangeHandler(e, state, setState);
  }

  return (
    <section className="profileInfo">
      <nav className="tabNavigation">
        <ul>
          <li className="active" onClick={setTabShown}>
            About
          </li>
          <li onClick={setTabShown}>Basic Assessment</li>
        </ul>
      </nav>
      <div className="profileTab">
        {state.tabShown === "About" ? (
          <div className="row">
            <h5>Bookings</h5>

            <DataTable
              tableHeader={["id", "Disease Name", "Duration", "Severity"]}
              tableBody={state.diseaseList}
              searchField="DiseaseName"
              customAction={[
                {
                  title: "Delete",
                  icon: "fas fa-times text-red",
                  onClickEvent: (e) => {},
                },
              ]}
            />
          </div>
        ) : (
          <div className="row">
            <h5>Medical Assessment</h5>
            <DataTable
              tableHeader={["id", "Disease Name", "Duration", "Severity"]}
              tableBody={state.diseaseList}
              searchField="DiseaseName"
              customAction={[
                {
                  title: "Delete",
                  icon: "fas fa-times text-red",
                  onClickEvent: (e) => {},
                },
              ]}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default ClientBooking;
