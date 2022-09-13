import { Link } from "react-router-dom";
import PortfolioListCard from "../../components/PortfolioListCard/PortfolioListCard";

export default function Portfolio({ models, setModels }) {

    return (
        <>

            {models.map((model) =>
                <div key={model._id}>
                    <PortfolioListCard model={model} />
                    <Link className="links" to={`/portfolio/${model._id}`}>Edit</Link>
                </div>
            )}
        </>
    );
}
