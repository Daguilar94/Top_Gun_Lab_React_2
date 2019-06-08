import React from 'react';

function ColorCard({
    name,
    isLight,
    lightClass,
    darkClass
}) {
    const colorClassName = isLight ? lightClass : darkClass;
    const colorTone = isLight ? "light" : "dark";
    return (
        <div className={`color-card ${colorClassName}`}>
            <h2>{name}</h2>
            <p>{colorTone}</p>
            {/* debajo de esta línea agrega un botón con la clase "delete-color" */}
        </div>
    );
} 

export default ColorCard;