import React from 'react';

const Slider = ({ value, onChange }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <span className="text-xl mr-2">{value}</span>
      <input
        type="range"
        min="1"
        max="24"
        value={value}
        onChange={onChange}
        className="w-64"
      />
    </div>
  );
};

export default Slider;
