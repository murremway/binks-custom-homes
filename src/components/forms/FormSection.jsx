import React from "react";

export function FormSection({ title, description, children }) {
  return (
    <div className="space-y-6">
      {(title || description) && (
        <div>
          {title && (
            <h3 className="text-sm font-medium text-[#1a1a2e] tracking-wide uppercase">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-[#1a1a2e]/50 text-sm mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export function FormFieldShell({ label, required, error, children }) {
  return (
    <div>
      <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

export const formInputClassName =
  "border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none h-12";

export const formTextareaClassName =
  "border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none min-h-[150px]";
