import React from "react";
import "./App.css";
import login from './Components/log/login'
import createNew from './Components/log/createNew'

class App extends React.Component{

  render(){
    return(
      <div>
        <div src={login}> </div>
        <button title="Create an account." src={createNew}/>
         
      </div>
    );
    
    
  }
  
}
    

export default App;
//npm start compiles and opens app in localhost
