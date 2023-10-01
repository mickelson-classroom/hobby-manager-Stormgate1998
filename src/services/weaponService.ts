import { Weapon } from "../models/weapons";

export async function getWeapons(){
    return weapons;
}


 export const weapons: Weapon[] = [
{
    id: "1",
    name: "Longsword",
    material: "Steel",
    typeofDamage: "Slashing",
    range: "Melee",
    imgUrl: "",
  },
  {
    id: "2",
    name: "Bow",
    material: "Wood and String",
    typeofDamage: "Piercing",
    range: "Ranged",
    imgUrl: "",
  },
  {
    id: "3",
    name: "Warhammer",
    material: "Iron",
    typeofDamage: "Blunt",
    range: "Melee",
    imgUrl: "",
  }
]