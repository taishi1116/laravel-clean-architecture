import React from 'react';
import { SearchInput } from 'src/components/common/SearchInput';

type Props = {
  searchInput: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PostSearchInput = ({ searchInput, onChange }: Props) => {
  return (
    <div className="w-7/12 mx-auto flex">
      <SearchInput
        inputTitle={''}
        placeholder={'記事名入力'}
        required={false}
        inputValue={searchInput}
        onChange={onChange}
      />
    </div>
  );
};
