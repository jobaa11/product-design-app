import { useEffect, useState } from "react";
import * as modelsApi from '../../utilities/models-api'
import PortfolioListPage from "../PortfolioListPage/PortfolioListPage";
import PortfolioDetailPage from "../PortfolioDetail/PortfolioDetailPage";
import { Link } from "react-router-dom";


export default function Portfolio() {
    const [models, setModels] = useState([]);




    useEffect(function () {
        async function getModels() {
            const models = await modelsApi.getAll();
            setModels(models);
        }
        getModels();
    }, []);


    return (
        <>

            {models.map((model, idx) =>
                <>
                    <PortfolioListPage model={model} key={idx} />
                    <Link to={`/portfolio/${model._id}`} model={model}>Edit</Link>
                    
                    
                </>
            )}
        </>
    )

}
