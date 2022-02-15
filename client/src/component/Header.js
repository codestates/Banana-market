import React from 'react';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';
import MenuModal from './MenuModal';

const Header = () => {
  return (
    <div>
      <SearchModal></SearchModal>
      <LoginModal></LoginModal>
      <MenuModal></MenuModal>
    </div>
  );
};

export default Header;