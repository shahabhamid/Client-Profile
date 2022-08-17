import React, { Component } from 'react'
import axios from 'axios';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import { AddClient, ListClients, ClientDetail } from './Pages/Clients/Clients'
import { AddSource } from './Pages/Masters/Masters'

class App extends Component {

  state = {
    //ATLAS_URI: "https://demo-lead.herokuapp.com",
    //ATLAS_URI: "https://lead-udaisoftware.herokuapp.com",
    ATLAS_URI: "http://localhost:5000",
    CSRF_TOKEN: "",
    operator: {
      Name: "",
      Username: "",
      Role: ""
    },
    configToken: {},
    pageAccessible: [],
    sessionID: "",
    EditDetailsData: {},
    currentPage: "Dashboard",
    clientsList: [],
    leadsList: [],
    sourcesList: [],
    propertyTypeList: [],
    usersList: [],
    statusList: [],

    setCurrentPage: page => {
      let newEditDetailsData = {};
      if (this.state.EditDetailsData.pageFlag === page) {
        newEditDetailsData = this.state.EditDetailsData;
      }
      this.setState({
        currentPage: page,
        EditDetailsData: newEditDetailsData
      });
    }
  }

  constructor() {
    super();

    this.updateList = this.updateList.bind(this);
    this.updateOperatorInfo = this.updateOperatorInfo.bind(this);
    this.updateEditDetails = this.updateEditDetails.bind(this);
    this.redirectFromEditDetails = this.redirectFromEditDetails.bind(this);
  }

  componentDidMount() {




    const config = {
      headers: {
        Authorization: `Bearer notoken`,
      },
    }
    // axios.all(
    //   [
    //     axios.get(`${this.state.ATLAS_URI}/getClients/`),
    //   ]
    // )
    //   .then(axios.spread((clients) => {
    //     this.setState({
    //       clientsList: clients.data,
    //     });

    //   }))
    //   .catch(error => console.log(error));


  }
  updateList(list, newList) {
    this.setState({
      [list]: newList
    })
  }

  updateOperatorInfo(operator) {
    const start = parseInt(Math.random() * (operator.Username.length - 3));
    const sessionCode = operator.Username.substr(start, 3).toUpperCase() + (new Date()).getTime() + String(parseInt(Math.random() * 10));
    console.log(operator)
    const newOperator = {
      id: operator.id,
      Name: operator.Name,
      Username: operator.Username,
      Role: operator.Role,
      token: operator.token,
      LastLogin: operator.LastLogin
    }
    this.setState({
      operator: newOperator,
      sessionID: sessionCode
    })

    window.localStorage.setItem('operator', JSON.stringify(newOperator));
  }

  updateEditDetails(newEditDetailsData) {
    this.state.EditDetailsData = newEditDetailsData;
  }

  redirectFromEditDetails(page) {
    this.state.EditDetailsData = {};
    if (page !== null) {
      window.location.replace(page)
    }
  }

  render() {

    return (
      <React.Fragment>
        <Router>


          <main id="pageContainer">


            <section id="page_section">
              {

                <Switch>


                  <Route path="/Clients/addClient" exact component={() => <AddClient state={this.state} redirectFromEditDetails={this.redirectFromEditDetails} updateList={this.updateList} />} />
                  <Route path="/Clients/listClients" exact component={() => <ListClients state={this.state} updateEditDetails={this.updateEditDetails} updateList={this.updateList} />} />
                  <Route path="/Clients/clientDetail" exact component={() => <ClientDetail state={this.state} updateEditDetails={this.updateEditDetails} updateList={this.updateList} />} />
                  <Route path="/Masters/addSource" exact component={() => <AddSource state={this.state} updateList={this.updateList} />} />

                </Switch>

              }
            </section>

          </main>

        </Router>
      </React.Fragment>


    );
  }

}


export default App;
