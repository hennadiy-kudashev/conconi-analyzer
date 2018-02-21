import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">{children}</div>
      </div>
    </div>
  );
};

export default Container;
