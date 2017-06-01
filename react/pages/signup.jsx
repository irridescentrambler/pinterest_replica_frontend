import React from "react";
import { Grid, Row, Col, Modal, Button, FormGroup, FormControl, ControlLabel, Checkbox, Form, Alert } from "react-bootstrap";
import AuthenticationActions from "../actions/AuthenticationActions.jsx";
import AuthenticationStore from "../stores/AuthenticationStore.jsx";
import ApplicationActions from "../actions/ApplicationActions.jsx"
import ApplicationStore from "../stores/ApplicationStore.jsx"
import { browserHistory } from "react-router";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(){
    this.setState(AuthenticationStore.getState().signup_message);
  }

  componentWillMount() {
    if(ApplicationStore.getState().responseHeaders.expiry > Math.floor(Date.now() / 1000)){
      browserHistory.push("/dashboard");
    }
    this.state = {
      message_display: "hidden",
      message_type: "",
      message: ""
    }
  }

  componentDidMount() {
    AuthenticationStore.listen(() => {
      this.onChange();
    });
  }

  signUp(event){
    event.preventDefault();
    if(event.target.password.value == event.target.confirmed_password.value){
      AuthenticationActions.signUp({
        email: event.target.email.value,
        password: event.target.password.value
      });
    }
    else{
      this.setState({
        message_display: "visible",
        message_type: "Error",
        message: "Confirmed password doesn't match original password"
      });
    }
  }

  render(){
    return(
      <Grid>
        <Row style = {{ "marginTop" : "80px" }}>
          <Col lg = {4} md = {3} sm = {1}></Col>
          <Col lg = {4} md = {6} sm = {10}>
            <Alert bsStyle="warning" style = {{ "visibility" : this.state.message_display }}>
              <strong> { this.state.message_type } </strong> { this.state.message }.
            </Alert>
          </Col>
          <Col lg = {4} md = {3} sm = {1}></Col>
        </Row>
        <Row>
          <Col lg = {4} md = {3} sm = {1}></Col>
          <Col lg = {4} md = {6} sm = {10} style = {{ "borderRadius" : "5%", "paddingTop" : "15px", "paddingBottom" : "15px" }}>
            <div>
              <form onSubmit = { this.signUp }>
                <FormGroup>
                  <FormControl type="text" placeholder="Email" name="email"/>
                </FormGroup>
                <FormGroup>
                  <FormControl type="password" placeholder="password" name="password"/>
                </FormGroup>
                <FormGroup>
                  <FormControl type="password" placeholder="confirm password" name="confirmed_password"/>
                </FormGroup>
                <Button bsStyle = "primary" type = "submit">Submit</Button>
              </form>
            </div>
          </Col>
          <Col lg = {4} md = {3} sm = {1}></Col>
        </Row>
      </Grid>
    );
  }
}

export default SignUp;