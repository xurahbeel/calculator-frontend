import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './components/signin';
import Calculator from './components/calculator';

function App() {
  const [user, setLoggedIn] = useState(undefined);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Calculator user={user} /> : <Signin setLoggedIn={setLoggedIn} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
