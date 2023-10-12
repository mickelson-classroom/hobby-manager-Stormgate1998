import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Navbar from "../NavBar";
import { useParams } from "react-router-dom";
import {Weapon} from "../../models/weapons";
import { weapons } from "../../services/weaponService";
import {WeaponContext, WeaponProvider} from "../../components/WeaponContext";
import Comments from "../CommentSection";

import { useDeleteWeapon, useEditWeapon, useGetWeaponsQuery } from "../../features/hooks";
import { ImageUploader } from "../../components/components/ImageUploader";
import { Spinner } from "../../services/Spinner";
export const WeaponDetailPage = () => {
  const { weaponId: weaponIdParam } = useParams();
  const [isEditing, SetisEditing] = useState(false);
  const [myimgUrl, setImgUrl] = useState("");
  const [weapon, setWeapon] = useState({
    id: weaponIdParam || "",
    name: '',
    material: '',
    typeofDamage: '',
    range: '',
    imgUrl: '',
  });

  useEffect(() => {
    console.log(weapon.imgUrl)
  },[weapon.imgUrl])

  const weaponClient =  useGetWeaponsQuery();
  const editWeapon = useEditWeapon();
  const deleteThisWeapon = useDeleteWeapon();
  const changeWeapon = (e: { target: {id: string,
    name: string,
    material: string,
    typeofDamage: string,
    range: string,
    imgUrl: string,
  } }) => {
     const newWeapon: Weapon = {
        id: e.target.id,
        name: e.target.name,
        material: e.target.material,
        typeofDamage: e.target.typeofDamage,
        range: e.target.range,
        imgUrl: myimgUrl,
      }
    editWeapon.mutateAsync(newWeapon);
  }
  const selectedWeapon = weaponClient.data?.find((w) => w.id === weaponIdParam);


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(weapon.material === ''){
      weapon.material = weaponClient.data?.find(w => w.id === weapon.id)?.material ?? ""
    }
    if(weapon.name === ''){
      weapon.name = weaponClient.data?.find(w => w.id === weapon.id)?.name ?? ""
    }
    if(weapon.range === ''){
      weapon.range = weaponClient.data?.find(w => w.id === weapon.id)?.range ?? ""
    }
    if(weapon.typeofDamage === ''){
      weapon.typeofDamage = weaponClient.data?.find(w => w.id === weapon.id)?.typeofDamage ?? ""
    }
    if(myimgUrl === ''){
      setImgUrl(weaponClient.data?.find(w => w.id === weapon.id)?.imgUrl ?? "")
      weapon.imgUrl = myimgUrl;
    }


    changeWeapon({target: {id: weapon.id, name: weapon.name, material: weapon.material, range: weapon.range, typeofDamage: weapon.typeofDamage, imgUrl: weapon.imgUrl}})
    SetisEditing(false)
  };
  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setWeapon({
      ...weapon,
      [name]: value,
    });
  };
  const usedeleteWeapon=(id: string) => {
    const newWeapon: Weapon | undefined = weaponClient.data?.find(w => w.id === id)
    if(newWeapon){
      deleteThisWeapon.mutateAsync(weapon)
    };
  };

  useEffect(()=>{
 console.log(myimgUrl)
  },[myimgUrl])


  if(weaponClient.isLoading){
    return <Spinner/>
  }
  if(weaponClient.isError){
    return <div>There has been an error retrieving the data</div>
  }
  if(!weaponClient.data){
    return(
      <></>
    )
  }
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
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3 container border rounded-3"> 
      <img src={selectedWeapon.imgUrl} className="img-fluid" alt="Selected Weapon" />
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

        <div className="form-group">
           <ImageUploader setBase64Image={setImgUrl}></ImageUploader>
        </div>

        <button disabled= {!weaponClient.isLoading} type="submit" className="btn btn-primary button-hover-animation m-3">
          Submit
        </button>
        </form>
        
        </div>
        ) : (
           <>
           <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3">
        <button className="btn btn-primary btn-sm button-hover-animation m-3 " disabled={!weaponClient.isLoading}  onClick={() =>{
              if(weaponIdParam){
                SetisEditing(true)
              }} }>Edit</button>
       <button className="btn btn-primary btn-sm button-hover-animation m-3"
       onClick={() => {
        if(weaponIdParam){
        usedeleteWeapon(weaponIdParam)
        
        }
        }}
        disabled={!weaponClient.isLoading}>Delete</button>
        <Comments weaponId={weaponIdParam || ""}/>
        </div>
        
        </>
        )
        }
      
          </>

      }
    </div>
  );
};
