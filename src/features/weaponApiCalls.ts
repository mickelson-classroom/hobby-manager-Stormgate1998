import axios from "axios";
import {Weapon} from "../models/weapons"
import { useDispatch } from 'react-redux';
const baseURL = '/api/store?key=Weapons';

export const weaponAPIService = {
  async getWeapons(): Promise<Weapon[]> {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      // Check if the error is a 404 error
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log('Weapons dont presently exist');
        return []; // Return an empty array in case of a 404 error
      }

      console.error('Error fetching comments:', error);
      throw error;
    }
  },
  async addWeapon(weapon: Weapon) {
    if (weapon.id !== '') {
      try {
        // Fetch existing comments
        const existingWeapons = (await this.getWeapons()) || [];
        const newWeapons = existingWeapons.length > 0
          ? existingWeapons.concat(weapon)
          : [weapon];

        // Make a POST request with the updated comments
        console.log(newWeapons);
        const response = await axios.post(baseURL, newWeapons);

        // Handle the response as needed
        console.log('Response from POST:', response.data);
      } catch (error) {
        console.error('Error adding weapon:', error);
        throw error;
      }
    } else {
      console.log("empty id, did not submit");
    }
  },
  async updateWeapon(weapon: Weapon) {
    try {
      const existingWeapons = await this.getWeapons() ?? [];

      // Find the index of the comment to be updated
      const weaponIndex = existingWeapons.findIndex((c) => c.id === weapon.id);

      if (weaponIndex !== -1) {
        // Replace the existing comment with the updated comment
        existingWeapons[weaponIndex] = weapon;

        // Delete existing comments and add the updated comments
        await this.deleteWeapons();
        await this.addWeapons(existingWeapons);
      } else {
        console.error('Comment not found for update.');
      }
    } catch (error) {
      console.error('Error updating weapon:', error);
      throw error;
    }
  },
  async deleteWeapons() {
    try {
      const response = await axios.delete(baseURL);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },
  async addWeapons(weapons: Weapon[]) {

    try {
      const response = await axios.post(baseURL, weapons);

      // Handle the response as needed
      console.log('Response from POST:', response.data);
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }

  },
  async deleteWeapon(weapon: Weapon) {
    const existingWeapon = await this.getWeapons() ?? [];
    const deletekey = existingWeapon[0].id;
    console.log(deletekey)
    const newList = existingWeapon.filter((c) => c.id !== weapon.id);
    console.log(newList)
    this.addWeapons(newList);
  }
};
