import React from 'react';

type Props = {
  pagerLength: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const Pager = ({ pagerLength, pageNumber, setPageNumber }: Props) => {
  const pager = [];
  for (let i = 1; i <= pagerLength; i++) {
    pager.push(i);
  }

  return (
    <>
      <div className="wrapper fixed bottom-1 left-2/4">
        {pager.map((i) => (
          <button
            className={`${
              pageNumber === i ? 'text-blue-400 mx-1 outline-none cursor-pointer' : 'mx-1 outline-none cursor-pointer'
            }`}
            key={i}
            onClick={() => {
              setPageNumber(i);
            }}
          >
            {i}
          </button>
        ))}
      </div>
      <style jsx>{`
        .wrapper {
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
};
