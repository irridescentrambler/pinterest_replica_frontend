import Alt from "../Alt.jsx";
import ProfileActions from "../actions/ProfileActions.jsx";
import ApplicationStore from "../stores/ApplicationStore.jsx";

class ProfileStore {
  constructor(props) {
    this.profile = {};
    this.bindListeners({
      getProfile: ProfileActions.getProfile
    });
  }

  getProfile(boolean){
    this.setState({
      profile: ApplicationStore.getState().responseData
    });
  }
}

export default Alt.createStore(ProfileStore, 'ProfileStore');