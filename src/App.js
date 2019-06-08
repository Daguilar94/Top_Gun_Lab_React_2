import React from 'react';
import './App.css';
import ColorCard from "./components/ColorCard";

const App = () => (
  <div className="App color-cards-container">
    <ColorCard
      name="Blue"
      isLight={false}
      lightClass="color-blue--light"
      darkClass="color-blue"
    />
    <ColorCard
      name="Yellow"
      isLight={false}
      lightClass="color-yellow--light"
      darkClass="color-yellow"
    />
    <ColorCard
      name="Capri"
      isLight={false}
      lightClass="color-Capri--light"
      darkClass="color-Capri"
    />
  </div>
);

export default App;
