import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from "./UserList";

const Home = ({ socket }) => {
  const navigate = useNavigate();

  return (
    <div className='container'>
      <UserList/>
    </div>
  );
};

export default Home;