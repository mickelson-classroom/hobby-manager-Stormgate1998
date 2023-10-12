import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from "../models/comment";
import { commentService } from '../services/commentsApiService';
import { Spinner } from '../services/Spinner';
import { QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAddComments, useDeleteComments, useEditComments, useGetCommentsQuery } from '../features/hooks';
interface CommentsProps {
  weaponId: string;
}

const Comments: React.FC<CommentsProps> = ({ weaponId }) => {
  const commentClient = useGetCommentsQuery(weaponId)
  const addComment = useAddComments();
  const deleteComment = useDeleteComments();
  const editComment = useEditComments();
  const [newComment, setNewComment] = useState<Comment>({ id: '', weaponId, name: '', content: '' });
  const [editableComment, setEditableComment] = useState<Comment>({ id: '', weaponId, name: '', content: '' });
  const [isWaiting,SetisWaiting] = useState(false)


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

      // Reset the new comment form
      setNewComment({ id: '', weaponId, name: '', content: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleUpdateComment = async () => {
    if (editableComment) {
      addComment.mutateAsync(editableComment).then(() => {
         setEditableComment({ id: '', weaponId, name: '', content: '' });
      });
    }
  };

  const handleDeleteComment = async (comment: Comment) => {
    deleteComment.mutateAsync(comment);
  };

  if(commentClient.isLoading){
    return <Spinner/>
  }
  if(commentClient.isError){
    return <h3>There has been an error retrieving comments</h3>
  }
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {commentClient.data ? (
          commentClient.data.map((comment) => (
            <li key={comment.id}>
              {editableComment.id === comment.id ? (
                <>
                  <input
                    type="text"
                    className='form-control'
                    value={editableComment.name}
                    onChange={(e) => setEditableComment({ ...editableComment, name: e.target.value, content: editableComment.content })}
                  />
                  <textarea
                  className='form-control'
                    value={editableComment.content}
                    onChange={(e) => setEditableComment({ ...editableComment, content: e.target.value, name: editableComment.name })}
                  />
                  <button className="btn btn-primary" onClick={() => {
                        SetisWaiting(true);
                        handleUpdateComment();  // Invoke the function
                  }}>
                     Save
                  </button>
                </>
              ) : (
                <>
                  <p>{comment.content}</p>
                  <button className="btn btn-primary" onClick={() => {
                    SetisWaiting(true)
                    setEditableComment(comment)}}>
                    Edit
                  </button>
                  <button className="btn btn-primary" onClick={() => {
                      SetisWaiting(true);
                      handleDeleteComment(comment);  // Pass the comment to the function
                  }}>
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
        { isWaiting && (
        <Spinner/>
        )}

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
        <button className="btn btn-primary" onClick={() => {
          SetisWaiting(true)
          handleAddComment()
          }}>Add Comment</button>
      </div>

     
    </div>
  );
};

export default Comments;
