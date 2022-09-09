import { useState } from 'react';
import ModelDetail from '../../components/ModelDetail/ModelDetail'
import ModelUpdate from '../../components/ModelUpdate/ModelUpdate'

export default function UpdateModelPage({ setUser, models }) {
  const [showUpdate, setShowUpdate] = useState(true);

  return (
    <section>    
        {showUpdate ?
          <ModelDetail setUser={setUser} models={models}/>
          :
          <ModelUpdate setUser={setUser} models={models}/>
        }
        <button className='design-btn' onClick={() => setShowUpdate(!showUpdate)}>
          {showUpdate ? 'Update Design' : 'Cancel Updates'}
        </button>
   
    </section>
  );
}