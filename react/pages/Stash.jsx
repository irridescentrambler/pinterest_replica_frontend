import React from "react";
import { Grid } from "react-bootstrap";
import { FormGroup, ControlLabel, FormControl, FieldGroup, Button, Modal, Col, Row, Form, Image } from "react-bootstrap";
import axios from "axios";
import ApplicationActions from "../actions/ApplicationActions.jsx";
import ApplicationStore from "../stores/ApplicationStore.jsx";
import StackGrid from "react-stack-grid";
import BoardsGallery from "../components/BoardsGallery.jsx";
import { browserHistory } from "react-router";
import StashActions from "../actions/StashActions.jsx";
import StashStore from "../stores/StashStore.jsx";

class Stash extends React.Component {
  constructor(props){
    super(props);
    this.toggleNewBoardForm = this.toggleNewBoardForm.bind(this);
    this.createNewBoard = this.createNewBoard.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      showNewBoardForm: false,
      boards: []
    }
  }

  componentWillMount(){
    if(ApplicationStore.getState().responseData.uid == undefined){
      browserHistory.push("/signin");
    }
  }

  componentDidMount(){
    StashStore.listen(this.onChange);
    StashActions.getBoards();
  }

  componentWillUnmount() {
    StashStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

  toggleNewBoardForm(){
    this.setState({
      showNewBoardForm: !this.state.showNewBoardForm
    });
  }

  createNewBoard(event){
    event.preventDefault();
    let board_name = event.target.board_name.value;
    let board_description = event.target.board_description.value;
    StashActions.createNewBoard({
      name: board_name,
      description: board_description
    });
    event.target.board_name.value = "";
    event.target.board_description.value = "";
    StashActions.getBoards();
    this.toggleNewBoardForm();
  }

  render(){
    return(
      <div>
        <Grid style={{ "marginTop" : "75px" }}>
          <Row>
            <Button onClick = { this.toggleNewBoardForm } bsStyle="primary"><b>Create new Board</b></Button>
            <Modal show = { this.state.showNewBoardForm }>

              <Modal.Header>
                <Modal.Title>Create new board</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <form onSubmit = { this.createNewBoard }>
                  <FormGroup bsSize="large">
                    <FormControl name = "board_name" type="text" placeholder="Board name" />
                  </FormGroup>
                  <FormGroup>
                    <FormControl name="board_description" type="text" placeholder="Board description" />
                  </FormGroup>
                  <Button type="submit" bsStyle="primary" bsSize="large" active><b>Create</b></Button>
                  &nbsp;&nbsp;
                  <Button onClick = { this.toggleNewBoardForm } bsStyle="primary" bsSize="large" active><b>Cancel</b></Button>
                </form>
              </Modal.Body>

            </Modal>
          </Row>
        </Grid>
        <Grid>
          <div style = {{ "marginTop" : "20px" }}>
            <BoardsGallery boards = { this.state.boards } />
          </div>
        </Grid>
      </div>
    );
  }
}

export default Stash;