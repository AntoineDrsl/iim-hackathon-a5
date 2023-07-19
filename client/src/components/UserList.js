import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../assets/data.json';
import Card from "./Card";

const UserList = ({ socket }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
  };
  
  return (
    <div className='user-list-container'>
      {
        data.students.map((user, index) => (
          <Card
            key={index}
            socket={socket}
            name={user.nom}
            school={user.ecole}
            promo={user.promotion}
            formation={'IIM'}
            entreprise={user.entreprise}
            poste={user.poste}
          />
        ))
      }
    </div>
  );
};

export default UserList;