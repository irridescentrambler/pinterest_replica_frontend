import React from "react";
import Spinner from "react-spinkit";

class Loader extends React.Component {
  render(){
    return(
        <Spinner style = {{ "visibility" : this.props.visibility }} name='pacman' />
      );
  }
}

export default Loader;