import PortfolioListCard from '../../components/PortfolioListCard/PortfolioListCard';
import { Link } from 'react-router-dom';

export default function Portfolio({ models }) {

  return (
    <>
    <div className='portfolio-wrapper' >
        {models.length > 0 ? (
          models.map((model, idx) => (
            <>
              <div className='portfolio-object' id={idx} key={model._id} >
              <PortfolioListCard model={model} key={model._id}/>
              </div>
            </>
          ))
          ) : (
            <>
            <button className='add-btn'>
              <Link style={{ color: 'white' }} to='/models/new'>
                Add a Model
              </Link>
            </button>
          </>
        )}
        </div>
    </>
  );
}
