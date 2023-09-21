import React, { useEffect, useState } from "react";
import { Weapon } from "../../models/weapons";
import { getWeapons } from "../../services/weaponService";
import { Link } from "react-router-dom";
import Navbar from "../NavBar";
import ErrorBoundary from "../ErrorBoundary";

export const Home = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);

  useEffect(() => {
    getWeapons().then((weapons) => setWeapons(weapons));
  }, []);
  return (
    <>
    <Navbar/>
    <ErrorBoundary fallback={<h3 className="text-warning">You created a problem. Please reload the page</h3>}>
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
    </ErrorBoundary>
    </>
  );
};
