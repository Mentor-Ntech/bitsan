import {Link} from 'react-router-dom'
import logo from '../image/logo.jpg'
import { FaLinkedin } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { AiOutlineTwitter } from 'react-icons/ai'
import { AiFillInstagram } from 'react-icons/ai'


const Footer = () => {
  return (
    <footer>
        <div className="container footer__container">
            <article>
                <Link to="/" className='logo'>
                    <img src={logo} alt="Footer Logo" />
                </Link>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. A libero reprehenderit fugiat ratione temporibus vitae cupiditate aperiam magni doloremque. Ut tenetur tempore, neque mollitia ex libero aliquam eos voluptates consequatur.
                </p>
                <div className="footer__socials">
                    <a href="https://linkedin.com/" target="_blank" rel="noreferrer noopener"><FaLinkedin/>
                    </a>
                    <a href="https://facebook.com/" target="_blank" rel="noreferrer noopener"><FaFacebook/>
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer noopener"><AiOutlineTwitter/>
                    </a>
                    <a href="https://instagram.com/" target="_blank" rel="noreferrer noopener"><AiFillInstagram/>
                    </a>
                </div>
            </article>
            <article>
                <h4>Home</h4>
                <Link to="/home">Home</Link>
                <Link to="/platform">PlatForm</Link>
                <Link to="/developer">Developer</Link>
                <Link to="/pricing">Pricing</Link>
                <Link to="/contact">Contact</Link>
            </article>
            <article>
                <h4>Dashboard</h4>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="dashboard/users">Users</Link>
                <Link to="dashboard/transactions">Transaction</Link>
                <Link to="dashboard/payment_links">PaymentLink</Link>
                <Link to="dashboard/product">Product</Link>
                <Link to="dashboard/payout">Payout</Link>
                <Link to="dashboard/profile">Profile</Link>
                <Link to="dashboard/settings">Settings</Link>
            </article>
            <article>
                <h4>Permalinks</h4>
                <Link to="/platform">PlatForm</Link>
                <Link to="/usecase">Usecase</Link>
                <Link to="/developer">Developer</Link>
                <Link to="/pricing">Pricing</Link>
                <Link to="/resources">Resources</Link>
                <Link to="/network">Network</Link>
                <Link to="/contact">Contact</Link>
            </article>
        </div>
        <div className="footer__copyright">
            <small>2022 Bitsan$ Crypto &copy; All Rights Reserved</small>
        </div>
    </footer>
  )
}

export default Footer