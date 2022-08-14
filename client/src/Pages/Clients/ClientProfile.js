import React, { useState, useEffect } from 'react'
import { changeHandler as oldChangeHandler } from '../../Helpers/ChangeHandler'
import * as $ from 'jquery'
import axios from 'axios'
import DataTable from '../../components/DataTable'
import SelectBox from '../../components/SelectBox'
import BoxHeader from '../../components/BoxHeader'
import SideBarItem from '../../components/SideBarItem'
import Accordion from 'react-bootstrap/Accordion';


function ClientProfile(props) {

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
            PermanentAddress: "G-804, SAIMA SQUAREONE, NEAR MILLINEUM, GULISTANE JAUHAR, KARACHI",
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
            Image: ""
        },
        editingActivated: false,
        sourcesList: [],
        diseaseList: [],
        tabShown: "About"
    })


    function setTabShown(e) {
        $(".profileInfo li").removeClass("active");
        $(e.target).addClass("active");
        const tabShown = $(e.target).html()
        if (tabShown === "About") {
            $(".profileTab").animate({ "left": '+=100%', "opacity": "-=1" }, 250);
        } else {
            $(".profileTab").animate({ "left": '-=100%', "opacity": "-=1" }, 250);
        }
        setTimeout(() => {
            setState(prevState => ({ ...prevState, tabShown: tabShown }))
            if (tabShown === "About") {
                $(".profileTab").css({ "left": "-100%" });
                $(".profileTab").animate({ "left": '+=100%', "opacity": "+=1" }, 250);
            } else {
                $(".profileTab").css({ "left": "100%" });
                $(".profileTab").animate({ "left": '-=100%', "opacity": "+=1" }, 250);
            }
        }, 300);

    }

    function updateInfo(e) {
        e.preventDefault();

        if (state.editingActivated) {
            axios.post(`${props.state.ATLAS_URI}/updateStudent/` + state.newTableRow._id, state.newTableRow)
                .then(() => {
                    alert("Student Edited")
                })
                .catch(err => alert(err))
        }

    }

    function changeHandler(e) {
        oldChangeHandler(e, state, setState);
    }

    return (
        <section className="profileInfo">
            <nav className="tabNavigation">
                <ul>
                    <li className="active" onClick={setTabShown}>About</li>
                    <li onClick={setTabShown}>Basic Assessment</li>
                </ul>
            </nav>
            <div className="profileTab">
                {state.tabShown === "About" ?
                    <div className="row">
                        <BoxHeader title={`Personal Information`} />

                        <form>
                            <div className="box-body bozero ">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>First Name</label> <small className="req"> *</small>
                                            <input name="FirstName" type="text" className="form-control" required value={state.newTableRow.FirstName} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Last Name</label> <small className="req"> *</small>
                                            <input name="LastName" type="text" className="form-control" required value={state.newTableRow.LastName} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>DOB</label>
                                            <input name="DOB" type="date" className="form-control" value={state.newTableRow.DOB} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label>Gender</label> <small className="req"> *</small>
                                            <select required className="form-control" name="Type" value={state.newTableRow.Gender} onChange={changeHandler} >
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Phone</label> <small className="req"> *</small>
                                            <input name="Phone" type="text" className="form-control" required value={state.newTableRow.Phone} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>AlternativePhone</label>
                                            <input name="AlternativePhone" type="date" className="form-control" value={state.newTableRow.AlternativePhone} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label> Email</label> <small className="req"> *</small>
                                            <input name="Email" type="email" className="form-control" required value={state.newTableRow.Email} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>AlternativeEmail</label>
                                            <input name="AlternativeEmail" type="text" className="form-control" value={state.newTableRow.AlternativeEmail} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Anniversary</label>
                                            <input name="Anniversary" type="date" className="form-control" value={state.newTableRow.Anniversary} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
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
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Change Referral</label>
                                            <input name="ChangeReferral" type="text" className="form-control" value={state.newTableRow.ChangeReferral} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Goal</label>
                                            <input name="Goal" type="text" className="form-control" value={state.newTableRow.Goal} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <h5 className="mt-2 mb-2" >Anthropometric Measurements</h5>
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Height Ft</label>
                                            <input name="HeightFt" type="text" className="form-control" value={state.newTableRow.HeightFt} onChange={changeHandler} />
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Height Inch</label>
                                            <input name="HeightInch" type="text" className="form-control" value={state.newTableRow.HeightInch} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Weight (Kgs)</label>
                                            <input name="Weight" type="text" className="form-control" value={state.newTableRow.Weight} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>Target Weight (Kgs)</label>
                                            <input name="TargetWeight" type="text" className="form-control" value={state.newTableRow.TargetWeight} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>BMI</label>
                                            <input name="BMI" type="text" className="form-control" value={state.newTableRow.BMI} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label>IdealWeight (Kgs)</label>
                                            <input name="IdealWeight" type="text" className="form-control" value={state.newTableRow.IdealWeight} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <h5 className="mt-2 mb-2" >Permanent Address</h5>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Address Line 1</label>
                                            <textarea name="Address1" type="text" className="form-control" value={state.newTableRow.Address1} onChange={changeHandler} rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Address Line 2</label>
                                            <textarea name="Address2" type="text" className="form-control" value={state.newTableRow.Address2} onChange={changeHandler} rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Country</label>
                                            <input name="Country" type="date" className="form-control" value={state.newTableRow.Country} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>State</label>
                                            <input name="State" type="date" className="form-control" value={state.newTableRow.State} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input name="City" type="text" className="form-control" value={state.newTableRow.City} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Pincode</label>
                                            <input name="PINcode" type="text" className="form-control" value={state.newTableRow.PINcode} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-info pull-right">Save</button>
                            </div>
                        </form>
                    </div>

                    :
                    <div className="row">

                        <h5>Medical Assessment</h5>
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label>Blood Group</label> <small className="req"> *</small>
                                    <select required className="form-control" name="BloodGroup" value={state.newTableRow.BloodGroup} onChange={changeHandler} >
                                        <option value="">Select</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label>Physical Activity</label> <small className="req"> *</small>
                                    <select required className="form-control" name="PhysicalActivity" value={state.newTableRow.PhysicalActivity} onChange={changeHandler} >
                                        <option value="">Select</option>
                                        <option value="Sedentary">Sedentary (Little or no exercise) </option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label>Any Weight Loss</label> <small className="req"> *</small>
                                    <select required className="form-control" name="WeightLoss" value={state.newTableRow.WeightLoss} onChange={changeHandler} >
                                        <option value="">Select</option>
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label>Disease</label> <small className="req"> *</small>
                                    <select className="form-control" name="Disease" value={state.newTableRow.Disease} onChange={changeHandler} >
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className="form-group">
                                    <label>Duration</label> <small className="req"> *</small>
                                    <select className="form-control" name="Type" value={state.newTableRow.PhysicalActivity} onChange={changeHandler} >
                                        <option value="">Select</option>

                                    </select>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div className="form-group">
                                    <label>Severity</label> <small className="req"> *</small>
                                    <select required className="form-control" name="Severity" value={state.newTableRow.Severity} onChange={changeHandler} >
                                        <option value="">Select</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-1'>
                                <button type="submit" className="btn btn-info pull-right mt-3">Add</button>
                            </div>
                        </div>

                        <div className='row mt-5'>
                            <div className='col-md-8 '>
                                <DataTable
                                    tableHeader={["id", "Disease Name", "Duration", "Severity"]}
                                    tableBody={state.diseaseList}
                                    searchField="DiseaseName"
                                    customAction={[
                                        { title: "Delete", icon: "times text-red", onClickEvent: (e) => { } }
                                    ]}
                                />
                            </div>
                            <div className='col-md-4'>
                                <div className="form-group">
                                    <label>Address Line 1</label>
                                    <textarea name="Address1" type="text" className="form-control" value={state.newTableRow.Address1} onChange={changeHandler} rows="3"></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Address Line 1</label>
                                    <textarea name="Address1" type="text" className="form-control" value={state.newTableRow.Address1} onChange={changeHandler} rows="3"></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Address Line 1</label>
                                    <textarea name="Address1" type="text" className="form-control" value={state.newTableRow.Address1} onChange={changeHandler} rows="3"></textarea>
                                </div>
                            </div>

                        </div>

                    </div>
                }
            </div>
        </section>
    )


}

export default ClientProfile;