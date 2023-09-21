import React, { useEffect, useState } from "react";
import Navbar from "../NavBar";
import { useParams } from "react-router-dom";
import {Weapon} from "../../models/weapons";
import { weapons } from "../../services/weaponService";
export const WeaponDetailPage = () => {
  const { weaponId } = useParams();
 // const [weapons, setWeapons] = useState<Weapon[]>([]);

  const selectedWeapon = weapons.find((w) => w.id === weaponId);

  return (
    <div>
      <Navbar/>
      <h1 className="text-success">Weapon Detail Page</h1>
     {selectedWeapon &&
     <>
     <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3 container border rounded-3 ">
        <div className="h2 text-primary">Name:</div>
        <div className="h3 text-secondary">{selectedWeapon?.name}</div>
        </div>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3 container border rounded-3">
         <div className="h2 text-primary">Material:</div>
         <div className="h3 text-secondary">{selectedWeapon?.material}</div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3 container border rounded-3"> 
        <div className="h2 text-primary">Damage Type:</div>
      <div className="h3 text-secondary">{selectedWeapon?.typeofDamage}</div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3 container border rounded-3"> 
      <div className="h2 text-primary">Range:</div>
      <div className="h3 text-secondary"> {selectedWeapon?.range}
       </div>
       </div>
       </div>
</>
      }
    </div>
  );
};
