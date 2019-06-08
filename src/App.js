import React, { Component } from 'react';
import './App.css';
import ColorCard from "./components/ColorCard";
import { COLORS } from "./mocked-data/colors";

class App extends Component {
  state = {
    colors: COLORS,
    filterText: "",
    nameText: "",
    lightClassText: "",
    darkClassText: "",
    isLight: false
  }

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
      isLight: false
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
        colors: oldColors.filter(color => color.id !== id)
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
      isLight
    } = this.state;

    const filteredColors = colors.filter(color => color.name.includes(filterText));

    return (
      <div className="App">
        <h2 className="window-width"><span>width:</span> px</h2>
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
          {filteredColors.map(color => (
            <ColorCard
              key={color.id}
              changeColor={() => this.changeTone(color.id)}
              deleteColor={(e) => this.deleteColor(e, color.id)}
              {...color}
            />
          ))}
        </main>
        <h3 className="warning-msg">
          Hey Hey! Watch out
          <span role="img" aria-label="angry-face">😠</span>
        </h3>
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

// -----------------------------------------------------------------

// 1. Crea un nuevo key en el estado del componente llamado "windowWidth"
// e inicialízalo en el número de pixeles de ancho que tiene el viewPort
// en ese momento.
// PISTA: Usa la propiedad "innerWidth" del objeto window para
//        obtener el ancho de la pantalla.

// 2. En el h2 con clase "window-width" poner el valor del ancho que se
// creó en el estado en el punto anterior.

// 3. crear un método del componente en el cual se actualice la propiedad
// "windowWidth" del estado con el ancho de pantalla actual.

// 4. una vez se monte el componente comenzar a escuchar cuando la
// pantalla cambie de tamaño y cuando esto pase, se debe llamar la función
// creada en el punto anterior, de modo que se vea en tiempo real
// el ancho actual de la ventana en el h2 con clase "window-width".
// PISTA: Usar el evento "resize".

// 5. Se debe remover este listener de la ventana cuando el componente
// se vaya a desmontar. No tiene sentido seguir escuchando si
// el componente no está.

// 6. Crear un nuevo key en el estado llamado "showWarningMessage" e
// inicianízalo en false.

// 7. Renderiza el mensaje contenido en el h3 con clase "warning-msg" siempre
// y cuando el valor de "showWarningMessage" en el estado sea true.

// 8. Verifica cuando se ha creado o eliminado un "ColorCard" y actualiza
// el valor de "showWarningMessage" en el estado cuando esto suceda.

// 9. El mensaje debe desaparecer si el usuario hace una acción diferente
// a crear o eliminar un "ColorCard"