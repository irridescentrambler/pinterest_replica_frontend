import React from "react";
import ReactDOM from "react-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Grid } from "react-bootstrap";
import { Link } from "react-router";
import ApplicationStore from "../stores/ApplicationStore.jsx";
import ApplicationActions from "../actions/ApplicationActions.jsx";
import { Image } from "react-bootstrap";
import { browserHistory } from "react-router";

class Header extends React.Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this);
    this.showUploadForm = this.showUploadForm.bind(this);
    this.navigateToProfile = this.navigateToProfile.bind(this);
    this.goToStash = this.goToStash.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      responseHeaders: {},
      responseData: {}
    }
  }

  shouldComponentUpdate(){
    return true;
  }

  componentWillMount(){
    this.setState({
      responseHeaders: ApplicationStore.getState().responseHeaders,
      responseData: ApplicationStore.getState().responseData
    });
  }

  componentDidMount(){
    ApplicationStore.listen(() => {
      this.onChange();
    });
  }

  navigateToProfile(){
    browserHistory.push('/profile');
  }

  logout(){
    this.setState({
      responseHeaders: {},
      responseData: {}
    });
    ApplicationActions.logout(true);
  }

  showUploadForm(){
    this.setState({
      uploadFormShow: true
    });
  }

  goToStash(){
    browserHistory.push("/stash");
  }

  onChange(){
    this.setState({
      responseHeaders: ApplicationStore.getState().responseHeaders,
      responseData: ApplicationStore.getState().responseData
    });
  }

  render(){
    if(this.state.responseData.id){
      return(
          <Grid>
            <Navbar collapseOnSelect fixedTop = { true }>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/"><b>Pinterest</b></Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem onClick = { this.goToStash }><Link to="/stash"><b>Stash</b></Link></NavItem>
                  <NavItem onClick={ this.navigateToProfile } ><Image src= { this.state.responseData.avatar.url } style={{ "width" : "35px", "height" : "35px" }} circle /></NavItem>
                  <NavItem ><Link to="/dashboard"><b>Dashboard</b></Link></NavItem>
                  <NavItem onClick = { this.logout }><Link to="/signin"><b>Logout</b></Link></NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Grid>
      );
    }
    else{
      return(
        <Navbar collapseOnSelect fixedTop = { true }>
          <Navbar.Header style = {{ "backgroundColor" : "#ab281e" }}>
            <Navbar.Brand>
              <Link to="/" style = {{ "color" : "#fff" }}><b>&nbsp; Pinterest </b></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight style = {{ "backgroundColor" : "#ab281e" }}>
              <NavItem ><Link to="/signin" style = {{ "fontWeight" : "bold", "color" : "#ffffff" }}>SignIn</Link></NavItem>
              <NavItem ><Link to="/signup" style = {{ "fontWeight" : "bold", "color" : "#ffffff" }}>SignUp</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}

export default Header;