import { Html } from '@react-three/drei';
import Hoodie from '../../components/Hoodie/Hoodie';
import Skirt from '../../components/Skirt/Skirt';
import Kicks from '../../components/Kicks/Kicks';
import WomenShirt from '../../components/WomenShirt/WomenShirt';
import WomenPants from '../../components/WomenPants/WomenPants';
import Shirt from '../../components/Shirt/Shirt';

export default function PortfolioListPage({ model, t }) {

  return (
    <>
      {model.product === '/hoodie/hoodie.gltf' ? (
        <Hoodie mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
      ) : model.product === '/skirt/skirt.gltf' ? (
        <Skirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
      ) : model.product === '/kicks/kicks.gltf' ? (
        <Kicks mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
      ) : model.product === '/women-shirt/women-shirt.gltf' ? (
        <WomenShirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
      ) : model.product === '/shirt/shirt.gltf' ? (
        <Shirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
      ) : model.product === '/women-pants/women-pants.gltf' ? (
        <WomenPants scale={4.5} mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
      ) : (
        <Hoodie mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
      )}
      <Html style={{ position: 'relative', right: '20px' }} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} as='div'>
        <a className='edit-link' href={`/portfolio/${model._id}`} style={{ color: 'white', textDecoration: 'none', opacity: '0.6' }}>{model.name}</a>
      </Html>
    </>
  );
}
