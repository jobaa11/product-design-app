import PortfolioListCard from '../../components/PortfolioListCard/PortfolioListCard';
import { Link } from 'react-router-dom';


export default function Portfolio({ models, setModels }) {


  return (
    <>
    <div className='portfolio-wrapper'>
      {models.length > 0 ? (
        models.map((model) => (
          <div className='portfolio' key={model._id}>
            <PortfolioListCard model={model} />
            
          </div>
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
