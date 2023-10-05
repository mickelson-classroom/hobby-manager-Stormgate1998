import axios from "axios";
import { Comment } from "../models/comment";

const baseURL = 'https://joshbarlowsite.duckdns.org:3141/api/store?key=';

export const commentService = {
  async getComments(weaponId: string): Promise<Comment[]> {
    try {
      const url = baseURL + weaponId;
      console.log(url)
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },
  async addComment(comment: Comment) {
    if(comment.id != '' && comment.weaponId != ''){
      
    try {
      const url = baseURL + comment.weaponId;
      const response = await axios.post(url, comment);
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }
  
    },
  async updateComment(comment: Comment) {
    try {
      // Assuming deleteComment is correctly implemented
      await this.deleteComment(comment.weaponId);
      await this.addComment(comment);
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  },
  async deleteComment(id: string) {
    try {
      const url = baseURL + id;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },
};
