import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Router from './navigation/Router';

function App() {
  return (
    <div className="App">
        <Router/>
    </div>
  );
}

export default App;
