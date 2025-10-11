"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type InputPasswordProps = React.ComponentProps<"input"> & {
  customClass?: string;
  type: "email" | "password" | "text" | "number";
};

export const Input = ({
  customClass = "w-full border rounded px-4 py-2",
  type,
  ...props
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "password") {
    return (
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          className={customClass}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    );
  }

  return <input type={type} className={customClass} {...props} />;
};
