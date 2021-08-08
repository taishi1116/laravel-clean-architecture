import React from 'react';
import Image from 'next/image';

type Props = {
  value: string | ArrayBuffer | null;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ImageInput: React.FC<Props> = ({ value, onchange }) => {
  return (
    <div className="text-center my-8">
      <label>
        {value ? (
          <img className="icon" src={`${value}`} />
        ) : (
          <Image src="/icons/no-image.svg" className="icon" width={75} height={75} />
        )}
        <input className="hidden" type="file" onChange={onchange} accept="image/png, image/jpeg" />
      </label>
      <p className="text-xs mt-4">タップして画像を変更</p>

      <style jsx>{`
        .icon {
          width: 75px;
          height: 75px;
          margin: 0 auto;
          border: 1px solid gray;
          border-radius: 100px;
        }
      `}</style>
    </div>
  );
};
