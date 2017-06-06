import Alt from "../Alt.jsx";
import PinActions from "../actions/PinActions.jsx";
import axios from "axios";
import serverConfig from "../server_config.jsx";
import ApplicationStore from "../stores/ApplicationStore.jsx";
import ApplicationActions from "../actions/ApplicationActions.jsx";

class PinStore {
  constructor() {
    this.pins = [];
    this.loader_visibility = "visible";
    this.bindListeners({
      getPins: PinActions.getPins
    })
  }

  getPins(boolean){
    axios.get(serverConfig.url + '/pins', {
        params: {
          'access-token': ApplicationStore.getState().responseHeaders["access-token"],
          'client': ApplicationStore.getState().responseHeaders["client"],
          'expiry': ApplicationStore.getState().responseHeaders["expiry"],
          'uid': ApplicationStore.getState().responseHeaders["uid"]
        }
    }).then((response) => {
      this.setState({
        pins: response.data
      })
      ApplicationActions.getNewToken(response);
    }).catch((error) => {
      console.log(error);
    });
  }
}

export default Alt.createStore(PinStore, 'PinStore');