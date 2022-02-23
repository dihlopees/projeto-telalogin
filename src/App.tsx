import React from "react";
import RotaExterna from "routes/externalRoutes";
import RotaInterna from "routes/internalRoutes";


// import Rota from './routes';

function App() {

  function getToken(){
    console.log(localStorage.getItem("token"))
    return localStorage.getItem("token")
    
  }
  

  return (
    <div>
      {getToken() ? <RotaInterna /> : <RotaExterna />}

      {/* <Rota/> */}
    </div>
  );
}

export default App;
