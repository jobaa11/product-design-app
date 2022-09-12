import { Link } from "react-router-dom";
import PortfolioListCard from "../../components/PortfolioListCard/PortfolioListCard";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import Lights from "../../components/Lights/Lights";
import state from "../../components/state";

export default function Portfolio({ models }) {
    const domContent = useRef();
    const scrollArea = useRef();
    // const onScroll = (e) => (state.top.current = e.target.scrollTop)
    // useEffect(() => void onScroll({ target: scrollArea.current }), [])

    return (
        <>
            {models.map((model) =>
                <>
                    <Canvas shadows linear camaera={{ position: [0, 0, 120], fov: 70 }}>
                        <OrbitControls />
                        <Suspense fallback={null}>
                            <PortfolioListCard model={model} key={model._id} />
                        </Suspense>
                        <Lights />
                    </Canvas >
                    <div>
                        <div className="scrollArea" ref={scrollArea} >
                            <div style={{ position: 'sticky', top: 0 }} ref={domContent}></div>
                            <div style={{ height: `${state.sections * 100}vh` }}></div>
                        </div>
                    </div>
                    <Link className="links" to={`/portfolio/${model._id}`}>Edit</Link>

                </>
            )}
        </>
    );
}
