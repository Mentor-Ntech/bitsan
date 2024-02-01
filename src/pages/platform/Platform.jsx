// import './platform.css'
// const Platform = () => {
//   return (
//     <div>Platform</div>
//   )
// }

// export default Platform




import Checkout from '../../components/platform/Checkout'
import Earn from '../../components/platform/Earn'
import Payment from '../../components/platform/Payment'
import PaymentLink from '../../components/platform/PaymentLink'
import Product from '../../components/platform/Product'
import BitsansToken from '../../components/platform/BitsansToken'
import Payout from '../../components/platform/Payout'


import './platform.css'


const Platform = () => {
  return (
    <>
    <Checkout/>
    <Earn />
    <Payment />
    <Product />
    <BitsansToken />
    <PaymentLink />
    <Payout />
    
    </>
    
  )
}

export default Platform