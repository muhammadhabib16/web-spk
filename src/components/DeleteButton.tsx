"use client";

import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      type="submit"
      disabled={pending}
      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
        pending
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "text-red-600 hover:text-red-700 hover:bg-red-50"
      }`}
    >
      {pending ? "Menghapus..." : "Hapus"}
    </motion.button>
  );
}
