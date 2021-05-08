import React from 'react';

export const Loading = () => {
  return (
    <>
      <div className="fixed">loading</div>
      <style jsx>{`
        div {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
};
