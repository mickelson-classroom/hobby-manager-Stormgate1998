import React, { ChangeEvent, useContext, useState } from "react";
import { Weapon } from "../../models/weapons";
import { Link } from "react-router-dom";
import Navbar from "../NavBar";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {addWeaponsThunk} from "../../features/weapon-slice";
import { useFormControl } from "../../components/components/FormHook";
import { GenericInput } from "../../components/components/GenericInput";
import { ImageUploader } from "../../components/components/ImageUploader";
import { Spinner } from "../../services/Spinner";
export const Home = () => {
  const weapons = useAppSelector((state) => state.weapon);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((s) => s.weapon.loading)
  const saveNewWeapon = async (e: { target: Weapon }) => {
    const newWeapon: Weapon = e.target ?? {name: "", material: "", };
    //dispatch(addWeaponsThunk(newWeapon))
  };

  // Use GenericInput for each form input
  const nameInput = useFormControl<string>("");
  const materialInput = useFormControl<string>("");
  const typeofDamageInput = useFormControl<string>("");
  const rangeInput = useFormControl<string>("");
  const [imgInput, setImgInput] = useState<string>("");

 
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-success">Home Page</h1>
        { loading && (
        <Spinner/>
        )}
        <div className="d-flex flex-wrap">
          {weapons.weapons.map((w) => (
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
          <form onSubmit={(e) => e.preventDefault()} className="form-control" >
            <GenericInput
              label="Name"
              valid_feedback="Looks good!"
              invalid_feeback="Please enter a name"
              isValid={nameInput.value !== ""}
              onChange={nameInput.setValue}
              
            />
            <GenericInput
              label="Material"
              valid_feedback="Looks good!"
              invalid_feeback="Please enter a material"
              isValid={materialInput.value !== ""}
              onChange={materialInput.setValue}
            />
            <GenericInput
              label="Type of Damage"
              valid_feedback="Looks good!"
              invalid_feeback="Please enter a type of damage"
              isValid={typeofDamageInput.value !== ""}
              onChange={typeofDamageInput.setValue}
            />
            <GenericInput
              label="Range"
              valid_feedback="Looks good!"
              invalid_feeback="Please enter a range"
              isValid={rangeInput.value !== ""}
              onChange={rangeInput.setValue}
            />
            <ImageUploader setBase64Image={setImgInput}></ImageUploader>
            <button
              type="submit"
              disabled= {!loading}
              className="btn btn-primary button-hover-animation logo"
              onClick={() =>
                saveNewWeapon({
                  target: {
                    id: "",
                    name: nameInput.value,
                    material: materialInput.value,
                    typeofDamage: typeofDamageInput.value,
                    range: rangeInput.value,
                    imgUrl: imgInput,
                  },
                })
              }
            >
              Submit
            </button>
          </form>
        </div>
        <div className="container"></div>
      </div>
    </>
  );
};

