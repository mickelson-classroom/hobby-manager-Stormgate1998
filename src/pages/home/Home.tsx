import React, { useContext, useEffect, useState } from "react";
import { Weapon } from "../../models/weapons";
import { getWeapons } from "../../services/weaponService";
import { Link } from "react-router-dom";
import Navbar from "../NavBar";
import ErrorBoundary from "../ErrorBoundary";
import { WeaponContext } from "../../components/WeaponContext";
import Toast from "../../components/Toaster/Toast";
export const Home = () => {
  const {weapons, saveWeapons} = useContext(WeaponContext);
const [weapon, setWeapon] = useState({
    id: '',
    name: '',
    material: '',
    typeofDamage: '',
    range: '',
  });

 
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setWeapon({
      ...weapon,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    saveWeapons(weapon);
    setWeapon({ 
      id: "",
      name: "",
      material: "",
      typeofDamage: "",
      range: "",
    });
  };
  return (
    <>
    <Navbar/>
      <div className="container">
      <h1 className="text-success">Home Page</h1>
      <div className="d-flex flex-wrap">
        {weapons.map((w) => (
          <Link key={w.id} className="card m-3" to={`/weapon/${w.id}`}>
            <div className="card-body">
              <h5 className="card-title text-primary">{w.name}</h5>
              <p className="card-text text-secondary">
                <strong>Material:</strong> {w.material}
              </p>
            </div>
          </Link>
        ))}
      </div>
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

        <button type="submit" className="btn btn-primary button-hover-animation">
          Submit
        </button>
      </form>
    </div>
    <div className="container">
      
    </div>



      </div>
    </>
  );
};
