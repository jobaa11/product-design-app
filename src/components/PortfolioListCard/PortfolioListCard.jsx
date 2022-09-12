import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import Lights from "../../components/Lights/Lights";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
// import { Jacket } from "../../components/Jacket/Jacket";
import Sweater from "../../components/Sweater/Sweater";
// import { Shoe, ShoeInstances } from "../../components/Shoe/Shoe";

import { Section } from '../../components/Section/Section'


export const Jacket = ({ modelPath, props, model }) => {
    const meshes = useRef(null);
    useFrame(() => (meshes.current.rotation.y += 0.006));
    const { nodes, materials } = useGLTF(modelPath)
    return (
        <group {...props} dispose={null} ref={meshes}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]} scale={1}>
                    <mesh castShadow geometry={nodes.jacket_low_Fabric_0.geometry} material-color={model.mesh} />
                    <mesh castShadow geometry={nodes.zipper_tab_low_Metal_0.geometry} material={materials.Metal} />
                    <mesh castShadow geometry={nodes.zipper_slider_low_Metal_0.geometry} material={materials.Metal} />
                </group>
            </group>
        </group>
    );
}
useGLTF.preload('/jacket/jacket.gltf')



const FullPlane = ({ bgColor, domContent, children, modelPath, positionY, model }) => {
    // const [refItem, inView] = useInView({
    //     threshold: 0
    // })

    // useEffect(() => {
    //     inView && (document.body.style.background = bgColor)
    // })
    // const ref = useRef();
    // useFrame(() => (ref.current.rotation.y += 0.01));
    return (
        <>
            <Section factor={1.5}>
                <group position={[0, positionY, 0]}>
                    {/* middle was at positionY */}
                    <mesh position={[0, 2.2, -2.5]}>
                        {/* middle 0 was at -35 */}
                        <Jacket modelPath={modelPath} model={model} />
                        {/* <Sweater /> */}
                    </mesh>
                    <Html portal={domContent} fullscreen><div>{children}</div></Html>
                </group>
            </Section>
        </>
    )
}


export default function PortfolioListCard({ model }) {


    return (
        <>

                    <FullPlane modelPath='/jacket/jacket.gltf' positionY={-2} model={model}>
                        <div className="container">
                            <h1 style={{ color: 'white' }} className="title">{model.name}</h1>
                            <h1 style={{ color: 'white' }} className="title">{model.description}</h1>
                        </div>
                    </FullPlane>

  
        </>
    )
}

// export {Jacket, FullPlane}