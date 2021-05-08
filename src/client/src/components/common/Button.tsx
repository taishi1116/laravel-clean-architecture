import React from 'react';

type Props = {
  title: string;
  onClick: () => void;
  disabled: boolean;
};

export const Button = ({ title, onClick, disabled }: Props) => {
  return (
    <div className="text-center">
      <button
        className={`w-full mb-4 flex-wrap lg:w-7/12 h-10 text-white box-border border-2 border-blue-400  rounded-xl bg-blue-400 ${
          disabled ? 'opacity-50' : null
        }`}
        onClick={onClick}
        disabled={disabled ? true : false}
      >
        {title}
      </button>
      <style jsx>{``}</style>
    </div>
  );
};
