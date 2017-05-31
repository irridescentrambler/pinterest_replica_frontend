import Alt from "../Alt.jsx";
import ApplicationActions from "../actions/ApplicationActions.jsx";
import axios from "axios";
import { browserHistory } from "react-router";

class ApplicationStore{

  constructor(){
    this.responseHeaders = JSON.parse(localStorage.getItem('responseHeaders')) || {};
    this.responseData = JSON.parse(localStorage.getItem('responseData')) || {};
    this.pins = [];
    this.boards = [];
    this.board = {};
    this.board_pins = [];
    this.pin_data = {};
    this.bindListeners({
      sendRequest: ApplicationActions.sendRequest,
      checkExpiration: ApplicationActions.checkExpiration,
      logout: ApplicationActions.logout,
      getPins: ApplicationActions.getPins,
      createPin: ApplicationActions.createPin,
      updateUserPicture: ApplicationActions.updateUserPicture,
      createNewBoard: ApplicationActions.createNewBoard,
      getBoards: ApplicationActions.getBoards,
      getBoard: ApplicationActions.getBoard,
      showPin: ApplicationActions.showPin,
      createComment: ApplicationActions.createComment,
      likePin: ApplicationActions.likePin,
      dislikePin: ApplicationActions.dislikePin,
      likeComment: ApplicationActions.likeComment,
      dislikeComment: ApplicationActions.dislikeComment
    });
    this.getNewToken = this.getNewToken.bind(this);
    this.getNewUserData = this.getNewUserData.bind(this);
  }

