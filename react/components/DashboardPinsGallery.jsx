import React from "react";
import StackGrid, { transitions } from "react-stack-grid";
import { Image, Button, Glyphicon  } from "react-bootstrap";
import { browserHistory } from "react-router";
import ApplicationActions from "../actions/ApplicationActions.jsx";
import javascript_time_ago from 'javascript-time-ago';

javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
const { scaleDown } = transitions;
const time_ago = new javascript_time_ago('en-US');
const twitter = time_ago.style.twitter();

class DashboardPinsGallery extends React.Component {

  constructor(props) {
    super(props);
    this.showPin = this.showPin.bind(this);
    this.likePin = this.likePin.bind(this);
    this.dislikePin = this.dislikePin.bind(this);
  }

  showPin(id){
    let url = "/pin/" + id;
    browserHistory.push(url);
  }

  likePin(id){
    ApplicationActions.likePin(id);
  }

  dislikePin(id){
    ApplicationActions.dislikePin(id);
  }

  render(){
    return(
      <StackGrid
        appear={scaleDown.appear}
        appeared={scaleDown.appeared}
        enter={scaleDown.enter}
        entered={scaleDown.entered}
        leaved={scaleDown.leaved}
        monitorImagesLoaded = { true }
        columnWidth = { 200 }
        gutterWidth = { 20 }
      >
        { this.props.pins.map((pin) => {
        return(
        <div style={{ "marginTop" : "10px", "marginBottom" : "10px" }} key = { pin.id }>
          <Image onClick={ () => { this.showPin(pin.id) } } src = { pin.pin_content.url } responsive style={{ "borderRadius" : "15px" }} />
          <div style={{ "marginTop" : "10px", "fontSize" : "11px" }}>
            <b> { pin.description }</b>
            <div>
              <Glyphicon glyph="heart" />
              <b> { pin.cached_votes_up }</b>
            </div>
            <div>
              <b>{ pin.created_at }</b>
            </div>
            <br/>
            <Image src= { pin.user.avatar.url } style={{ "width" : "25px", "height" : "25px" }} circle />
            <b> { pin.user.email }</b>
          </div>
        </div>
        )
        }) }
      </StackGrid>
    );
  }
}

export default DashboardPinsGallery;