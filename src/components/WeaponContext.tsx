import * as React from 'react';
import { Weapon} from '../models/weapons';

import { getWeapons, weapons } from '../services/weaponService';
import { useEffect, useState } from 'react';

//export const WeaponContext = React.createContext<WeaponContextType | null>(null);

interface WeaponContext {
  weapons: Weapon[];
  saveWeapons: (weapon: Weapon) => void;
  updateWeapons: (weapon: Weapon) => void;
  deleteWeapons: (weapon: Weapon) => void;
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
  deleteWeapons(weapon) {
    defaultWeapons.weapons
  },
  updateWeapons(weapon) {
    defaultWeapons.weapons
  }
};

const weaponStorageKey = "storedWeapons";
const storeWeaponsInLocalStorage = (weapons: Weapon[]) => {
  localStorage.setItem(weaponStorageKey, JSON.stringify(weapons))
}

const getWeaponsInLocalStorage = (): Weapon[] =>{
  const returnedWeapons = localStorage.getItem(weaponStorageKey);
  return JSON.parse(returnedWeapons ?? "[]")
}
export const WeaponContext = React.createContext<WeaponContext>(defaultWeapons);


export const WeaponProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [weapons, setWeapons] = useState<Weapon[]>(getWeaponsInLocalStorage())
  console.log(weapons)
  useEffect (() =>{
    const storedWeapons = getWeaponsInLocalStorage();
    if (storedWeapons.length > 0){
      setWeapons(storedWeapons)
    } else{
      getWeapons().then((newWeapons) => setWeapons(newWeapons))
    }
  }, [])

  useEffect(() => {
    console.log("Actually updating the weapon list")
    storeWeaponsInLocalStorage(weapons)
  }, [weapons])


  const saveWeapons = (weapon: Weapon) => {
    const newWeapon: Weapon = {
      id: (parseInt(weapons[weapons.length - 1].id) + 1).toString(),
      name: weapon.name,
      material: weapon.material,
      typeofDamage: weapon.typeofDamage,
      range: weapon.range
    }
    setWeapons((newWeapons) => [...newWeapons, newWeapon])
  }

  const updateWeapons = (weapon: Weapon) => {
    setWeapons((oldWeapons) => [
      weapon, 
      ...oldWeapons.filter( (w) => w.id !== weapon.id)
    ])
  }

  const deleteWeapons = (weapon: Weapon) => {
    const newWeapons = weapons.filter(w => w.id !== weapon.id)
    setWeapons(newWeapons)
  }

  return (
    <WeaponContext.Provider
        value={{
          weapons,
          saveWeapons,
          updateWeapons,
          deleteWeapons
        }}
        >{children}</WeaponContext.Provider>
  )
}
