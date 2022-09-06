import Scene from "../Scene/Scene";
import { useState } from "react";

export default function NewModelPage(props) {
  const [mesh, setMesh] = useState('#ffffff')
  const [stripes, setStripes] = useState('#C78f8f')
  const [sole, setSole] = useState('#A5CFE1')
  return (
    <>
      <div className='wrapper'>
        <div className='card'>
          <div className="product-canvas">

            <Scene />
          </div>
          <h3> Choose Color</h3>
          <div className='colors'>
            <div>
              <input type="color" id='mesh' name='mesh' value={mesh} onChange={(e) =>setMesh(e.target.value)}/>
              <label htmlFor='mesh'>Main</label>
            </div>
            <div>
              <input type='color' id='stripes' name='stripes' value={stripes} onChange={(e) =>setStripes(e.target.value)}/>
              <label htmlFor="stripes">Stripes</label>
            </div>
            <div>
              <input type='color' id='sole' name='sole' value={sole} onChange={(e) =>setSole(e.target.value)}/>
              <label htmlFor="sole">Sole</label>
            </div>
          </div>

        </div>
      </div>
      <form onSubmit={{}}>
        <label htmlFor='type'></label>
        <inpt name=''></inpt></form>
      <button type="submit">Create Design</button>
    </>
  );
}
