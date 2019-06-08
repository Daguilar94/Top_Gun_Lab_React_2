import React from 'react';

function ColorCard({
    name,
    isLight,
    lightClass,
    darkClass,
    changeColor,
    deleteColor
}) {
    const colorClassName = isLight ? lightClass : darkClass;
    const colorTone = isLight ? "light" : "dark";
    return (
        <div onClick={changeColor} className={`color-card ${colorClassName}`}>
            <h2>{name}</h2>
            <p>{colorTone}</p>
            <button onClick={deleteColor} className="delete-color">x</button>
        </div>
    );
} 

export default ColorCard;