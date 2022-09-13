import PortfolioListCard from "../../components/PortfolioListCard/PortfolioListCard";
import { Link } from "react-router-dom";
// import './Portfolio.css'

export default function Portfolio({ models, setModels }) {

    return (
        <>
            {models.length > 0 ?
                models.map((model) =>
                    <div className='portfolio' key={model._id}>
                        <PortfolioListCard model={model} />
                    </div>
                ) : <><button className='add-btn'><Link style={{ color: 'white' }} to='/models/new'>Add a Model</Link></button></>
            }
        </>
    );
}
