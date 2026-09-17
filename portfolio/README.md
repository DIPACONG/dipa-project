# Portofolio Diaz Saputra — Fotografi & Kode

Situs portofolio pribadi statis, dibangun dengan HTML + Tailwind CSS (via CDN) + JavaScript murni.
Tanpa proses build — cukup buka atau unggah apa adanya.

## Struktur

```
index.html          Landing page
gallery.html         Galeri foto (filter kategori + lightbox — tugas JavaScript)
projects.html         Daftar proyek kode (filter tag)
about.html            Tentang & kontak
css/style.css         Font, animasi, gaya lightbox & nav mobile
js/main.js            Navigasi mobile + logika filter tab (dipakai bersama)
js/gallery.js         Lightbox galeri: navigasi, keyboard, fokus
```

## Yang perlu Anda ganti sebelum publish

1. **Nama & identitas** — cari-ganti "Diaz Saputra" di semua file `.html`.
2. **Foto** — semua `<img>` memakai placeholder dari `picsum.photos?grayscale`.
   Ganti `src` (dan `data-full` di `gallery.html`) dengan URL foto Anda sendiri,
   atau simpan foto di folder `images/` lalu arahkan path-nya ke sana.
3. **Proyek** — ganti judul, deskripsi, tag teknologi, dan link "Lihat langsung" / "Kode sumber" di `projects.html` dan bagian "Proyek pilihan" di `index.html`.
4. **Kontak** — ganti email, GitHub, dan Instagram di setiap footer serta `about.html`.
5. **Judul tab & meta description** — ada di `<title>` dan `<meta name="description">` tiap halaman.

## Menjalankan secara lokal

Cukup buka `index.html` langsung di peramban, atau jalankan server statis sederhana:

```bash
npx serve .
# atau
python3 -m http.server 8000
```

## Publish ke GitHub Pages

1. Buat repository baru di GitHub, lalu unggah seluruh isi folder ini ke root repo:
   ```bash
   git init
   git add .
   git commit -m "Portofolio awal"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```
2. Di GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pilih branch `main` dan folder `/ (root)`, lalu **Save**.
3. Tunggu 1–2 menit. Situs akan aktif di:
   `https://USERNAME.github.io/NAMA-REPO/`

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
