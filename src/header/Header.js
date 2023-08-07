import './Header.css'
function Header() {
  return (
    <div className="header">
      <div className="logo">Debug Team</div>
      <ul className="link">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  );
}
export default Header;
