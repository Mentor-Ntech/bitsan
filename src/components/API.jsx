import {Link} from 'react-router-dom'
import './api.css';

const API = () => {
  return (
    <section className="api">
      <div className="container apis__container">
      <div className="main__api-left">
          <h2>Integrate our API to start building in sandbox</h2>
          <h3>Build in compliance infrastructure to meet all regulatory requirement</h3>
          <br />
          {/* <br /> */}
          <Link to='/signin' className='btn sm'>Login</Link>
          
        </div>
      </div>
    </section>
  )
}

export default API
