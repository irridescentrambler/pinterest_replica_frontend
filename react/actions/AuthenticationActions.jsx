import Alt from "../Alt.jsx";

class AuthenticationActions {
  signIn(credentials){
    return credentials;
  }
}

export default Alt.createActions(AuthenticationActions);