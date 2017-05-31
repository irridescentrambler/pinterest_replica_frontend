import React from "react";
import { Grid } from "react-bootstrap";
import { FormGroup, ControlLabel, FormControl, FieldGroup, Button, Modal, Col, Row, Form, Image } from "react-bootstrap";
import axios from "axios";
import ApplicationActions from "../actions/ApplicationActions.jsx";
import ApplicationStore from "../stores/ApplicationStore.jsx";
import StackGrid from "react-stack-grid";
import Gallery from "../components/Gallery.jsx";

class UploadPin extends React.Component {
  constructor(props){
    super(props);
    this.toggleNewBoardForm = this.toggleNewBoardForm.bind(this);
    this.createNewBoard = this.createNewBoard.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(){
    this.setState({
      boards: ApplicationStore.getState().boards
    });
  }

  toggleNewBoardForm(){
    this.setState({
      showNewBoardForm: !this.state.showNewBoardForm
    });
  }

  componentWillMount(){
    console.log("Before Mounting");
    this.state = {
      showNewBoardForm: false,
      boards: []
    }
    ApplicationActions.getBoards();
  }

  componentDidMount(){
    console.log("Mounted");
    ApplicationStore.listen(() => {
      console.log("ApplicationStore state changed");
      this.onChange();
    });
  }

  createNewBoard(event){
    event.preventDefault();
    let board_name = event.target.board_name.value;
    let board_description = event.target.board_description.value;
    ApplicationActions.createNewBoard({
      name: board_name,
      description: board_description
    });
    event.target.board_name.value = "";
    event.target.board_description.value = "";
    ApplicationActions.getBoards();
    this.toggleNewBoardForm();
  }

  render(){
    return(
      <div>
        <Grid style={{ "marginTop" : "75px" }}>
          <Row>
            <Button onClick = { this.toggleNewBoardForm } bsStyle="primary">Create new Board</Button>
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
                  <Button type="submit" bsStyle="primary" bsSize="large" active>Upload Pin</Button>
                  <Button onClick = { this.toggleNewBoardForm } bsStyle="primary" bsSize="large" active>Cancel</Button>
                </form>
              </Modal.Body>

            </Modal>
          </Row>
        </Grid>
        <div style = {{ "marginTop" : "20px" }}>
          <Gallery boards = { this.state.boards } />
        </div>
      </div>
    );
  }
}

export default UploadPin;