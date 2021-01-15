import React from "react";

function Login ({handleLogin}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Вход</h2>
      <input className="form__input" placeholder="Email" type="email" onChange={handleEmailChange}/>
      <input className="form__input" placeholder="Пароль" type="password" onChange={handlePasswordChange}/>
      <button type="submit" className="form__submit-button">Войти</button>
    </form>
  );
}

export default Login;
