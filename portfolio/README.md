

## Publish ke Vercel

1. Push folder ini ke repository GitHub (langkah sama seperti di atas).
2. Buka [vercel.com](https://vercel.com) → **Add New → Project** → pilih repo tersebut.
3. Framework Preset: pilih **Other** (situs ini statis, tidak perlu build command / output directory khusus).
4. Klik **Deploy**. Vercel akan memberi URL seperti `https://nama-repo.vercel.app`.

Alternatif tercepat tanpa GitHub: buka [vercel.com/new](https://vercel.com/new), gunakan opsi
**drag-and-drop folder** lalu seret folder proyek ini langsung ke halaman tersebut.

## Catatan aksesibilitas & responsif

- Navigasi mobile berupa menu layar penuh yang dapat dibuka/tutup dengan tombol hamburger atau tombol `Esc`.
- Lightbox galeri mendukung navigasi keyboard (`←` `→` `Esc`) dan mengembalikan fokus ke gambar yang diklik saat ditutup.
- Semua tata letak diuji pada lebar mobile (~360px), tablet, dan desktop menggunakan grid yang menyesuaikan (`grid-cols-2` → `md:grid-cols-3`, dst).
- Gerakan/animasi menghormati preferensi `prefers-reduced-motion`.
