import FAQs from '../../components/FAQs'
import MainHeader from '../../components/MainHeader'
import API from '../../components/API'
import Usecase from '../../components/Usecase'
import Bitsans from '../../components/Bitsans'




import './home.css'


const Home = () => {
  return (
    <>
    <MainHeader/>
    <API />
    <Usecase/>
    <Bitsans/>
    <FAQs/>
    
    </>
    
  )
}

export default Home