import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Weapon } from '../models/weapons';
import { hammerName, swordName, wandName, staffName, bowName } from './filenames';
import { weaponAPIService } from '../services/weaponApiCalls';

interface WeaponState {
    weapons: Weapon[],
    loading: boolean
}

export const initialState: WeaponState={ 
    loading: false,
    weapons: [
    {
    id: "1",
    name: "Longsword",
    material: "Steel",
    typeofDamage: "Slashing",
    range: "Melee",
    imgUrl: swordName,
  },
  {
    id: "2",
    name: "Bow",
    material: "Wood and String",
    typeofDamage: "Piercing",
    range: "Ranged",
    imgUrl: bowName,
  },
  {
    id: "3",
    name: "Warhammer",
    material: "Iron",
    typeofDamage: "Blunt",
    range: "Melee",
    imgUrl: hammerName,
  },
  {
    id: "4",
    name: "Bonky Stick",
    material: "Wood",
    typeofDamage: "Blunt",
    range: "Melee",
    imgUrl: staffName,
  },
  {
    id: "5",
    name: "Magic Wand",
    material: "Wood",
    typeofDamage: "Magic",
    range: "Mid-Ranged",
    imgUrl: wandName,
  }
]

}

// Create async thunk for saving weapons
export const addWeaponsThunk = createAsyncThunk(
  'weapons/saveWeapons',
   async (item: Weapon) => {
    console.log("beginning")
    await weaponAPIService.addWeapon(item)
    return await weaponAPIService.getWeapons()
  }
);

// Create async thunk for updating weapons
export const updateWeaponsThunk = createAsyncThunk(
  'weapons/updateWeapons',
  async (item: Weapon): Promise<Weapon[]>  => {
    await weaponAPIService.updateWeapon(item)
    return await weaponAPIService.getWeapons()
  }
);

// Create async thunk for deleting weapons
export const deleteWeaponsThunk = createAsyncThunk(
  'weapons/deleteWeapons',
  async (item: Weapon, { dispatch }): Promise<Weapon[]> => {
    await weaponAPIService.deleteWeapon(item);

    const updatedWeapons = await weaponAPIService.getWeapons();
    return updatedWeapons;
  }
);

export const getWeaponsThunk = createAsyncThunk(
  'weapons/getWeapons',
   async (): Promise<Weapon[]> => {
    return await weaponAPIService.getWeapons()
  }
)

const weaponSlice = createSlice({
    name: "weapons",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    },
     extraReducers: (builder) => {
    builder.addCase(addWeaponsThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(addWeaponsThunk.fulfilled, (state, action) => {
      state.loading = false
      state.weapons = action.payload
    })
    builder.addCase(addWeaponsThunk.rejected, (state) => {
      state.loading = false
      //state.error = action.error.message
    })
    builder.addCase(updateWeaponsThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateWeaponsThunk.fulfilled, (state, action) => {
      state.loading = false
      state.weapons = action.payload
    })
    builder.addCase(updateWeaponsThunk.rejected, (state, action) => {
      state.loading = false
      // state.error = action.error.message
    })
    builder.addCase(deleteWeaponsThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteWeaponsThunk.fulfilled, (state, action) => {
      state.loading = false
      state.weapons = action.payload
    })
    builder.addCase(deleteWeaponsThunk.rejected, (state, action) => {
      state.loading = false
      // state.error = action.error.message
    })
    builder.addCase(getWeaponsThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getWeaponsThunk.fulfilled, (state, action) => {
      state.loading = false
      state.weapons = action.payload
    })
    builder.addCase(getWeaponsThunk.rejected, (state, action) => {
      state.loading = false
      // state.error = action.error.message
    })
  }

});

export const {setLoading} = weaponSlice.actions;
export default weaponSlice.reducer;