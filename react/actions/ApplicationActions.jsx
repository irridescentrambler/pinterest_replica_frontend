import Alt from "../Alt.jsx"

class ApplicationActions {
  sendRequest(credentials){
    return credentials;
  }

  checkExpiration(date){
    return date;
  }

  logout(boolean){
    return boolean;
  }

  getPins(){
    return true;
  }

  createPin(data){
    return data;
  }

  updateUserPicture(file){
    return file;
  }

  createNewBoard(params){
    return params;
  }

  getBoards(){
    return true;
  }

  getBoard(id){
    return id;
  }

  showPin(id){
    return id;
  }

  createComment(data){
    return data;
  }

  likePin(id){
    return id;
  }

  dislikePin(id){
    return id;
  }

  likeComment(id){
    return id;
  }

  dislikeComment(id){
    return id;
  }
}

export default Alt.createActions(ApplicationActions);
