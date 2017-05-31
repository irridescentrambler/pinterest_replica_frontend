import React from "react";
import { Grid, Nav, NavItem, Row, Col } from "react-bootstrap";
import ApplicationActions from "../actions/ApplicationActions.jsx";
import ApplicationStore from "../stores/ApplicationStore.jsx";
import { browserHistory } from 'react-router';
import DashboardPinsGallery from "../components/DashboardPinsGallery.jsx";

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    ApplicationActions.getPins();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    ApplicationStore.listen(() => {
      this.onChange();
    });
  }

  componentWillMount(){
    this.state = {
      pins: ApplicationStore.getState().pins
    }
  }

  onChange(){
    this.setState({
      pins: ApplicationStore.getState().pins
    });
  }

  render(){
    return(
      <div style={{ "marginTop" : "75px" }}>
        <DashboardPinsGallery pins = { this.state.pins } />
      </div>
    );
  }
}

export default Dashboard;