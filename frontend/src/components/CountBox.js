import React from 'react';

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px] bg-[#2a2725ff] rounded-md">
      <h4 className="font-epilogue font-bold text-[38px] p-3 bg-gradient-to-r from-[#41DFD0] to-[#CD4A9D] rounded-t-[10px] w-full text-center truncate text-transparent bg-clip-text">
        {value}
      </h4>
      <p className="font-epilogue font-normal text-[16px] test-[#808191]  px-3 py-3 w-full rounded-b-[10px] text-center">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
