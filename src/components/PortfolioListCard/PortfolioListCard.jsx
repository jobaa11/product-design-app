import { Jacket } from '../../components/Jacket/Jacket';
import { Html } from '@react-three/drei';
import { Shoe, ShoeInstances } from '../../components/Shoe/Shoe';
import Sweater from '../../components/Sweater/Sweater';


export default function PortfolioListPage({ model }) {


  return (
    <>
    
         
                {model.product === '/shoe/shoe.gltf' ? (
                  // <Sweater/>
                  <ShoeInstances name={model.name} colorOne={model.mesh} colorTwo={model.stripes} colorThree={model.sole} product={model.product}>
                    <Shoe castShadow  />
                    <meshStandardMaterial color={model.mesh} transparent />
                  </ShoeInstances>
                ) : model.product === '/jacket/jacket.gltf' ? (
                  <Jacket textures={model} />
                ) : model.product === '/sweater/sweater.gltf' ? (
                  <Sweater textures={model} />
                ) : (
                  <Shoe textures={model} />
                )}
            

          <Html>
            <a style={{color: 'white'}} className='edit-link' href={`/portfolio/${model._id}`}>
              edit
            </a>
          </Html>
      
    </>
  );
}
