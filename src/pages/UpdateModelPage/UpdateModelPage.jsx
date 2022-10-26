import { useState, createContext } from 'react';
import ModelDetail from '../../components/ModelDetail/ModelDetail';
import ModelUpdate from '../../components/ModelUpdate/ModelUpdate';

export default function UpdateModelPage({ setUser, models, setModels }) {
  const [showUpdate, setShowUpdate] = useState(true);
  const myModels = createContext();

  return (
    <main style={{ height: "100%" }}>
      <myModels.Provider value={models}>
        {showUpdate ? (
          <ModelDetail
            setUser={setUser}
            models={models}
            setModels={setModels}
          />
        ) : (
          <ModelUpdate
            setUser={setUser}
            models={models}
            setModels={setModels}
            myModels={myModels}
          />
        )}
        <button
          className={showUpdate ? 'design-btn' : "update-model-btn"}
          onClick={() => setShowUpdate(!showUpdate)}
        >
          {showUpdate ? 'Update Design' : 'cancel'}
        </button>
      </myModels.Provider>
    </main>
  );
}
