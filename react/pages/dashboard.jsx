import React from "react";
import { Grid, Nav, NavItem, Row, Col } from "react-bootstrap";
import ApplicationActions from "../actions/ApplicationActions.jsx";
import ApplicationStore from "../stores/ApplicationStore.jsx";
import { browserHistory } from 'react-router';
import DashboardPinsGallery from "../components/DashboardPinsGallery.jsx";
import Spinner from "react-spinkit";

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    ApplicationActions.getPins();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    if(ApplicationStore.getState().responseData.uid == undefined){
      browserHistory.push("/signin");
    }
    this.state = {
      pins: ApplicationStore.getState().pins
    }
  }

  componentDidMount(){
    ApplicationStore.listen(() => {
      this.onChange();
    });
  }

  onChange(){
    this.setState({
      pins: ApplicationStore.getState().pins
    });
  }

  render(){
    return(
      <Grid>
        <div style={{ "marginTop" : "75px" }}>
          <Spinner name='double-bounce' />
          <DashboardPinsGallery pins = { this.state.pins } />
        </div>
      </Grid>
    );
  }
}

export default Dashboard;