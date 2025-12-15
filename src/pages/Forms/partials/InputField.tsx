import type {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";

type InputFieldProps<TFormValues extends FieldValues> = {
  label: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
  placeholder?: string;
  type?: string;
};

const InputField = <TFormValues extends FieldValues>({
  label,
  name,
  register,
  error,
  placeholder = "",
  type = "text",
}: InputFieldProps<TFormValues>) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name as string}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={name as string}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`mt-1 block w-full px-4 py-2 border rounded-md 
          focus:ring-blue-500 focus:border-blue-500
          ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
