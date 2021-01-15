
function Footer () {
  const date = new Date();

  return (
    <footer className="footer page__footer">
      <p className="footer__text">&#169; {date.getFullYear().toString()} Mesto Russia</p>
    </footer>);
}

export default Footer;
