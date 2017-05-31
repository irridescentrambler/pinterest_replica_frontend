import React from "react";

class PinCard extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
        <div style={{ "marginTop" : "10px", "marginBottom" : "10px" }}>
          <Image onClick={ () => { this.showPin(pin.id) } } src = { "http://localhost:3000" + pin.pin_content.url } responsive />
          <div style={{ "marginTop" : "10px" }}>
            <Image src= { "http://localhost:3000" + pin.user.avatar.url } style={{ "width" : "25px", "height" : "25px" }} circle />
            <b> { pin.description }</b>
            <div>
              <Glyphicon onClick = { () => { this.likePin(pin.id) } } glyph="thumbs-up" />
              { pin.cached_votes_up }
              &nbsp;
              &nbsp;
              <Glyphicon onClick = { () => { this.dislikePin(pin.id) } } glyph="thumbs-down" />
              { pin.cached_votes_down }
            </div>
          </div>
        </div>
      );
  }
}