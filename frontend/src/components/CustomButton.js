import React from 'react';

const CustomButton = ({ btnType, title, handleClick, styles, disabled }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-black min-h-[52px] px-4 rounded-[10px] ${styles} ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      {disabled ? 'Connecting...' : title}
    </button>
  );
};

export default CustomButton;
