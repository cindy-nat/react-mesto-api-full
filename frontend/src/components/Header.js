import logo from '../images/logo.svg';
import {Link, Route} from "react-router-dom";

function Header({email, handleSignOut}) {
    return (
        <header className="header page__header">
            <img src={logo} alt="Логотип" className="header__logo"/>

          <Route path="/sign-in">
            <Link className="header__text" to="sign-up">Регистрация</Link>
          </Route>
          <Route path="/sign-up">
            <Link className="header__text" to="sign-in">Войти</Link>
          </Route>

          <Route exact path="/">
            <div className="header__container">
              <p className="header__email">{email}</p>
              <button className="header__logout-button" onClick={handleSignOut}>Выйти</button>
            </div>
          </Route>

        </header>)
}
export default Header;
