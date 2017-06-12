import React from "react";
import { Grid, Col, Well, Row } from "react-bootstrap";
import ApplicationStore from "../stores/ApplicationStore.jsx";
import ApplicationActions from "../actions/ApplicationActions.jsx";
import { Updateprofile } from 'thousanday-react';
import { browserHistory } from "react-router";
import ProfileStore from "../stores/ProfileStore.jsx";
import ProfileActions from "../actions/ProfileActions.jsx";
import { Card, CardImg, CardText, CardBlock, CardLink, CardTitle, CardSubtitle } from 'reactstrap';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      profile: {}
    }
    this.changeProfilePic = this.changeProfilePic.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    if(ApplicationStore.getState().responseData.uid == undefined){
      browserHistory.push("/signin");
    }
    ProfileStore.listen(this.onChange);
    ProfileActions.getProfile();
  }

  changeProfilePic(finalUrl){
    let reader = new FileReader();
    reader.onload = function(event){
      ApplicationActions.updateUserPicture(event.target.result);
    }
    reader.readAsDataURL(finalUrl);
  }

  onChange(state){
    this.setState(state);
  }

  componentWillUnmount(){
    ProfileStore.unlisten(this.onChange);
  }

  render(){
    return(
      <Grid style = {{ "marginTop" : "100px" }}>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <Updateprofile src={ this.state.profile.avatar.url } width="200" saveProfile={ this.changeProfilePic } />
          </Col>
          <Col xs={12} md={6} lg={8}>
            <Well>Email: { this.state.profile.email }</Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Profile;