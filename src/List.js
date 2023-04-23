import React, { useState, useEffect, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  id,
  firstName,
  username,
  email,
  phone,
  image,
  domain,
  age,
  gender,
  maidenName,
  lastName,
  birthDate,
  bloodGroup,



}) => {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div class="card" style={{ width: '30rem'}}>
        <h4>{id}</h4>
        <img src={image} class="card-img-top" alt="loading" />
        <div class="card-body">
          <h5 class="card-title">{firstName} &nbsp;{maidenName}&nbsp;{lastName}</h5>
          <li class="list-group-item"><b>UserName</b>:&nbsp;{username}</li>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Age</b>:&nbsp;{age}</li>
          <li class="list-group-item"><b>Gender</b>:&nbsp;{gender}</li>
          <li class="list-group-item"><b>BirthDate</b>:&nbsp;{birthDate}</li>
          <li class="list-group-item"><b>bloodGroup</b>:&nbsp;{bloodGroup}</li>
          <li class="list-group-item"><b>Email</b>:&nbsp;{email}</li>
          <li class="list-group-item"><b>Phone</b>:&nbsp;{phone}</li>
          <li class="list-group-item"><b>Domain</b>:&nbsp;{domain}</li>

        </ul>
        <div class="card-body">
          <a href="#" class="btn btn-primary">Higher Now</a>

        </div>
      </div>
    </div>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  id: PropTypes.number,
  firstName: PropTypes.string.isRequired,
  maidenName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  age: PropTypes.number,
  gender: PropTypes.number,
  birthDate: PropTypes.number,
  bloodGroup: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,

};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      console.log(response.data.users)
      setItems(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const filteredItems = items.filter((item) => {
    return (
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.maidenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) 
      
    );
  });

  return (
      <div >
        <input type="text" value={searchQuery} placeholder='Search User.....' onChange={handleSearch} style={{display:'flex',justifyContent:'center',alignItems:'center',width:'300px',marginBottom:'50px',marginleft:'50px'}} />
      <div style={{ textAlign: 'left' }}>
        {filteredItems.map((item, index) => (
          <SingleListItem
            key={index}
            onClickHandler={() => handleClick(index)}
            index={index}
            id={item.id}
            age={item.age}
            gender={item.gender}
            birthDate={item.birthDate}
            bloodGroup={item.bloodGroup}
            firstName={item.firstName}
            maidenName={item.maidenName}
            lastName={item.lastName}
            username={item.username}
            email={item.email}
            phone={item.phone}
            domain={item.domain}
            image={item.image}

            isSelected={index === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;
