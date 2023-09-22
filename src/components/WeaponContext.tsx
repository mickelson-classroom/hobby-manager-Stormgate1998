import * as React from 'react';
import { Weapon} from '../models/weapons';

import { weapons } from '../services/weaponService';

//export const WeaponContext = React.createContext<WeaponContextType | null>(null);

interface WeaponContext {
  weapons: Weapon[];
  saveWeapons: (weapon: Weapon) => void;
}

const defaultWeapons: WeaponContext = {
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
  ],
  saveWeapons: (weapon: Weapon) => {
    const maxId = weapons.reduce((max, weapon) => {
    const weaponId = parseInt(weapon.id);
     return weaponId > max ? weaponId : max;
    }, -1);
    const newWeapon: Weapon = {
      id: (maxId + 1).toString(),
      name: weapon.name,
      material: weapon.material,
      typeofDamage: weapon.typeofDamage,
      range: weapon.range
    }
    defaultWeapons.weapons = [...defaultWeapons.weapons, newWeapon]
  },
};

export const WeaponContext = React.createContext<WeaponContext>(defaultWeapons);


export const WeaponProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [weapons, setWeapons] = React.useState(defaultWeapons.weapons)

  const saveWeapons = (weapon: Weapon) => {
    const newWeapon: Weapon = {
      id: (parseInt(weapons[weapons.length - 1].id) + 1).toString(),
      name: weapon.name,
      material: weapon.material,
      typeofDamage: weapon.typeofDamage,
      range: weapon.range
    }
    setWeapons((weapons) => [...weapons, newWeapon])
  }

  return (
    <WeaponContext.Provider
        value={{
          weapons,
          saveWeapons
        }}
        >{children}</WeaponContext.Provider>
  )
}
