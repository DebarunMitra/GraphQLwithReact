import React , {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import logo from './logo.png';
import './App.css';

import Launches from './Components/Launches';
import Launch from "./Components/Launch";


const client =new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
            src={logo}
            alt="spaceX-logo"
            style={{ display: "block", width: "300", margin: "auto" }}
          />
          <Route exact path="/" component={Launches} />
          <Route path="/launch/:flight_number" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
