import * as React from 'react';
import { Weapon, WeaponContextType,} from '../models/weapons';

import { weapons } from '../services/weaponService';

export const WeaponContext = React.createContext<WeaponContextType | null>(null);

const WeaponProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [weapons, setWeapons] = React.useState<Weapon[]>([{
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
  }]);
  const saveWeapons = (weapon: Weapon): void => {
    const newWeapon: Weapon = {
        id: (weapons.length > 0 ? weapons[weapons.length].id + 1: 1).toString(),
        name: weapon.name,
        material: weapon.material,
        typeofDamage: weapon.typeofDamage,
        range: weapon.range,
    }
    setWeapons([...weapons, newWeapon]);
}
};


