import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean | string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  minLength?: number;
  placeholder?: string;
}

// input template
const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  errors,
  placeholder,
}) => {
  return (
    // if input is price format putt dollar icon left side
    <div className=" w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      {/* input validation here with length and required*/}
      <label
        className={`
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:opacity-0
          ${errors[id] ? "text-rose-500" : "text-zinc-600"}
        `}
      >
        {label}
      </label>
      {id === "email" ? (
        <input
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          {...register(id, {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          type={type}
          className={` peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none 
          transition disabled:opacity-70 disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"} 
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`}
        />
      ) : (
        <input
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          {...register(id, {
            required: `${id} is required`,
            minLength: {
              value: 4,
              message: "min length is 4",
            },
          })}
          type={type}
          className={` peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none 
          transition disabled:opacity-70 disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"} 
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`}
        />
      )}
      {/* input validation error */}
      <p className=" text-red-500">{errors[id]?.message?.toString()}</p>
    </div>
  );
};

export default Input;
