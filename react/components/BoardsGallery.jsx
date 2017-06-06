import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import StackGrid, { transitions } from "react-stack-grid";
import { browserHistory } from "react-router";

const { scaleDown } = transitions;

class BoardsGallery extends React.Component {
  constructor(props) {
    super(props);
    this.goToBoard = this.goToBoard.bind(this);
  }

  goToBoard(board){
    let path = "/board/" + board.id
    browserHistory.push(path);
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
            { this.props.boards.map((board) => {
              return(
              <div style = {{ "paddingLeft" : "5%", "paddingRight" : "5%", "text-align" : "center" }}>
                <Image style = {{ "borderRadius" : "5%" }} onClick = { () => { this.goToBoard(board) } } src = { board.cover.url } responsive />
                <b>{ board.name }</b>
              </div>
              )
            }) }
          </StackGrid>
      );
  }
}

export default BoardsGallery;