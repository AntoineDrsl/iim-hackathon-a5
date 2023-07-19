import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ socket, img, name, school, promo, formation, entreprise, poste }) => {
  const navigate = useNavigate();
  
  return (
    <div className='card-container'>
      <div className='card-header'>
        <img src={img} alt={name}/>
        <p className={'card-name'}>{name}</p>
        <p className={'card-school'}>{school}</p>
        <p className={'card-promo'}>{promo}</p>
      </div>
      {
        formation ??
        <>
          <p className='card-formation-title'>Formations</p>
          <p className='card-formation-content'>{formation}</p>
        </>
      }
      <p className='card-exp-title'>Expérience</p>
      <p>{entreprise}</p>
      <p>{poste}</p>
    </div>
  );
};

export default Card;