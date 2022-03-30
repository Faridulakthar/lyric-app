import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './app.css';
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import { ContextController } from './context';

const App = () => {
  return (
    <ContextController>
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Index />} />
            </Routes>
          </div>
        </React.Fragment>
      </Router>
    </ContextController>
  );
};

export default App;
