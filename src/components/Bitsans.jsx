import Image from '../image/crypto4.jpg'
import SectionHeader from './SectionHeader'
import {GiTwoCoins} from 'react-icons/gi'
import { bitsans } from '../data'
import Card from '../UI/Card'


const Bitsans = () => {
  return (
    <section className='bitsans'>
     <div className="container bitsans__container">
      <div className="bitsans__left">
        <div className="bitsans__image">
          <img src={Image} alt="" />
        </div>
      </div>
      <div className="bitsans__right">
        <SectionHeader icon={<GiTwoCoins/>} title="bitsans"/>
        <h1>Why Bitsan$</h1>
        <p>We do heavy lifting of compliance,regulatory requirements and banking, so 
          you can focus to build, launch and scale your business. Our API platform enables
          you to onboard customers, collect funds and payout globally
        </p>
      
      <div className="bitsans__wrapper">
            {
              bitsans.map(({id, icon, title, desc})=> {
                  return <Card className="bitsans__bitsan">
                          <span>{icon}</span>
                          <h4>{title}</h4>
                          <small>{desc}</small>
                  </Card>
              })
            }

          </div>
      </div>
     </div>


    </section>
  )
}

export default Bitsans