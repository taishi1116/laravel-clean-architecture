type Props = {
  inputTitle: string;
  placeholder: string;
  required: boolean;
  inputValue: string;
  type?: string;
  isDisabledValidate?: boolean;
  validationText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput = ({
  inputTitle,
  placeholder,
  required,
  inputValue,
  type,
  isDisabledValidate,
  validationText,
  onChange,
}: Props) => {
  return (
    <div className="w-full mx-auto mb-4">
      <div className="mb-1">
        <span className="mr-2">{inputTitle}</span>
        {required ? <label className="text-white text-xs p-1 bg-red-400">必須</label> : null}
      </div>
      <input
        type={type ? type : 'text'}
        className="w-full border rounded"
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
      />
      {isDisabledValidate ? null : <span className="text-xs text-red-400">{validationText}</span>}
      <div></div>
      <style jsx>{``}</style>
    </div>
  );
};
