import React, { useState, useEffect, useRef } from 'react';
import Tower from './Tower';
import Zombie from './Zombie';
import './GameBoard.css'; // Импорт файла стилей

const GameBoard = () => {
  const [towers, setTowers] = useState([]);
  const [zombies, setZombies] = useState([]);
  const [experience, setExperience] = useState(0);

  const experienceGainRate = 10;
  const towerCost = 50;
  const zombieSpawnRate = 5000; // Каждые 5 секунд появляется новый зомби
  const gridSize = 100;
  const gameBoardRef = useRef();

  useEffect(() => {
    const experienceInterval = setInterval(() => {
      setExperience((prevExperience) => prevExperience + experienceGainRate);
    }, 1000);

    const zombieInterval = setInterval(() => {
      setZombies((prevZombies) => [
        ...prevZombies,
        {
          id: prevZombies.length + 1,
          position: {
            x: window.innerWidth + 20,
            y: Math.floor(Math.random() * window.innerHeight),
          },
          velocity: { x: -2, y: 0 }, // Просто для примера, можно настроить под вашу логику
        },
      ]);
    }, zombieSpawnRate);

    return () => {
      clearInterval(experienceInterval);
      clearInterval(zombieInterval);
    };
  }, []);

  useEffect(() => {
    const gameLoopInterval = setInterval(() => {
      setZombies((prevZombies) => {
        return prevZombies.map((zombie) => ({
          ...zombie,
          position: {
            x: zombie.position.x + zombie.velocity.x,
            y: zombie.position.y + zombie.velocity.y,
          },
        }));
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoopInterval);
  }, []);

  const placeTower = (event) => {
    const rect = gameBoardRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const cellX = Math.floor(clickX / gridSize);
    const cellY = Math.floor(clickY / gridSize);

    if (experience >= towerCost) {
      setTowers([...towers, { id: towers.length + 1, position: { x: cellX * gridSize, y: cellY * gridSize }, size: { width: gridSize, height: gridSize }, radius: gridSize / 2 }]);
      setExperience((prevExperience) => prevExperience - towerCost);
    }
  };

  return (
    <div ref={gameBoardRef} className="game-board-container" onClick={placeTower}>
      {towers.map((tower) => (
        <Tower key={tower.id} position={tower.position} size={tower.size} radius={tower.radius} />
      ))}

      {zombies.map((zombie) => (
        <Zombie key={zombie.id} position={zombie.position} velocity={zombie.velocity} />
      ))}

      {/* Отображение опыта */}
      <div className="experience-text">
        Experience: {experience}
      </div>
    </div>
  );
};

export default GameBoard;
