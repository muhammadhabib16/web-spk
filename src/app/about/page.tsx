"use client";

import { motion, Variants } from "framer-motion";

// Data Anggota Tim (Warna UI Avatars diseragamkan agar terlihat profesional)
const teamMembers = [
  {
    id: 1,
    name: "Muhammad Habib",
    nim: "2411522024", // Saya tambahkan kembali rolenya yang sempat hilang
    photo:
      "https://ui-avatars.com/api/?name=Muhammad+Habib&background=f1f5f9&color=475569&size=256",
  },
  {
    id: 2,
    name: "Aldo Septia Elvawan",
    nim: "2411522013",
    photo: "/team/Aldo.jpeg",
  },
  {
    id: 3,
    name: "Talitha Nafisa Khairul",
    nim: "2411522007",
    photo:
      "https://ui-avatars.com/api/?name=Talitha+Nafisa&background=f1f5f9&color=475569&size=256",
  },
  {
    id: 4,
    name: "Adinda Najwa Otvatiani",
    nim: "2411523003",
    photo:
      "https://ui-avatars.com/api/?name=Adinda+Najwa&background=f1f5f9&color=475569&size=256",
  },
];

// Konfigurasi Animasi Halus (Smooth Fade In, tidak memantul)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function AboutPage() {
  return (
    // 1. UBAH <main> jadi <div>
    // 2. HAPUS 'bg-gray-50' dan 'overflow-hidden' agar background transparan
    <div className="min-h-screen p-6 sm:p-10 relative flex flex-col items-center font-sans">
      {/* 3. DIV GRADIENT DIHAPUS agar partikel di bagian atas layar tidak tertutup putih */}

      <div className="max-w-5xl w-full relative z-10 space-y-16 pb-20">
        {/* --- HEADER & DESKRIPSI SISTEM --- */}
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mt-8"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold tracking-wider uppercase mb-5 shadow-sm">
            Tentang Aplikasi
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Sistem Penunjang Keputusan{" "}
            <span className="text-blue-600">SAW</span>
          </h1>
          <p className="text-gray-500 text-base leading-relaxed bg-white/50 backdrop-blur-sm p-4 rounded-2xl inline-block border border-white/60 shadow-sm">
            Sistem ini dirancang untuk memberikan rekomendasi pemilihan platform
            E-Commerce Fashion terbaik. Dibangun menggunakan algoritma matematis{" "}
            <strong>Simple Additive Weighting (SAW)</strong>, sistem ini
            mengukur berbagai kriteria untuk menghasilkan <i>leaderboard</i>{" "}
            yang objektif.
          </p>
        </motion.section>

        {/* --- TIM PENGEMBANG --- */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-xl font-bold text-gray-800">Tim Pengembang</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-3 rounded-full opacity-80"></div>
          </motion.div>

          {/* Grid Kartu Anggota yang Bersih dan Minimalis */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-md border border-white/60 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Frame Foto Sederhana */}
                <div className="w-40 h-40 mb-5 overflow-hidden rounded-4xl border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <img
                    src={member.photo}
                    alt={`Foto ${member.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info Anggota */}
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {member.name}
                </h3>

                <div className="bg-gray-50/80 px-3 py-1.5 rounded-md border border-gray-100 w-full group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors duration-300 mt-auto">
                  <p className="text-xs font-mono text-gray-500 group-hover:text-blue-700 tracking-wide transition-colors duration-300">
                    NIM: {member.nim}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
