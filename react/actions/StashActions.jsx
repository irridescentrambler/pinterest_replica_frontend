import Alt from "../Alt.jsx";

class StashActions {
  getBoards(){
    return true;
  }

  createNewBoard(params){
    return params;
  }
}

export default Alt.createActions(StashActions);