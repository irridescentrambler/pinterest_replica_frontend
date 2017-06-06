import React from "react";
import { Grid, Nav, NavItem, Row, Col } from "react-bootstrap";
import { browserHistory } from 'react-router';
import DashboardPinsGallery from "../components/DashboardPinsGallery.jsx";
import Loader from "../components/Loader.jsx";
import PinStore from "../stores/PinStore.jsx";
import PinActions from "../actions/PinActions.jsx";
import ApplicationStore from "../stores/ApplicationStore.jsx";

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      pins: [],
      loader_visibility: "visible"
    }
  }

  componentWillMount(){
    if(ApplicationStore.getState().responseData.uid == undefined){
      browserHistory.push("/signin");
    }
    PinStore.listen(this.onChange);
  }

  componentDidMount(){
    PinActions.getPins();
  }

  componentWillUnmount() {
    PinStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

  render(){
    return(
      <Grid>
        <div style={{ "marginTop" : "75px" }}>
          <Loader visibility = { this.state.loader_visibility } />
          <DashboardPinsGallery pins = { this.state.pins } />
        </div>
      </Grid>
    );
  }
}

export default Dashboard;