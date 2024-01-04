import React, { useEffect, useState } from 'react';
import bulletImage from '../images/bullet.png'; // Adjust the path based on your project structure

const Bullet = ({ position }) => {
    const [bulletPosition, setBulletPosition] = useState(position);

    useEffect(() => {
        const bulletInterval = setInterval(() => {
            // Update the bullet position based on the velocity
            setBulletPosition((prevPosition) => ({
                x: prevPosition.x + 5, // Adjust the velocity as needed
                y: prevPosition.y,
            }));
        }, 1000 / 60);

        return () => clearInterval(bulletInterval);
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: `${bulletPosition.y}px`,
                left: `${bulletPosition.x}px`,
                width: '20px', // Adjust the size as needed
                height: '20px',
                backgroundImage: `url(${bulletImage})`,
                backgroundSize: 'cover',
            }}
        />
    );
};

export default Bullet;
