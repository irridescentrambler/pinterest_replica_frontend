import React from "react";
import { Grid, Row, Col, Button, Modal, FormGroup, FormControl } from "react-bootstrap";
import ApplicationActions from "../actions/ApplicationActions.jsx";
import ApplicationStore from "../stores/ApplicationStore.jsx";
import PinsGallery from "../components/PinsGallery.jsx";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.toggleUploadPinForm = this.toggleUploadPinForm.bind(this);
    this.createPin = this.createPin.bind(this);
  }

  onChange() {
    this.setState({
      board: ApplicationStore.getState().board,
      pins: ApplicationStore.getState().board_pins
    });
  }

  componentWillMount() {
    this.state = {
      showUploadPinForm: false,
      board: {},
      pins: []
    }
    ApplicationActions.getBoard(this.props.params.id);
  }

  componentDidMount() {
    ApplicationStore.listen(() => {
      this.onChange();
    })
  }

  createPin(event){
    event.preventDefault();
    const pin_description = event.target.pin_description.value;
    let reader = new FileReader();
    let pin_content = event.target.pin_content.files[0]
    reader.onload = (event) => {
      ApplicationActions.createPin({
        picture: event.target.result,
        description: pin_description,
        board_id: this.state.board.id
      });
    }
    reader.readAsDataURL(pin_content);
    event.target.pin_description.value = "";
    event.target.pin_content.files = [];
    this.toggleUploadPinForm();
  }

  toggleUploadPinForm(){
    this.setState({
      showUploadPinForm: ! this.state.showUploadPinForm
    });
  }

  render() {
    return(
      <Grid style={{ "marginTop" : "75px" }}>
        <Row>
          <Button onClick = { this.toggleUploadPinForm } bsStyle="primary">Upload Pin</Button>
          <Modal show = { this.state.showUploadPinForm}>

            <Modal.Header>
              <Modal.Title>Create new Pin</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit = { this.createPin }>
                <FormGroup>
                  <FormControl name="pin_description" type="text" placeholder="Pin description" />
                </FormGroup>
                <input type = "file" name="pin_content" />
                <Button type="submit" bsStyle="primary" bsSize="large" active>Upload Pin</Button>
                <Button onClick = { this.toggleUploadPinForm } bsStyle="primary" bsSize="large" active>Cancel</Button>
              </form>
            </Modal.Body>

          </Modal>
        </Row>
        <Row style = {{ "marginTop" : "10px" }}>
          <PinsGallery pins = { this.state.pins } />
        </Row>
      </Grid>
      );
  }
}

export default Board;