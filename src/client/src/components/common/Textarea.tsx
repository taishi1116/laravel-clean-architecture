type Props = {
  textAreaTitle: string;
  placeholder: string;
  textAreaInput: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextArea = ({ textAreaTitle, placeholder, textAreaInput, onChange, required }: Props) => {
  return (
    <>
      <div className="w-full h-3/5 mx-auto mb-4">
        <div className="mb-1">
          <span className="mr-2">{textAreaTitle}</span>
          {required ? <label className="text-white text-xs p-1 bg-red-400 ">必須</label> : null}
        </div>
        <textarea
          className="w-full border rounded input-height"
          placeholder={placeholder}
          value={textAreaInput}
          onChange={onChange}
        ></textarea>
        <style jsx>{`
          .input-height {
            height: 70vh;
          }
        `}</style>
      </div>
    </>
  );
};
