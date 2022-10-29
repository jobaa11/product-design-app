import { Html } from '@react-three/drei';
import { HoodieInstances, Hoodie } from '../../components/Hoodie/Hoodie';
import { SkirtInstances, Skirt } from '../../components/Skirt/Skirt';
import { KicksInstances, Kicks } from '../../components/Kicks/Kicks';
import { WomenShirtInstances, WomenShirt } from '../../components/WomenShirt/WomenShirt';
import { WomenPantsInstances, WomenPants } from '../../components/WomenPants/WomenPants';
import { ShirtInstances, Shirt } from '../../components/Shirt/Shirt';

export default function PortfolioListPage({ model, t }) {



  return (
    <>
      {model.product === '/hoodie/hoodie.gltf' ? (
        <HoodieInstances>
          <Hoodie mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
        </HoodieInstances>
      ) : model.product === '/skirt/skirt.gltf' ? (
        <SkirtInstances>
          <Skirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
        </SkirtInstances>
      ) : model.product === '/kicks/kicks.gltf' ? (
        <KicksInstances>
          <Kicks mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
        </KicksInstances>
      ) : model.product === '/women-shirt/women-shirt.gltf' ? (
        <WomenShirtInstances>
          <WomenShirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
        </WomenShirtInstances>
      ) : model.product === '/shirt/shirt.gltf' ? (
        <ShirtInstances>
          <Shirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
        </ShirtInstances>
      ) : model.product === '/women-pants/women-pants.gltf' ? (
        <WomenPantsInstances>
          <WomenPants scale={4.5} mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
        </WomenPantsInstances>
      ) : (
        <Hoodie mesh={model.mesh} stripes={model.stripes} sole={model.sole} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} />
      )}
      <Html style={{ position: 'relative', right: '20px' }} position-x={Math.cos(t) * 4} position-z={Math.sin(t) * 4} as='div'>
        <a className='edit-link' href={`/portfolio/${model._id}`} style={{ color: 'white', textDecoration: 'none', opacity: '0.6' }}>{model.name}</a>
      </Html>
    </>
  );
}
