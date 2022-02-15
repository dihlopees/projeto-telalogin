import Logo from './logo.svg';
import './header.css';

function Header() {
    return (
      <div className="App-header">
         <img src={Logo} alt="logo"/>
      </div>
    );
  }
  
  export default Header;