import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { icon?: ReactNode; error?: string }
>(({ icon, error, className = "", ...props }, ref) => {
  return (
    <div>
      <div className="relative">
        <input
          ref={ref}
          className={`w-full rounded-lg border ${
            error ? "border-red-400" : "border-tw-border"
          } bg-white px-4 py-2.5 text-sm text-tw-ink placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-tw-red/30 focus:border-tw-red ${
            icon ? "pr-10" : ""
          } ${className}`}
          {...props}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";
