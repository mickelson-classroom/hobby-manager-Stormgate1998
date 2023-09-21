export interface Weapon {
    id: string;
    name: string;
    material: string;
    typeofDamage: string;
    range: string;
}
export type WeaponContextType = {
    weapons: Weapon[];
    saveWeapons: (weapon: Weapon) => void;
    //updateWeapons: (id: string) => void;
}
