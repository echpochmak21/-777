import React, { useState, useEffect, useRef } from 'react';
import Tower from './Tower';
import Zombie from './Zombie';
import './GameBoard.css'; // Import the styles file

const GameBoard = () => {
    const [towers, setTowers] = useState([]);
    const [zombies, setZombies] = useState([]);
    const [experience, setExperience] = useState(0);

    const EXPERIENCE_GAIN_RATE = 10;
    const TOWER_COST = 50;
    const ZOMBIE_SPAWN_RATE = 5000; // Every 5 seconds a new zombie appears
    const GRID_SIZE = 110;
    const gameBoardRef = useRef();

    useEffect(() => {
        // Experience gain interval
        const experienceInterval = setInterval(() => {
            setExperience((prevExperience) => prevExperience + EXPERIENCE_GAIN_RATE);
        }, 1000);

        // Zombie spawn interval
        const zombieInterval = setInterval(() => {
            setZombies((prevZombies) => [
                ...prevZombies,
                {
                    id: prevZombies.length + 1,
                    position: {
                        x: window.innerWidth + 20,
                        y: Math.floor(Math.random() * window.innerHeight),
                    },
                    velocity: { x: -2, y: 0 },
                },
            ]);
        }, ZOMBIE_SPAWN_RATE);

        // Cleanup intervals on component unmount
        return () => {
            clearInterval(experienceInterval);
            clearInterval(zombieInterval);
        };
    }, []);

    useEffect(() => {
        // Game loop interval for zombie movement
        const gameLoopInterval = setInterval(() => {
            setZombies((prevZombies) =>
                prevZombies.map((zombie, index) => ({
                    ...zombie,
                    id: index + 1,
                    position: {
                        x: zombie.position.x + zombie.velocity.x,
                        y: zombie.position.y + zombie.velocity.y,
                    },
                }))
            );
        }, 1000 / 60);

        // Cleanup game loop interval on component unmount
        return () => clearInterval(gameLoopInterval);
    }, []);

    useEffect(() => {
        // Handle window resize to update zombie positions
        const handleResize = () => {
            setZombies((prevZombies) =>
                prevZombies.map((zombie) => ({
                    ...zombie,
                    position: {
                        x: window.innerWidth + 20,
                        y: Math.floor(Math.random() * window.innerHeight),
                    },
                }))
            );
        };

        window.addEventListener('resize', handleResize);

        // Cleanup resize event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const placeTower = (event) => {
        if (!gameBoardRef.current) return;

        const rect = gameBoardRef.current.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        const cellX = Math.floor(clickX / GRID_SIZE);
        const cellY = Math.floor(clickY / GRID_SIZE);

        if (experience >= TOWER_COST) {
            setTowers((prevTowers) => [
                ...prevTowers,
                {
                    id: prevTowers.length + 1,
                    position: { x: cellX * GRID_SIZE, y: cellY * GRID_SIZE },
                    size: { width: GRID_SIZE, height: GRID_SIZE },
                    radius: GRID_SIZE / 2,
                },
            ]);
            setExperience((prevExperience) => prevExperience - TOWER_COST);
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

            {/* Display experience */}
            <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
                Experience: {experience}
            </div>
        </div>
    );
};

export default GameBoard;
