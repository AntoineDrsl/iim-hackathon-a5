import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Card = ({ socket, id, name, school, promo, formation, entreprise, poste, image }) => {
  const navigate = useNavigate();
  
  return (
    <div className='card-container'>
      <div className='card-header'>
        <img 
          src={require(`../assets/${image}`)} 
          alt={name}
          className="card-img"
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
      <div className='contact-container'>
        <Link className='contact' to={`/chat/${id}`} >Contacter</Link>
      </div>
      </div>
  );
};

export default Card;