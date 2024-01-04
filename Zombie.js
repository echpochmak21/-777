import React, { useEffect, useState } from 'react';

const Zombie = ({ position, velocity }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: '20px',
        height: '20px',
        background: 'green',
      }}
    />
  );
};

export default Zombie;
