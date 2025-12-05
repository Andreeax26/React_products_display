import './navbar.css'
import { FaSearch } from 'react-icons/fa'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export function Navbar() {
    return (
    <nav className="navbar">
        <Link to="/">
        <img src={logo} alt='logo' className='logo'/>
        </Link>
        <div className='search-wrapper'>
            <FaSearch id='search-icon' />
            <input placeholder='Type to search...'/>
        </div>
    </nav>
    )
}
