import React, { useState } from 'react';
import CustomButton from './CustomButton';
import { menu, search, avatar } from '../assets';
import { navlinks } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import useComponentVisible from '../hooks/use-component-visible';

const NavBar = () => {
  const { account, connectAccounts } = useStateContext();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [isConnecting, setIsConnecting] = useState(false);
  const {
    ref,
    isComponentVisible: toggleDrawer,
    setIsComponentVisible: setToggleDrawer,
  } = useComponentVisible(false);
  const connectionHandler = async () => {
    setIsConnecting(true);
    await connectAccounts();
    setIsConnecting(false);
  };
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for Campaigns"
          className="flex w-full font-epilogue text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#cd4a9d] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={
            account
              ? account.slice(0, 5) + '...' + account.slice(-3)
              : 'Connect Wallet'
          }
          styles={'bg-gradient-to-r from-[#41DFD0] to-[#CD4A9D]'}
          handleClick={() => {
            if (account) navigate('create-campaign');
            else connectionHandler();
          }}
          disabled={isConnecting}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={avatar}
              alt="user"
              className="w-[90%] h-[90%] object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="sm:hidden flex justify-between items-center relative">
        <Link to="/profile">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={avatar}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => {
            setToggleDrawer((prev) => !prev);
          }}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#2a2725f4] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-[0]'
          } transition-all duration-700`}
          ref={ref}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 cursor-pointer ${
                  isActive === link.name && 'bg-[#3a3a43]'
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? 'grayscale-0' : 'grayscale'
                  }`}
                />
                <span
                  className={`ml-4 font-epilogue font-semibold text-[14px] leading-[26px] ${
                    isActive === link.name ? 'text-white' : 'text-[#808091]'
                  } first-letter:capitalize`}
                >
                  {link.name}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex mx-4 ">
            <CustomButton
              btnType="button"
              title={
                account
                  ? account.slice(0, 5) + '...' + account.slice(-3)
                  : 'Connect Wallet'
              }
              styles={'bg-gradient-to-r from-[#41DFD0] to-[#CD4A9D]'}
              handleClick={() => {
                if (account) navigate('create-campaign');
                else connectionHandler();
              }}
              disabled={isConnecting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
