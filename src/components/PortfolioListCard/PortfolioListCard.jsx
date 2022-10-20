import { Html } from '@react-three/drei';
import { Jacket } from '../../components/Jacket/Jacket';
import Shoe from '../../components/Shoe/Shoe';
import Sweater from '../../components/Sweater/Sweater';
import Hoodie from '../../components/Hoodie/Hoodie';
import Skirt from '../../components/Skirt/Skirt';
import Kicks from '../../components/Kicks/Kicks';
import WomenShirt from '../../components/WomenShirt/WomenShirt';
import WomenPants from '../../components/WomenPants/WomenPants';
import Shirt from '../../components/Shirt/Shirt';

export default function PortfolioListPage({ model }) {
  return (
    <>
      {model.product === '/shoe/shoe.gltf' ? (
        <Shoe castShadow mesh={model.mesh} />
      ) : model.product === '/jacket/jacket.gltf' ? (
        <Jacket textures={model} />
      ) : model.product === '/sweater/sweater.gltf' ? (
        <Sweater textures={model} />
      ) : model.product === '/hoodie/hoodie.gltf' ? (
        <Hoodie
          mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
      ) : model.product === '/skirt/skirt.gltf' ? (
        <Skirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
      ) : model.product === '/kicks/kicks.gltf' ? (
        <Kicks mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
      ) : model.product === '/women-shirt/women-shirt.gltf' ? (
        <WomenShirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
      ) : model.product === '/shirt/shirt.gltf' ? (
        <Shirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
      ) : model.product === '/women-pants/women-pants.gltf' ? (
        <WomenPants scale={4.5} mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
      ) : (
        <Shoe textures={model} />
      )}
      <Html as='div'>
        <a className='edit-link' href={`/portfolio/${model._id}`} style={{ color: 'white', textDecoration: 'none' }}>edit</a>
      </Html>
    </>
  );
}
