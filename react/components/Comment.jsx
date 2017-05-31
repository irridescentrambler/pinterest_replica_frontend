import React from "react";
import UiComment from "react-uikit-comment";
import { ListGroupItem, Image, Glyphicon, Button } from "react-bootstrap";
import ApplicationStore from '../stores/ApplicationStore.jsx';
import ApplicationActions from '../actions/ApplicationActions.jsx';

class Comment extends React.Component{
  constructor(props) {
    super(props);
    this.likeComment = this.likeComment.bind(this);
    this.dislikeComment = this.dislikeComment.bind(this);
  }

  likeComment(id){
    ApplicationActions.likeComment(id);
  }

  dislikeComment(id){
    ApplicationActions.dislikeComment(id);
  }

  render(){
    return(
      <ListGroupItem>
        <Image src = { "http://localhost:3000" + this.props.comment.user.avatar.thumb.url } circle />
        <b>  { this.props.comment.comment }</b>
        <br/>
        <Glyphicon onClick = { () => { this.likeComment( this.props.comment.id ) } } glyph="thumbs-up" />
        { this.props.comment.cached_votes_up }
        &nbsp;
        <Glyphicon onClick = { () => { this.dislikeComment( this.props.comment.id ) } } glyph="thumbs-down" />
        { this.props.comment.cached_votes_down }
      </ListGroupItem>
    )
  }

}

export default Comment;