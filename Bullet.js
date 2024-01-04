import React from 'react';

const Bullet = ({ position }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        background: 'red',
      }}
    />
  );
};

export default Bullet;
