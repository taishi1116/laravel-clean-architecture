import React from 'react';

type Props = {
  currentPage: number;
  lastPage: number;
  handleClickPreOrNextArticle: (pageNumber: number) => void;
};

export const Pager: React.FC<Props> = ({ currentPage, lastPage, handleClickPreOrNextArticle }) => {
  return (
    <>
      <div className="wrapper fixed bottom-1 left-2/4">
        {currentPage != 1 && (
          <button className={``} onClick={() => handleClickPreOrNextArticle(currentPage - 1)}>
            前へ
          </button>
        )}

        {currentPage < lastPage && (
          <button className={``} onClick={() => handleClickPreOrNextArticle(currentPage + 1)}>
            次へ
          </button>
        )}
      </div>
      <style jsx>{`
        .wrapper {
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
};
