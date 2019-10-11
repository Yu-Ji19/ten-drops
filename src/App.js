import React from 'react';

import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from "./components/Table";

class App extends React.Component{
  render(){
    return (
      <div className="App">
          <Table/>
      </div>
    );
  }
}

export default App;
