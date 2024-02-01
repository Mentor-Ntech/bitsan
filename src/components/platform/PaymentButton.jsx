import {Link} from 'react-router-dom'
import image from '../../image/crypto7.jpg'
import { AiFillAppstore } from 'react-icons/ai'
import {CgWebsite} from 'react-icons/cg'
import { GiDiscussion } from 'react-icons/gi'


const PaymentButton = () => {
  return (
      <>
      <header className="main__header">
      <div className="container main__header-container">
        <div className="main__header-left">
            <span>PAYMENT BUTTON</span>
          <h1>Receive crypto payment at the tap of a button</h1>
          <h3>With payment links, you can get paid globally in dollar<br />in dollars from your customers with <br/> with automatic bank settlement</h3>
          <Link to='/contact' className='btn lg'>Get started</Link>
          
        </div>
        
        <div className="main__header-right">
          <div className="main__header-circle"></div>
          <div className="main__header-image">
            <img src={image} alt="crypto7" />
          </div>
        </div>
      </div>

      
    </header>

    <section className='price-access'>
      <div className="primary-access">
        <div className="secondary-access">
          <h1>One payment button for<br /> all your crypto Assets</h1>
          <p>Get paid in multiple stablecoins with a single, <br/> 
           dynamic payment button suited to your platform of choice</p>
        </div>
      </div>
       <div className="price-Button">
        <div className="primary-button">
          <div className="appIcon">
            <AiFillAppstore/>
            <h2>Apps</h2>
            <p>Subscriptions recurrent payments just got <br /> easier with crypto option <br />for your users</p>
          </div>
          <div className="appIcon">
            <CgWebsite/>
            <h2>Websites</h2>
            <p>Expand your appeal to a global customer base. <br /> We provide the code to help you get started</p>
          </div>
          <div className="appIcon">
            <GiDiscussion/>
            <h2>Ecommerce</h2>
            <p>Shopify, Woocommerce, and online stores and <br /> receive  Stablecoin with automatic <br /> settlement in USDT</p>
          </div>
        </div>
        
       </div>

    </section>

    </>
  )
}

export default PaymentButton