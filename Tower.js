// Tower.js
import React, { useEffect, useState } from 'react';
import Bullet from './Bullet';

const Tower = ({ position, size, radius }) => {
  const [bullets, setBullets] = useState([]);

  useEffect(() => {
    const bulletInterval = setInterval(() => {
      // Автоматическая атака каждую секунду
      fireBullet();
    }, 1000);

    const moveBulletsInterval = setInterval(() => {
      setBullets((prevBullets) => {
        return prevBullets.map((bullet) => ({
          ...bullet,
          position: {
            x: bullet.position.x + bullet.velocity.x,
            y: bullet.position.y + bullet.velocity.y,
          },
        })).filter((bullet) => {
          return (
            bullet.position.x >= 0 &&
            bullet.position.x <= window.innerWidth &&
            bullet.position.y >= 0 &&
            bullet.position.y <= window.innerHeight
          );
        });
      });
    }, 1000 / 60);

    return () => {
      clearInterval(bulletInterval);
      clearInterval(moveBulletsInterval);
    };
  }, []);

  const fireBullet = () => {
    setBullets((prevBullets) => [
      ...prevBullets,
      {
        id: prevBullets.length + 1,
        position: { x: position.x + size.width / 2, y: position.y + size.height / 2 },
        velocity: { x: 5, y: 0 },
      },
    ]);
  };

  return (
    <>
      {bullets.map((bullet) => (
        <Bullet key={bullet.id} position={bullet.position} />
      ))}
      <div
        style={{
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          borderRadius: `${radius}px`,
          background: 'gray',
        }}
      />
    </>
  );
};

export default Tower;
