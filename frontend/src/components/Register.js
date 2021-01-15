import React from "react";
import { Link } from "react-router-dom";

function Register ({handleRegister}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);
  }

  return (
         <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__title">Регистрация</h2>
          <input className="form__input" placeholder="Email" type="email" onChange={handleEmailChange}/>
          <input className="form__input" placeholder="Пароль" type="password" onChange={handlePasswordChange}/>
          <button type="submit" className="form__submit-button">Зарегестрироваться</button>
          <p className="form__text">Уже зарегистрированы? <Link to="/sign-in" className="form__link">Войти</Link></p>
        </form>
  );
}

export default Register;
