import React from "react"
import Header from "../shared/Header.jsx"

class Main extends React.Component {
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <Header/>
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Main;