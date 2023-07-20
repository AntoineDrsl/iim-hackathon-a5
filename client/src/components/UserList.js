import React, {useState} from 'react';
import data from '../assets/data.json';
import Card from "./Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const UserList = ({ socket }) => {
  const students = data.students;
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [searchValue, setSearchValue] = useState('');
  
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    const filteredStudent = students.filter(student => 
      student.nom.toLowerCase().includes(e.target.value.toLowerCase()) 
      || student.ecole.toLowerCase().includes(e.target.value.toLowerCase())
      || student.promotion.includes(e.target.value)
      || student.email.toLowerCase().includes(e.target.value.toLowerCase())
      || student.entreprise.toLowerCase().includes(e.target.value.toLowerCase())
      || student.poste.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if(filteredStudent.length > 0){
      setFilteredStudents(filteredStudent);
    } else {
      setFilteredStudents(students);
    }
  }
  
  return (
    <>
      <div className='research-container'>
        <div className='input-container'>
          <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
          <input
            className='search-input-react'
            type='text'
            onChange={handleChange}
            value={searchValue}
            placeholder={'Chercher un alumni'}
          />
        </div>
        
      </div>
      <div className='user-list-container'>
        {
          filteredStudents.map((user, index) => (
            <Card
              key={index}
              socket={socket}
              name={user.nom}
              school={user.ecole}
              promo={user.promotion}
              formation={'IIM'}
              entreprise={user.entreprise}
              poste={user.poste}
              image={user.image}
            />
          ))
        }
      </div>
    </>
  );
};

export default UserList;