import React from "react";
import Comment from "../components/Comment.jsx";
import { ListGroup } from "react-bootstrap";

class CommentList extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <ListGroup>
          { this.props.comments.map((comment) => {
            return(
              <Comment comment = { comment }/>
            )
          })}
        </ListGroup>
      )
  }
}

export default CommentList;