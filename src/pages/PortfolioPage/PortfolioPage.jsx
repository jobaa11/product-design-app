import { Link } from "react-router-dom";
import PortfolioListCard from "../../components/PortfolioListCard/PortfolioListCard";

export default function Portfolio({ models, setModels }) {

    // console.log(models, 'models')
    return (
        <>
            {models.map((model) =>
                <div key={model._id}>
                    <PortfolioListCard model={model}  />
                    <Link className="links" to={`/portfolio/${model._id}`}>Edit</Link>
                </div>
            )}
        </>
    );
}
