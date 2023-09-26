import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Navbar from "../NavBar";
import { useParams } from "react-router-dom";
import {Weapon} from "../../models/weapons";
import { weapons } from "../../services/weaponService";
import {WeaponContext, WeaponProvider} from "../../components/WeaponContext";

export const WeaponDetailPage = () => {
  const { weaponId } = useParams();
  const [isEditing, SetisEditing] = useState(false);
  const [weapon, setWeapon] = useState({
    id: weaponId || "",
    name: '',
    material: '',
    typeofDamage: '',
    range: '',
  });
 const {weapons, updateWeapons, deleteWeapons} = useContext(WeaponContext);
  const selectedWeapon = weapons.find((w) => w.id === weaponId);


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(weapon.material === ''){
      weapon.material = weapons.find(w => w.id === weapon.id)?.material ?? ""
    }else if(weapon.name === ''){
      weapon.name = weapons.find(w => w.id === weapon.id)?.name ?? ""
    }else if(weapon.range === ''){
      weapon.range = weapons.find(w => w.id === weapon.id)?.range ?? ""
    }else if(weapon.typeofDamage === ''){
      weapon.typeofDamage = weapons.find(w => w.id === weapon.id)?.typeofDamage ?? ""
    }

    updateWeapons(weapon)
    SetisEditing(false)
  };
  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setWeapon({
      ...weapon,
      [name]: value,
    });
  };

  return (
    <div>
      <Navbar/>
      <h1 className="text-success">Weapon Detail Page</h1>
     {selectedWeapon &&
     <>
     <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3 container border rounded-3 ">
        <div className="h2 text-gray">Name:</div>
        <div className="h3 text-primary">{selectedWeapon?.name}</div>
        </div>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3 container border rounded-3">
         <div className="h2 text-gray">Material:</div>
         <div className="h3 text-primary">{selectedWeapon?.material}</div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3 container border rounded-3"> 
        <div className="h2 text-gray">Damage Type:</div>
      <div className="h3 text-primary">{selectedWeapon?.typeofDamage}</div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3 container border rounded-3"> 
      <div className="h2 text-gray">Range:</div>
      <div className="h3 text-primary"> {selectedWeapon?.range}
       </div>
       </div>
        {isEditing ===true ? (
            <div className="container">
      <h2>New Weapon Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={weapon.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="material">Material:</label>
          <input
            type="text"
            className="form-control"
            id="material"
            name="material"
            value={weapon.material}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="typeofDamage">Type of Damage:</label>
          <input
            type="text"
            className="form-control"
            id="typeofDamage"
            name="typeofDamage"
            value={weapon.typeofDamage}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="range">Range:</label>
          <input
            type="text"
            className="form-control"
            id="range"
            name="range"
            value={weapon.range}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary button-hover-animation m-3">
          Submit
        </button>
        </form>
        </div>
        ) : (
           <>
           <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3">
        <div className="btn btn-primary btn-sm button-hover-animation m-3 " onClick={() =>{
              if(weaponId){
                SetisEditing(true)
              }} }>Edit</div>
       <div className="btn btn-primary btn-sm button-hover-animation m-3"
       onClick={() => {
        if(weaponId){
          deleteWeapons(weaponId)
        }
        }}>Delete</div>
        </div>
        </>
        )
        }
      
       </div>
          </>

      }
    </div>
  );
};
