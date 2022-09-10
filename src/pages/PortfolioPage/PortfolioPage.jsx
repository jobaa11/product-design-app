import { Link } from "react-router-dom";
import PortfolioListCard from "../../components/PortfolioListCard/PortfolioListCard";


export default function Portfolio({models}) {

    return (
        <>
            {models.map((model, idx) =>
                <>
                    <PortfolioListCard model={model} key={model._id} /> 
                    <Link to={`/portfolio/${model._id}`}>Edit</Link> 
                </>
            )}
        </>
    );
}
