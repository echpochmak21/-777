import React from 'react';

const Zombie = ({ position, velocity, size = 20 }) => {
    return (
        <div
            className="zombie" // Добавлен CSS-класс
            style={{
                position: 'absolute',
                top: `${position.y}px`,
                left: `${position.x}px`,
                width: `${size}px`, // Использование параметра size
                height: `${size}px`,
                background: 'green',
            }}
        />
    );
};

export default Zombie;
