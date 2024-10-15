import React from 'react';

function Success({ message }) {
  return (
    <div className="alert alert-success">
      {message || 'Operation successful!'}
    </div>
  );
}

export default Success;
