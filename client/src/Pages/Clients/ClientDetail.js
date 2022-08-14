import React, { useState, useEffect } from 'react'
import ClientProfile from './ClientProfile';
import SideBarItem from '../../components/SideBarItem'
import Accordion from 'react-bootstrap/Accordion';


function ClientDetail(props) {

    const [state, setState] = useState({
        newTableRow: {
            id: "00123456",
            Name: "Nabeel Ahmed Qureshi",
            Gender: "Male",
            Age: "21",
            LastLogin: "13-08-2022",
            FoodType: "N.A",
            UserType: "New User",
        }

    })


    return (
        <div >
            <section className="row topProfile">

                <div className="col-md-2 profile-image">
                    <img src={(state.newTableRow.Image && state.newTableRow.Image !== "") ? `${props.state.ATLAS_URI}/file/${state.newTableRow.Image}` : `${props.state.ATLAS_URI}/file/default-profile.jpg`} alt="profile" />

                </div>


                <div className="info col-md-10">
                    <div className="row">
                        <h2>{state.newTableRow.Name}</h2>
                        <div className="col-md-3">
                            <div className="row">
                                <p>ID:<span>{state.newTableRow.id}</span></p>
                                <p>Age:<span>{state.newTableRow.Age}</span></p>
                                <p>Gender:<span>{state.newTableRow.Gender}</span></p>
                            </div>
                        </div>
                        <div className="offset-md-1 col-md-3">
                            <div className="row">
                                <p>Last Login:<span>{state.newTableRow.LastLogin}</span></p>
                                <p>Food Type:<span>{state.newTableRow.FoodType}</span></p>
                                <p>User Type:<span>{state.newTableRow.UserType}</span></p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <div className='row g-0'>
                <div className='col-md-2 '>
                    <div className='clientSidebar'>
                        <Accordion>
                            <SideBarItem
                                itemKey="0"
                                title="Profile"
                                icon="fas fa-tachometer-alt"

                            />
                            <SideBarItem
                                itemKey="0"
                                title="Notes"
                                icon="fas fa-tachometer-alt"

                            />
                            <SideBarItem
                                itemKey="0"
                                title="Plans"
                                icon="fas fa-tachometer-alt"

                            />
                            <SideBarItem
                                itemKey="0"
                                title="Progress"
                                icon="fas fa-tachometer-alt"

                            />
                            <SideBarItem
                                itemKey="0"
                                title="Payments"
                                icon="fas fa-tachometer-alt"

                            />
                            <SideBarItem
                                itemKey="0"
                                title="Bookings"
                                icon="fas fa-tachometer-alt"

                            />
                            <SideBarItem
                                itemKey="0"
                                title="Diary"
                                icon="fas fa-tachometer-alt"

                            />
                            <SideBarItem
                                itemKey="0"
                                title="Documents"
                                icon="fas fa-tachometer-alt"

                            />

                        </Accordion>
                    </div>




                </div>
                <div className='col-md-10'>
                    <ClientProfile state={props} />
                </div>

            </div>

        </div>
    )


}

export default ClientDetail;