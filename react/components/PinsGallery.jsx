import React from "react";
import StackGrid, { transitions } from "react-stack-grid";
import { Image } from "react-bootstrap"
import { browserHistory } from "react-router";

const { scaleDown } = transitions;

class PinsGallery extends React.Component {

  constructor(props) {
    super(props);
    this.showPin = this.showPin.bind(this);
  }

  showPin(id){
    let url = "/pin/" + id;
    browserHistory.push(url);
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
        columnWidth = { 250 }
      >
        { this.props.pins.map((pin) => {
        return(
        <div>
          <Image onClick={ () => { this.showPin(pin.id) } } src = { "http://localhost:3000" + pin.pin_content.url } responsive />
          <b> { pin.description }</b>
        </div>
        )
        }) }
      </StackGrid>
    );
  }
}

export default PinsGallery;