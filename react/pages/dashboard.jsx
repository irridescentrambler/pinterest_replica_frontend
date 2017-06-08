import React from "react";
import { Grid, Nav, NavItem, Row, Col } from "react-bootstrap";
import { browserHistory } from 'react-router';
import DashboardPinsGallery from "../components/DashboardPinsGallery.jsx";
import PinStore from "../stores/PinStore.jsx";
import PinActions from "../actions/PinActions.jsx";
import ApplicationStore from "../stores/ApplicationStore.jsx";
import Loader from "react-loader";

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      pins: [],
      loaded: false
    }
  }

  componentWillMount(){
    if(ApplicationStore.getState().responseData.uid == undefined){
      browserHistory.push("/signin");
    }
    PinStore.listen(this.onChange);
  }

  componentDidMount(){
    window.setTimeout(PinActions.getPins(), 5000);
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
          <Loader loaded={this.state.loaded}>
            <DashboardPinsGallery pins = { this.state.pins } />
          </Loader>
        </div>
      </Grid>
    );
  }
}

export default Dashboard;