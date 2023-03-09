import React, { Component } from "react";
import "./styles.css";
import CustomInput from "./components/CustomInput";
import Button from "./components/Button";

import axios from 'axios'


function App() {

  function login() {
      axios.post("http://localhost4000/login", {
          "email": email,
          "senha":senha
      }).then(r => {
          alert("Usuario logado ! ")
      })
    
     }


  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();

  const handleSubmit = () => {
    console.log(email, senha);
  };

  return (
    <div className="App">
      <form className="form">
        <CustomInput
          labelText="Email"
          id="email"
          formControlProps={{
            fullWidth: true
          }}
          handleChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <CustomInput
          labelText="Senha"
          id="senha"
          formControlProps={{
            fullWidth: true
          }}
          handleChange={(e) => setSenha(e.target.value)}
          type="password"
        />

        <Button
          type="button"
          color="primary"
          className="form__custom-button"
          onClick={()=>{ login() }}
        >
          Log in
        </Button>
      </form>
    </div>
  );
}

export default App;
