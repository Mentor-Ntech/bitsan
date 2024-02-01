import { Link } from "react-router-dom";
import Image from "../image/crypto 2.jpg";

const MainHeader = () => {
  return (
    <header className="main__header">
      <div className="container main__header-container">
        <div className="main__header-left">
          <h1>The Gateway to crypto payment Point </h1>
          <h3>
            Bitsans is a payment processor that ehnance crypto payment. <br /> its one stop payment point that ehance Centralise and Decentralise <br></br> payment processor
            a platform that enables you to build your product and generate payment
            
          </h3>
          <Link to="/signin" className="btn lg">
            Get Started With Bit$an
          </Link>
          {/* <Link to='/platform' className='btn lg'>Explore More</Link/> */}
        </div>
        <div className="main__header-right">
          <div className="main__header-circle"></div>
          <div className="main__header-image">
            <img src={Image} alt="crypto 2" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
