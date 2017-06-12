import React from "react";
import { Form, FormGroup, FormControl, Button, Col, ControlLabel, Checkbox, Row, Grid, Alert } from "react-bootstrap";
import ApplicationActions from "../actions/ApplicationActions.jsx"
import ApplicationStore from "../stores/ApplicationStore.jsx"
import { browserHistory } from "react-router";
import AuthenticationStore from "../stores/AuthenticationStore.jsx";
import AuthenticationActions from "../actions/AuthenticationActions.jsx";
import Loader from "react-loader";

class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event){
    event.preventDefault();
    this.setState({
      loaded: false
    });
    ApplicationActions.sendRequest({
      email: event.target.email.value,
      password: event.target.password.value
    });
  }

  componentWillMount() {
    if(ApplicationStore.getState().responseHeaders.expiry > Math.floor(Date.now() / 1000)){
      browserHistory.push("/dashboard");
    }
    this.state = {
      message_display: "hidden",
      message_type: "",
      message: "",
      loaded: true
    }
  }

  componentDidMount() {

  }

  render(){
    return(
      <Grid bsClass="container" style={{ "marginTop" : "70px" }}>
        <Loader loaded={this.state.loaded}>
          <Row>
            <Col sm = {1} md = {2} lg = {3}>
            </Col>
            <Col sm = {10} md = {8} lg = {6}>
              <Alert bsStyle="warning" style = {{ "visibility" : this.state.message_display }}>
                <strong> { this.state.message_type } </strong> { this.state.message }
              </Alert>
            </Col>
            <Col sm = {1} md = {2} lg = {3}>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col sm = {1} md = {2} lg = {3}>
            </Col>
            <Col sm = {10} md = {8} lg = {6}>
              <Form horizontal onSubmit = { this.handleLogin }>
                <FormGroup controlId="formHorizontalEmail">
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" name="email" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" name="password" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col sm={10}>
                    <Button bsStyle = "primary" type="submit">
                      <b>Sign in</b>
                    </Button>
                  </Col>
                </FormGroup>

              </Form>
            </Col>
            <Col sm = {1} md = {2} lg = {3}>
            </Col>
          </Row>
        </Loader>
      </Grid>
    );
  }
}

export default SignIn;