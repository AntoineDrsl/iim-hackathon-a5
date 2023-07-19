import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../assets/data.json';
import Card from "./Card";

const UserList = ({ socket }) => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
  };
  
  return (
    <>
      {
        data.etudiants.map((user, index) => (
          <Card
            key={index}
            socket={socket}
            img={''}
            name={user.nom}
            school={user.ecole}
            promo={user.promotion}
            formation={'IIM'}
            entreprise={user.entreprise}
            poste={user.poste}
          />
        ))
      }
    </>
  );
};

export default UserList;