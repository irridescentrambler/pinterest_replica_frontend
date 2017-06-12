import Alt from "../Alt.jsx";
import AuthenticationActions from "../actions/AuthenticationActions.jsx";
import axios from "axios";
import serverConfig from "../server_config.jsx";


class AuthenticationStore{
  constructor(props) {
    this.signup_message = {};
    this.login_message = {};
    this.loaded = true;
    this.bindListeners({
      signUp: AuthenticationActions.signUp,
      signIn: AuthenticationActions.signIn
    });
  }

  signIn(credentials){
    axios.post(serverConfig.url + '/auth/sign_in', {
      email: credentials.email,
      password: credentials.password
    })
    .then((response) => {
      this.setState({
        responseHeaders: response.headers,
        responseData: response.data.data
      });
      browserHistory.push('/dashboard');
      localStorage.setItem('responseHeaders', JSON.stringify(response.headers));
      localStorage.setItem('responseData', JSON.stringify(response.data.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  signUp(credentials){
    axios.post(serverConfig.url +'/users', {
      email: credentials.email,
      password: credentials.password
    }).then((response) => {
      console.log(response);
      this.setState({
        signup_message: {
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