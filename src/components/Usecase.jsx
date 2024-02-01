import {BsCashCoin} from "react-icons/bs";
import SectionHeader from "./SectionHeader";
import {usecase} from "../data"
import Card from '../UI/Card'
import {Link} from 'react-router-dom'
import {AiFillCaretRight} from 'react-icons/ai'

const Usecase = () => {
  return (
    <section className="usecase">
        <div className="container usecase__container">
            <SectionHeader icon={<BsCashCoin/>} title="usecase"/>
        
        <div className="usecase__wrapper">
            {
                usecase.map(({id, icon, title, info, path}) =>{
                    return (
                        <Card className="usecase__usecase" key={id}>
                            <span>{icon}</span>
                            <h4>{title}</h4>
                            <small>{info}</small>
                            <Link to={path} className="btn sm">Learn More <AiFillCaretRight/></Link>
                        </Card>
                    ) 
                })
            }
        </div>
        </div>
    </section>
  )
}

export default Usecase