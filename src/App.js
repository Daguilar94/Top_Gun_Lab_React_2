import React, { Component } from 'react';
import './App.css';
import ColorCard from "./components/ColorCard";
import axios from "axios";

class App extends Component {
  state = {
    colors: [],
    filterText: "",
    nameText: "",
    lightClassText: "",
    darkClassText: "",
    isLight: false,
    windowWidth: window.innerWidth,
    showWarningMessage: false,
    fetchError: false,
    error: ""
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateWidth);
    axios.get('http://localhost:3004/colors')
      .then(response => {
        this.setState({
          colors: response.data,
          fetchError: false,
          error: ""
        })
      })
      .catch(error => {
        this.setState({ fetchError: true, error: error.message });
      })
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWidth)
  }

  componentDidUpdate = (_, prevState) => {
    const {
      colors: prevColors
    } = prevState;

    const {
      colors,
      showWarningMessage
    } = this.state;

    const sameLength = prevColors.length === colors.length;

    if (sameLength && showWarningMessage) {
      this.setState({ showWarningMessage: false })
    }
  }

  updateWidth = () => this.setState({ windowWidth: window.innerWidth });

  handleTextChange = (e, keyText) => {
    const value = e.target.value;
    this.setState({ [keyText]: value })
  }

  handleIsLight = (e) => {
    const value = e.target.checked;
    this.setState({ isLight: value })
  }

  createColor = (e) => {
    e.preventDefault();
    const {
      nameText: name,
      lightClassText: lightClass,
      darkClassText: darkClass,
      isLight
    } = this.state;

    const newColor = {
      id: Math.random(),
      name,
      isLight,
      darkClass,
      lightClass
    }
    
    this.setState(prevState => ({
      colors: prevState.colors.concat(newColor),
      nameText: "",
      lightClassText: "",
      darkClassText: "",
      isLight: false,
      showWarningMessage: true
    }))
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
    this.setState((prevState) => {
      const oldColors = prevState.colors;
      return ({
        colors: oldColors.filter(color => color.id !== id),
        showWarningMessage: true
      })
    })
  }

  render() {
    const {
      colors,
      filterText,
      nameText,
      lightClassText,
      darkClassText,
      isLight,
      windowWidth,
      showWarningMessage,
      fetchError,
      error
    } = this.state;
    
    const filteredColors = colors.filter(color => color.name.includes(filterText));

    return (
      <div className="App">
        <h2 className="window-width"><span>width:</span> {windowWidth} px</h2>
        <h1 className="color-cards__title">COLOR CARDS</h1>
        <div className="filter-container">
          <input
            onChange={(e) => this.handleTextChange(e, "filterText")}
            placeholder="Filter by color name"
            className="filter-field"
            type="text"
            value={filterText}
          />
        </div>
        <main className="color-cards-container">
          {fetchError &&
            <p className="error">
              There was an error fetching colors
              <span
                className="icon"
                role="img"
                aria-label="angry-face"
              >
                😔
              </span>
              {error}
            </p>
          }
          {filteredColors.map(color => (
            <ColorCard
              key={color.id}
              changeColor={() => this.changeTone(color.id)}
              deleteColor={(e) => this.deleteColor(e, color.id)}
              {...color}
            />
          ))}
        </main>
        {showWarningMessage &&
          <h3 className="warning-msg">
            Hey Hey! Watch out
            <span
              className="icon"
              role="img"
              aria-label="angry-face"
            >
              😠
            </span>
          </h3>
        }
        <h2 className="create-color-title">Create a color!</h2>
        <form className="create-color-form" onSubmit={this.createColor}>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => this.handleTextChange(e, "nameText")}
            value={nameText}
          />
          <input
            type="text"
            placeholder="light class"
            onChange={(e) => this.handleTextChange(e, "lightClassText")}
            value={lightClassText}
          />
          <input
            type="text"
            placeholder="dark class"
            onChange={(e) => this.handleTextChange(e, "darkClassText")}
            value={darkClassText}
          />
          <input
            name="is-light"
            type="checkbox"
            className="is-light-checkbox"
            onChange={this.handleIsLight}
            checked={isLight}
          />
          <label htmlFor="is-light">Is light</label>
          <button type="submit" className="create-color">Create!</button>
        </form>
      </div>
    );
  }
}

export default App;
