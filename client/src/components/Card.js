import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import femme from '../assets/femme.png';
import homme from '../assets/homme.png';

const Card = ({ socket, name, school, promo, formation, entreprise, poste }) => {
  const navigate = useNavigate();
  const random = Math.floor(Math.random() * 2);
  
  return (
    <div className='card-container'>
      <div className='card-header'>
        <img
          className='card-img'
          src={`${random === 0 ? femme : homme}`}
          alt={name}
        />
        <div className='card-header-profil'>
          <p className={'card-name card-header-content'}>{name}</p>
          <p className={'card-school card-header-content'}>{school}</p>
          <p className={'card-promo card-header-content'}>{promo}</p>
        </div>
      </div>
      <div className='card-formations'>
        <p className='card-formation-title'>Formations</p>
      {
        formation
          ? <p className='card-formation-content'>{formation}</p>
          : <p className='card-formation-content'>Pas de formation renseignée</p>
      }
      </div>
      <div className='exp'>
        <p className='card-exp-title'>Expériences</p>
        <p className='card-exp-content'>{entreprise}</p>
        <p className='card-exp-content'>{poste}</p>
      </div>
      <button className='contact'>Contacter</button>
    </div>
  );
};

export default Card;