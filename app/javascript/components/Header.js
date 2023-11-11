//////////////
// About 10/30/2023:
// This file contains JS for rendering the header strip at the top of every screen
// Includes the 'SynTactic' logo, dropdown options for languages, and profile link
//////////////

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
// import profilePic from "../../assets/images/profile.png"

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('/current_user', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            // Set user data including language preference
            setSelectedLanguage(data.language); // Assuming data contains the 'language' attribute
          } 
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      }
    };
  
    getCurrentUser();
  }, []);
  

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }


  // const handleSelect = () => {
  //   setSelectedLanguage(language);
  //   setIsDropdownOpen(false);
  // }

  const handleSelect = async (language) => {
    setSelectedLanguage(language);  // Update language in the frontend state
  
    const token = localStorage.getItem('authToken'); // Retrieve the auth token from local storage
  
    try {
      const response = await fetch('/update_language', {  // Replace with your actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the auth token in the request header
        },
        body: JSON.stringify({ language }), // Send the selected language
      });
  
      if (!response.ok) {
        throw new Error('Failed to update language preference');
      }
  
      // Handle the response here. You could update user context or state if needed.
    } catch (error) {
      console.error('There was an error updating language preference:', error);
    }
    setIsDropdownOpen(false);
  };
  
  
  
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="header__container">
      {/* <header> */}
      <div className="home__link">
        <Link to="/home">
          <h1>SynTactic</h1>
        </Link>
      </div>
      <div className="header__buttons">
        <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`} >
        <div className="selected__language" onClick={handleToggleDropdown}>
          {selectedLanguage}
        </div>
        {isDropdownOpen && (
          <div className="dropdown__content">
            <div onClick={() => handleSelect('Python')} className="dropdown__item">Python</div>
            <div onClick={() => handleSelect('Java')}  className="dropdown__item">Java</div>
            <div onClick={() => handleSelect('Ruby')} className="dropdown__item">Ruby</div>
          </div> )}
        </div>
        <div className="user__profile">
          <button id="user__dashboard" onClick={goToDashboard}>
            Dashboard
          </button>
        </div>
      </div>


      {/* </header> */}
    </div>
  );
};

export default Header;