  sendRequest(credentials){
    axios.post('http://localhost:3000/auth/sign_in', {
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

  logout(boolean){
    this.setState({
      responseHeaders: {},
      responseData: {}
    })
    localStorage.setItem('responseHeaders', JSON.stringify({}));
    localStorage.setItem('responseData', JSON.stringify({}));
    browserHistory.push('/');
  }

  checkExpiration(date){
    if( this.responseHeaders.expiry && this.responseHeaders.expiry < date ){
      return false
    }
    else{
      return true
    }
  }

  getPins(boolean){
    axios.get('http://localhost:3000/pins', {
        params: {
          'access-token': this.responseHeaders["access-token"],
          'client': this.responseHeaders["client"],
          'expiry': this.responseHeaders["expiry"],
          'uid': this.responseHeaders["uid"]
        }
    }).then((response) => {
      this.setState({
        pins: response.data
      })
      console.log(response.data)
      this.getNewToken(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  getNewToken(response){
    if(response.headers["access-token"]){
      this.setState({
        responseHeaders: response.headers
      });
      localStorage.setItem('responseHeaders', JSON.stringify(response.headers));
    }
  }

  createPin(data){
    axios.post("http://localhost:3000/pins", {
      pin:{
        description: data.description,
        pin_content: data.picture,
        board_id: data.board_id
      },
      'access-token': this.responseHeaders["access-token"],
      'client': this.responseHeaders["client"],
      'expiry': this.responseHeaders["expiry"],
      'uid': this.responseHeaders["uid"]
    }).then((response) => {
      this.getNewToken(response);
      browserHistory.push("/dashboard");
    }).catch((error) => {
      console.log(error);
    });
  }

  updateUserPicture(file){
    let user_id = this.responseData.id;
    let route = "http://localhost:3000/users/" + user_id
    axios.put(route, {
      avatar: file,
      'access-token': this.responseHeaders["access-token"],
      'client': this.responseHeaders["client"],
      'expiry': this.responseHeaders["expiry"],
      'uid': this.responseHeaders["uid"]
    }).then((response) => {
      this.getNewToken(response);
      this.getNewUserData(response);
      location.reload();
    }).catch((error) => {
      console.log(error);
    });
  }

  getNewUserData(response){
    this.setState({
      responseData: response.data
    });
    localStorage.setItem('responseData', JSON.stringify(response.data));
  }

  createNewBoard(params){
    axios.post("http://localhost:3000/boards", {
      board: {
        name: params.name,
        description: params.description,
        cover: params.cover
      },
      'access-token': this.responseHeaders["access-token"],
      'client': this.responseHeaders["client"],
      'expiry': this.responseHeaders["expiry"],
      'uid': this.responseHeaders["uid"]
    }).then((response) => {
      this.getNewToken(response);
      browserHistory.push("/upload_pin");
    }).catch((error) => {
      alert("Unable to create board");
    });
  }

  getBoards(boolean){
    axios.get("http://localhost:3000/boards", {
      params: {
      'access-token': this.responseHeaders["access-token"],
      'client': this.responseHeaders["client"],
      'expiry': this.responseHeaders["expiry"],
      'uid': this.responseHeaders["uid"]
      }
    }).then((response) => {
      console.log(response);
      this.setState({
        boards: response.data
      });
      this.getNewToken(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  getBoard(id){
    let url = "http://localhost:3000/boards/" + id
    axios.get(url, {
      params: {
      'access-token': this.responseHeaders["access-token"],
      'client': this.responseHeaders["client"],
      'expiry': this.responseHeaders["expiry"],
      'uid': this.responseHeaders["uid"]
      }
    }).then((response) => {
      console.log(response);
      this.setState({
        board: response.data.board,
        board_pins: response.data.pins
      });
      this.getNewToken(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  showPin(id){
    let url = "http://localhost:3000/pins/" + id
    axios.get(url, {
      params: {
      'access-token': this.responseHeaders["access-token"],
      'client': this.responseHeaders["client"],
      'expiry': this.responseHeaders["expiry"],
      'uid': this.responseHeaders["uid"]
      }
    }).then((response) => {
      this.setState({
        pin_data: response.data
      });
      console.log(response)
      this.getNewToken(response);
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  createComment(data){
    let url = "/pin/" + data.comment_pin_id;
    axios.post('http://localhost:3000/comments', {
      comment: {
        comment: data.comment_body,
        pin_id: data.comment_pin_id
      },
      'access-token': this.responseHeaders["access-token"],
      'client': this.responseHeaders["client"],
      'expiry': this.responseHeaders["expiry"],
      'uid': this.responseHeaders["uid"]
    }).then((response) => {
      console.log(response);
      this.setState({
        pin_data: response.data
      });
      this.getNewToken(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  likePin(id){
    let url = "http://localhost:3000/pins/" + id + "/like";
    axios.post(url, {
      'access-token': this.responseHeaders["access-token"],
      'client': this.responseHeaders["client"],
      'expiry': this.responseHeaders["expiry"],
      'uid': this.responseHeaders["uid"]
    }).then((response) => {
      this.getNewToken(response);
      this.setState({
        pin_data: response.data
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  dislikePin(id){
    let url = "http://localhost:3000/pins/" + id + "/dislike";
    axios.post(url, {
      'access-token': this.responseHeaders["access-token"],
      'client': this.responseHeaders["client"],
      'expiry': this.responseHeaders["expiry"],
      'uid': this.responseHeaders["uid"]
    }).then((response) => {
      this.getNewToken(response);
      this.setState({
        pin_data: response.data
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  likeComment(id){
    let url = "http://localhost:3000/comments/" + id + "/like";
    axios.post(url, {
      comment: {
        id: id,
        pin_id: this.pin_data.pin.id
      },
      'access-token': this.responseHeaders["access-token"],
      'client': this.responseHeaders["client"],
      'expiry': this.responseHeaders["expiry"],
      'uid': this.responseHeaders["uid"]
    }).then((response) => {
      console.log(response);
      this.getNewToken(response);
      this.setState({
        pin_data: response.data
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  dislikeComment(id){
    let url = "http://localhost:3000/comments/" + id + "/dislike";
    axios.post(url, {
      comment: {
        id: id,
        pin_id: this.pin_data.pin.id
      },
      'access-token': this.responseHeaders["access-token"],
      'client': this.responseHeaders["client"],
      'expiry': this.responseHeaders["expiry"],
      'uid': this.responseHeaders["uid"]
    }).then((response) => {
      console.log(response);
      this.getNewToken(response);
      this.setState({
        pin_data: response.data
      });
    }).catch((error) => {
      console.log(error);
    });
  }

}

export default Alt.createStore(ApplicationStore, 'ApplicationStore');
