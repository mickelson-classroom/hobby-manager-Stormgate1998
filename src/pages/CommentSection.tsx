import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from "../models/comment";
import { commentService } from '../services/commentsApiService';

interface CommentsProps {
  weaponId: string;
}

const Comments: React.FC<CommentsProps> = ({ weaponId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<Comment>({ id: '', weaponId, name: '', content: '' });
  const [editableComment, setEditableComment] = useState<Comment>({ id: '', weaponId, name: '', content: '' });
  const [isEditing,SetisEditing] = useState(false)

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
      console.log(newComment);
      await commentService.addComment(updatedComment).then(() => console.log("added comment"));

      // Refresh comments after adding
      fetchComments();

      // Reset the new comment form
      setNewComment({ id: '', weaponId, name: '', content: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleUpdateComment = async () => {
    if (editableComment) {
      try {
        await commentService.updateComment(editableComment).then(() => {
          console.log("updated comment");
          // Refresh comments after updating
          fetchComments();
        });

        // Clear editable comment
        setEditableComment({ id: '', weaponId, name: '', content: '' });
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    }
  };

  const handleDeleteComment = async (comment: Comment) => {
    try {
      await commentService.deleteComment(comment).then(() => {
        console.log("deleted comment");
        // Refresh comments after deleting
        fetchComments();
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id}>
              {editableComment.id === comment.id ? (
                <>
                  <input
                    type="text"
                    value={editableComment.name}
                    onChange={(e) => setEditableComment({ ...editableComment, name: e.target.value, content: editableComment.content })}
                  />
                  <textarea
                    value={editableComment.content}
                    onChange={(e) => setEditableComment({ ...editableComment, content: e.target.value, name: editableComment.name })}
                  />
                  <button className="btn btn-primary" onClick={
                    handleUpdateComment}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>{comment.content}</p>
                  <button className="btn btn-primary" onClick={() => setEditableComment(comment)}>
                    Edit
                  </button>
                  <button className="btn btn-primary" onClick={() => handleDeleteComment(comment)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <li>No comments available</li>
        )}
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
