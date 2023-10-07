import axios from "axios";
import { Comment } from "../models/comment";

const baseURL = '/api/store?key=';

export const commentService = {
  async getComments(weaponId: string): Promise<Comment[]> {
    try {
      const url = baseURL + weaponId;
      console.log(url);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // Check if the error is a 404 error
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log('Comments not found for weaponId:', weaponId);
        return []; // Return an empty array in case of a 404 error
      }

      console.error('Error fetching comments:', error);
      throw error;
    }
  },
  async addComment(comment: Comment) {
    if (comment.id !== '' && comment.weaponId !== '') {
      try {
        // Fetch existing comments
        const existingComments = (await this.getComments(comment.weaponId)) || [];
        const newComments = existingComments.length > 0
          ? existingComments.concat(comment)
          : [comment];

        // Make a POST request with the updated comments
        console.log(newComments);
        const response = await axios.post(baseURL+newComments[0].weaponId, newComments);

        // Handle the response as needed
        console.log('Response from POST:', response.data);
      } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
      }
    } else {
      console.log("empty id, did not submit");
    }
  },
  async updateComment(comment: Comment) {
    try {
      const existingComments = await this.getComments(comment.weaponId) ?? [];

      // Find the index of the comment to be updated
      const commentIndex = existingComments.findIndex((c) => c.id === comment.id);

      if (commentIndex !== -1) {
        // Replace the existing comment with the updated comment
        existingComments[commentIndex] = comment;

        // Delete existing comments and add the updated comments
        await this.deleteComments(comment.weaponId);
        await this.addComments(existingComments);
      } else {
        console.error('Comment not found for update.');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  },
  async deleteComments(id: string) {
    try {
      const url = baseURL + id;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },
  async addComments(comments: Comment[]) {

    try {
      const response = await axios.post(baseURL+ comments[0].weaponId, comments);

      // Handle the response as needed
      console.log('Response from POST:', response.data);
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }

  },
  async deleteComment(comment: Comment) {
    const existingComments = await this.getComments(comment.weaponId) ?? [];
    const deletekey = existingComments[0].weaponId;
    console.log(deletekey)
    this.deleteComments(existingComments[0].weaponId);
    const newList = existingComments.filter((c) => c.id !== comment.id);
    console.log(newList)
    this.addComments(newList);
  }
};
