import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from "../models/comment";
import { commentService } from '../services/commentService';

interface CommentsProps {
  weaponId: string;
}

const Comments: React.FC<CommentsProps> = ({ weaponId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<Comment>({ id: '', weaponId, name: '', content: '' });

  useEffect(() => {
    // Fetch comments when the component mounts
    fetchComments();
  }, []);

  const fetchComments = async () => {
  try {
    console.log(weaponId);
    const fetchedComments = await commentService.getComments(weaponId);

    // Ensure that the fetched data is an array
    if (Array.isArray(fetchedComments)) {
      setComments(fetchedComments);
    } else {
      setComments(fetchedComments[0]);
    }

    setNewComment({ id: '', weaponId, name: '', content: '' });
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};


  const handleAddComment = async () => {
  console.log(newComment);
  try {
    const updatedComment = {
      id: Date.now().toString(),
      weaponId: newComment.weaponId,
      content: newComment.content,
      name: newComment.name,
    };
console.log(newComment)
    await commentService.addComment(updatedComment).then(() => console.log("added comment"));
    
    // Refresh comments after adding
    fetchComments();

    // Reset the new comment form
    setNewComment({ id: '', weaponId, name: '', content: '' });
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};

  const handleUpdateComment = async (commentToUpdate: Comment) => {
    try {
      await commentService.updateComment(commentToUpdate).then(() => console.log("updated comment"));
      // Refresh comments after updating
      fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await commentService.deleteComment(commentId).then(() => console.log("deleted comment"));
      // Refresh comments after deleting
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
  <li key={comment.id}>
    <p>{comment.content}</p>
    <button className="btn btn-primary" onClick={() => handleUpdateComment(comment)}>
      Update
    </button>
    <button className="btn btn-primary" onClick={() => handleDeleteComment(comment.id)}>
      Delete
    </button>
  </li>
))}

      </ul>
      <div>
        <h3>Add a Comment</h3>

        <input
          className='form-control'
          type="text"
          placeholder="Your Name"
          value={newComment.name}
          onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
        />
        <textarea
          className='form-control'
          placeholder="Your Comment"
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default Comments;
