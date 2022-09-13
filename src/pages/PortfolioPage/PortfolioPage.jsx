import { Link } from "react-router-dom";
import PortfolioListCard from "../../components/PortfolioListCard/PortfolioListCard";

export default function Portfolio({ models, setModels }) {

    // console.log(models, 'models')
    return (
        <>
            {models.map((model) =>
                <>
                    <PortfolioListCard model={model} key={model._id} />
                    <Link className="links" to={`/portfolio/${model._id}`}>Edit</Link>
                </>
            )}
        </>
    );
}
