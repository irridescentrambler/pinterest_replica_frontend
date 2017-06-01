import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import StackGrid, { transitions } from "react-stack-grid";
import { browserHistory } from "react-router";
import serverConfig from "../server_config.jsx";

const { scaleDown } = transitions;

class Gallery extends React.Component {
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
              <div>
                <Image onClick = { () => { this.goToBoard(board) } } src = { serverConfig.url + board.cover.url } responsive />
                <p>{ board.name }</p>
              </div>
              )
            }) }
          </StackGrid>
      );
  }
}

export default Gallery;