import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Weapon } from '../models/weapons';

interface WeaponState {
    weapons: Weapon[],
}

const initialState: WeaponState={ 
    weapons: [
    {
    id: "1",
    name: "Longsword",
    material: "Steel",
    typeofDamage: "Slashing",
    range: "Melee",
  },
  {
    id: "2",
    name: "Bow",
    material: "Wood and String",
    typeofDamage: "Piercing",
    range: "Ranged",
  },
  {
    id: "3",
    name: "Warhammer",
    material: "Iron",
    typeofDamage: "Blunt",
    range: "Melee",
  }
]

}


const weaponSlice = createSlice({
    name: "weapons",
    initialState,
    reducers: {
        saveWeapons(state, action: PayloadAction<Weapon>){
            const newWeapon: Weapon = {
                id: (Date.now).toString(),
                name: action.payload.name,
                material: action.payload.material,
                typeofDamage: action.payload.typeofDamage,
                range: action.payload.range
                }
            state.weapons = [...state.weapons, newWeapon]
        },

  updateWeapons(state, action: PayloadAction<Weapon>){
    state.weapons = [
      action.payload, 
      ...state.weapons.filter( (w) => w.id !== action.payload.id)
    ]
  },

  deleteWeapons(state, action: PayloadAction<string>){
    const newWeapons = state.weapons.filter(w => w.id !== action.payload);
    state.weapons = newWeapons;
  }
    }

});

export const {saveWeapons,updateWeapons,deleteWeapons} = weaponSlice.actions;
export default weaponSlice.reducer;