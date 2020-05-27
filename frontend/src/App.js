import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import NotesList from "./components/NotesList";
import CreateNote from "./components/CreateNote";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <Navigation />
      <Route path="/" exact component={NotesList} />
      <Route path="/user" component={CreateUser} />
      <Route path="/create" component={CreateNote} />
      <Route path="/edit/:id" component={CreateNote} />
    </Router>
  );
}

export default App;
