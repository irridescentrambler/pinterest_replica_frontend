import Alt from "../Alt.jsx";
import StashActions from "../actions/StashActions.jsx";
import ApplicationStore from "../stores/ApplicationStore.jsx";
import ApplicationActions from "../actions/ApplicationActions.jsx";
import axios from "axios";
import { browserHistory } from "react-router";
import serverConfig from "../server_config.jsx";

class StashStore {
  constructor() {
    this.boards = [];
    this.loaded = false;
    this.showNewBoardForm = false;
    this.bindListeners({
      getBoards: StashActions.getBoards,
      createNewBoard: StashActions.createNewBoard
    });
  }

  getBoards(boolean){
    axios.get(serverConfig.url + "/boards", {
      params: {
      'access-token': ApplicationStore.getState().responseHeaders["access-token"],
      'client': ApplicationStore.getState().responseHeaders["client"],
      'expiry': ApplicationStore.getState().responseHeaders["expiry"],
      'uid': ApplicationStore.getState().responseHeaders["uid"]
      }
    }).then((response) => {
      this.setState({
        boards: response.data,
        loaded: true
      });
      ApplicationActions.getNewToken(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  createNewBoard(params){
    axios.post(serverConfig.url + "/boards", {
      board: {
        name: params.name,
        description: params.description,
        cover: params.cover
      },
      'access-token': ApplicationStore.getState().responseHeaders["access-token"],
      'client': ApplicationStore.getState().responseHeaders["client"],
      'expiry': ApplicationStore.getState().responseHeaders["expiry"],
      'uid': ApplicationStore.getState().responseHeaders["uid"]
    }).then((response) => {
      ApplicationActions.getNewToken(response);
    }).catch((error) => {
      alert("Unable to create board");
    });
  }
}

export default Alt.createStore(StashStore, 'StashStore');