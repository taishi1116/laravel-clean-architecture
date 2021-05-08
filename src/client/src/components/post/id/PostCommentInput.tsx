import React from 'react';

type Props = {
  inputComment: string;
  setInputComment: React.Dispatch<React.SetStateAction<string>>;
  postHandler: () => Promise<void>;
};

export const PostCommentInput: React.FC<Props> = ({ inputComment, setInputComment, postHandler }) => {
  return (
    <>
      <div className="w-7/12 mx-auto">
        <textarea
          className="w-full border border-gray rounded"
          value={inputComment}
          placeholder="コメントを入力してください"
          onChange={(e) => {
            setInputComment(e.target.value);
          }}
        />
        <button
          className="text-white px-2 box-border border-2 border-blue-400 rounded bg-blue-400"
          onClick={postHandler}
        >
          投稿
        </button>
      </div>
    </>
  );
};
