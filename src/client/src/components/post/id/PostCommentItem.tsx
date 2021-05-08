type Props = {
  name: string;
  comment: string;
  commentTime: string;
};

export const PostCommentItem = ({ name, comment, commentTime }: Props) => {
  return (
    <>
      <div className={'flex justify-between mb-2'}>
        <div>{name}</div>
        <div className={'text-gray-400'}>{commentTime}</div>
      </div>
      <div className={'whitespace-pre-wrap'}>{comment}</div>
    </>
  );
};
