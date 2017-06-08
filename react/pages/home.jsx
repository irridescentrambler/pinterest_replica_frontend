import React from "react";
import { Jumbotron, Button, Grid } from "react-bootstrap";
import ApplicationStore from "../stores/ApplicationStore.jsx";
import { browserHistory } from "react-router";

class Home extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    if(ApplicationStore.getState().responseHeaders.expiry > Math.floor(Date.now() / 1000)){
      browserHistory.push("/dashboard");
    }
  }

  render(){
    return(
      <Grid style = {{ "marginTop" : "70px" }}>
        <Jumbotron>
          <h1>Pinterest Home</h1>
        </Jumbotron>
      </Grid>
    );
  }
}

export default Home;