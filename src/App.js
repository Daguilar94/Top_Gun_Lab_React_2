import React, { Component } from 'react';
import './App.css';
import ColorCard from "./components/ColorCard";
import { COLORS } from "./mocked-data/colors";

class App extends Component {
  state = {
    colors: COLORS
  }

  changeTone = (id) => {
    this.setState((prevState) => {
      const oldColors = prevState.colors;
      return ({
        colors: oldColors.map(color => {
          const isSelectedColor = color.id === id;
          return (
            isSelectedColor
            ? { ...color, isLight: !color.isLight }
            : color
          );
        })
      })
    })
  }

  deleteColor = (e, id) => {
    e.stopPropagation();
    console.log(id)
    this.setState((prevState) => {
      const oldColors = prevState.colors;
      return ({
        colors: oldColors.filter(color => color.id !== id)
      })
    })
  }

  render() {
    const { colors } = this.state;
    return (
      <div className="App">
        <h1 className="color-cards__title">COLOR CARDS</h1>
        <main className="color-cards-container">
          {colors.map(color => (
            <ColorCard
              key={color.id}
              changeColor={() => this.changeTone(color.id)}
              deleteColor={(e) => this.deleteColor(e, color.id)}
              {...color}
            />
          ))}
        </main>
      </div>
    );
  }
}

export default App;
