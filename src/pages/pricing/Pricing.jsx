import {Link} from 'react-router-dom'
import {GiPayMoney} from 'react-icons/gi'
import {GiThreeLeaves} from 'react-icons/gi'
import {FiCircle} from 'react-icons/fi'
import {FiClock} from 'react-icons/fi'
import {BsLightningCharge} from 'react-icons/bs'
import {GoRocket} from 'react-icons/go'
import {VscArrowSwap} from 'react-icons/vsc'
import SectionHeader from '../../components/SectionHeader'

import './pricing.css'
const Pricing = () => {
  return (
    <>
    
    <div className="pricing">
    <div className="main__header">
      <div className="container main__header-container">
        <div className="main__header-left">
        <span>Company</span>
          <span>Team</span>
          <h1>Flexible pricing for your business</h1>
          <h3>We offer a simple and transparent model for <br/>Merchant and businesses</h3>
          
        </div>
      </div>
    </div>
    <div className="pricingBis">
      <div className="priceText">
       <h3>PAYMENTS IN</h3>
       <p></p>
      </div>
      <div className="priceLink">
      <SectionHeader icon={<GiPayMoney/>} title="ETH"/>
      <SectionHeader icon={<FiCircle/>} title="cUSD"/>
      <SectionHeader icon={<GiThreeLeaves/>} title="USDT"/>
      
      </div>
      
    </div>
    </div>

    <section className="transaction">
      <div className="transaction-plan transaction-plan--fees">
      <header className='plan-header'>
        <p className="plan-content">We charge a processing fee per transaction</p>
        <p className="plan-price">1<span>%</span></p>
        <p className='plan-text'>Transaction fee</p>
      </header>
      <ul className='list'>
        <li className='list-item'>
        <FiClock/>
        <span>24/7 in-hours support</span>
        </li>
        <li className='list-item'>
        <BsLightningCharge/>
        <span>Instant assests withdrawal</span>
        </li>
        <li className='list-item'>
        <GoRocket/>
        <span>Fast payouts to Bank account</span>
        </li>
      </ul>
      <div className="plan-sign-up">
      <Link to='/pricing' className='btn lg'>GetStarted</Link>
      </div>
      </div>

      <div className="transaction-plan transaction-plan--complete">
      <header className='plan-header'>
        <p className='plan-text'>What it includes</p>
      </header>
      <ul className='list'>
        <li className='list-item'>
        <FiClock/>
        <span>24/7 in-hours support</span>
        </li>
        <li className='list-item'>
        <BsLightningCharge/>
        <span>Instant assests withdrawal</span>
        </li>
        <li className='list-item'>
        <GoRocket/>
        <span>Fast payouts to Bank account</span>
        </li>
      </ul>
      
      </div>

    </section>

    <section className='price-access'>
      <div className="primary-access">
        <div className="secondary-access">
          <h1>Our pricing gives you full access to <br /> our suite of products</h1>
          <p>Bitsans does not only help you to accept payments, <br/> 
           we are here to open your business up to the <br/>world through crypto cryptocurrencies</p>
        </div>
      </div>
       <div className="pricedata">
        <table>
          <tr>
            <th>-</th>
            <th>Region</th>
            <th>Processing fees</th>
            <th>Time</th>
          </tr>
          <tr>
             <th>1</th>
            <td>worldwide</td>
            <td>1%</td>
            <td>instantly</td>
           
          </tr>
          <tr>
            <th>2</th>
            <td>worldwide</td>
            <td>0.5% capped at $2.000</td>
            <td>instantly</td>
          </tr>
        </table>
       </div>

       <div className="primary-access">
        <div className="secondary-access">
          <h1 className='rate'>Our Rates</h1>
          <p className='rateText'>You always get the best rate from with Bitsans, 
          weather you want to deposit <br /> or withdrawal fund</p>

          <h1>Exchange Rate</h1>
        </div>
      </div>

    </section>

    <section className='price-customer'>
      <div className='customer-content'>
        <p className='customerText'>if your customer pay</p>
      </div>
      <div className="customer-box">
      <div className="customerInput">
        <div className="input-Text">
        <span>Amount paid</span>
        </div>
        
            <input type="text"  value="" class="inputSearch" placeholder='USD' />
            
        </div>
        <div className="icon-Price">
          <VscArrowSwap/>
        </div>
        <div className="customerInput">
         <div className="input-Text">
          <span>We settle you at</span>
         </div>
        <input type="text" value="" placeholder='USDT'/>
        </div>
      </div>
        
      
    </section>
   </>
     
  )
}

export default Pricing