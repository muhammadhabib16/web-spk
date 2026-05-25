"use client";

import { useFormStatus } from "react-dom";

export default function LoginButton() {
  // Hook ini akan mendeteksi status form di atasnya
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-white hover:bg-[#ff003c] disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100 text-black hover:text-white font-black uppercase py-5 transition-all duration-300 mt-4 flex items-center justify-center gap-3 text-lg clip-persona-button skew-x-[-5deg]"
    >
      {pending ? (
        <>
          {/* Ikon Spinner Loading */}
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Otentikasi...
        </>
      ) : (
        "Login"
      )}
    </button>
  );
}
