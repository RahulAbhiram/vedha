import React, { useState } from "react";
       
function Login() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setContact(prevValue => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName,
          email: prevValue.email
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lName: value,
          email: prevValue.email
        };
      } else if (name === "email") {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          email: value
        };
      }
    });
  }

  return (
    <div  className="container">
      <div className="logindiv">
      <h1 className="loginHead">
        HELLO {contact.fName} {contact.lName} your email is {contact.email} 
      </h1>
      
      <form>
      <label className="labels" for="FirstName">
        First Name
      </label>
        <input className="containerFirst" id="FirstName"
          onChange={handleChange}
          name="fName"
          value={contact.fName}
        />
        <label className="labels" for="lastName">
        Last Name
      </label>
        <input className="containerFirst" id="lastName"
          onChange={handleChange}
          name="lName"
          value={contact.lName}
        />
        <label className="labels" for="emailid">
        Email
      </label>
        <input className="containerFirst" id="emailid"
          onChange={handleChange}
          name="email"
          value={contact.email}
        />
        <button className="">Submit</button>
      </form>
      </div>
    </div>
  );
}


export default Login;