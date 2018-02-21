import React from 'react';
import Header from './Header';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
