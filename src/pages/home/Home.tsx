import React, { useEffect, useState } from "react";
import { Weapon } from "../../models/weapons";
import { getWeapons } from "../../services/weaponService";
import { Link } from "react-router-dom";

export const Home = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  useEffect(() => {
    getWeapons().then((weapons) => setWeapons(weapons));
  }, []);
  return (
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
    </div>
  );
};
