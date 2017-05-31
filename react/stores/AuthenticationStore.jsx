import Alt from "../Alt.jsx";
import AuthenticationActions from "../actions/AuthenticationActions.jsx";
import axios from "axios";

class AuthenticationStore{
  constructor(props) {
    this.signin_message = {};
    this.login_message = {};
    this.bindListeners({
      signIn: AuthenticationActions.signIn
    });
  }

  signIn(credentials){
    axios.post('http://localhost:3000/users', {
      email: credentials.email,
      password: credentials.password
    }).then((response) => {
      console.log(response);
      this.setState({
        signin_message: {
          message_type: response.data.message_type,
          message: response.data.message,
          message_display: "visible"
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  }
}

export default Alt.createStore(AuthenticationStore);