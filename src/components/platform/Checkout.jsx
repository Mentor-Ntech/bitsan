import {Link} from 'react-router-dom'
import Image from '../../image/crypto3.jpg'
import image from '../../image/crypto 10.PNG'
import image1 from '../../image/crypto 11.PNG'
import image2 from '../../image/crypto12.PNG'
import { checkout } from '../../data'
import Card from '../../UI/Card'





const Checkout = () => {
  return (
    <>
        <header className="main__header">
      <div className="container main__header-container">
        <div className="main__header-left">
            <span>Platform</span>
            <span>Checkout</span>
          <h1>Fast and secure way to receive crypto payments</h1>
          <h3>Superior fast payment and settlemen <br />infrastructure to accept cross-border payment <br/>from customers. On web and mobile</h3>
          <Link to='/contact' className='btn lg'>Get Start</Link>
          
        </div>
        <div className="main__header-right">
          <div className="main__header-circle"></div>
          <div className="main__header-image">
            <img src={Image} alt="crypto3" />
          </div>
        </div>
      </div>

      
    </header>
    
    
    <section>
    <div className='subHeader'>
        <div className="primary">
            <h1 className='checkText'>A payment solution <br/>that helps you grow</h1>
            <p>Exprience what it means for your business to be truly <br />
            borderless We're your business's gateway to receiving <br />
            global payments </p>
        </div>
      </div>

        <div className="checkout__wrapper">
        {
              checkout.map(({id, icon, title, desc})=> {
                  return <Card className="checkouts__checkout">
                          <span>{icon}</span>
                          <h4>{title}</h4>
                          <small>{desc}</small>
                  </Card>
              })
            }
        </div>
  </section>

  <section className="platform__story">
      <div className="container platform__story-container">
        <div className="platform__section-image">
            <span>Platform</span>
            <span>Checkout</span>
            <img src={image} alt="crypto10" />
          </div>
          
        </div>
        <div className="platform__section-content">
        <h1>Accept payments in multiple cryptocurrencies</h1>
        <h3>Accept payment from a wide variety of option <br />including Binance USD, Celo CUSDT, USDC <br/>Stablecoin and all other coin</h3>
          
      </div>
    </section>
    
  
  <section className="platform__flex">
      <div className="container platfor__flex-container">
        <div className="platform__section-content">
        <h1>Accept payments in multiple cryptocurrencies</h1>
        <h3>Accept payment from a wide variety of option <br />including Binance USD, Celo CUSDT, USDC <br/>Stablecoin and all other coin</h3>
            
          </div>
          
        </div>
        <div className="platform__section-image">
        
        <img src={image1} alt="crypto11" />
      </div>
    </section>

    <section className="platform__story">
      <div className="container platfor__story-container">
        <div className="platform__section-image">
            <img src={image2} alt="crypto12" />
          </div>
          
        </div>
        <div className="platform__section-content">
        <h1>Multiple payment and settlement options</h1>
        <h3>Send payments from your Bitsans account to <br />cryptocurrency of your choice. <br/>Want to withdraw to your local bank instead? We got that too</h3>
          
      </div>
    </section>
    
  </>
  )
}

export default Checkout