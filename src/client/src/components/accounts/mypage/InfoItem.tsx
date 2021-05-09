type Props = {
  title: string;
  value: string;
};

export const InfoItem = ({ title, value }: Props) => {
  return (
    <>
      <div className="flex">
        <div className="mr-6">{title}</div>
        <div>{value}</div>
      </div>
    </>
  );
};
