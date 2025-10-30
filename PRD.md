## **1. Ringkasan Produk**

Website Profile Zivana Montessori School adalah website profile company yang bertindak sebagai website perusahaan secara professional dengan tujuan agar dapat mengenalkan dan mempermudah orang untuk mendaftarkan anaknya ke sekolah.

## **2. Tujuan Produk**

### **Tujuan Utama**

- Meningkatkan awareness mengenai TK Zivana Montessori School
- Mempermudah calon orang tua siswa untuk mendaftar di sekolah
- Mengenalkan aktivitas dan perkembangan sekolah ke umum
- Meningkatkan pendaftaran sekolah agar sekolah ramai pendaftar

### **Prinsip Desain**

- **Sederhana dan Ringan:** Antarmuka dirancang agar user tidak mengalami kendala lambat dalam memproses konten dalam website, agar proses pengenalan sekolah bisa menjadi lebih maksimal.
- **Fun, Friendly, tapi Profesional:** Walaupun didesain untuk sekolah TK, nilai professional akan tetap menjadi top priority terlebih dalam hal meyakinkan orang tua siswa untuk percaya menyekolahkan anaknya di TK Zivana Montessori.
- **Informatively Parent-Centered Content:** Informatif terutama pada orang tua, karena memang sasarannya adalah orang tua, orang yang memiliki anak dan butuh untuk masuk ke Taman Kanak Kanak.
- **Simple Navigation & Fast Orientation:** Website perlu dirancang dapat discan setidaknya dalam ukuran umum above the fold, yaitu sekitar 0.05 second, selebihnya untuk final decision dimaksimalkan pada 10 detik pertama untuk ke CTA sebagai standar KPI click through rate.
- **Visual Storytelling:** Website tidak hanya berjalan dengan statik, tapi juga memiliki value yang dalam pada sisi cerita, agar calon pendaftar bisa lebih tertarik.
- **Mobile First Design (Responsive):** Nilai-nilai yang ada pada prinsip desain di atas perlu lebih dibuat compact dalam bentuk mobile responsive, agar tercapai aksesibilitas yang seimbang.

## **3. User Flow**

### **3.1 Calon Pendaftar (Orang Tua)**

```
1. User mengakses website landing page dari Google/Social media
2. User melihat isi konten website
3. User klik tombol CTA
4. User isi form singkat
5. User klik tombol Submit
6. User redirect ke WhatsApp untuk berkomunikasi dengan admin
```

### **3.2 Admin (Back-office)**

```
1. User login ke back-office
2. User dapat mengedit konten pada website (dokumentasi, program sekolah, artikel, karyawan)
3. User dapat memeriksa tren akses pada website
```

## **4. Struktur Halaman & Fitur**

### **4.1 Halaman Homepage (Landing Page)**

**Hero (ATF)**

- Above the fold berisi keunggulan sekolah dibanding sekolah lainnya

**Content**

- Full Image
- Title & Sub-copy
- CTA Button (Sub-focus)
- Keunggulan dibanding sekolah lain (Main Focus)

### **4.2 Halaman Aktivitas Sekolah**

**Kurikulum (Sub-focus)**

- Berisi informasi lengkap mengenai kurikulum yang diimplementasikan pada sekolah

**Program Pembelajaran (Main Focus)**

- Beberapa program unggulan yang tiap bulan dilakukan oleh sekolah
- Grup Dokumentasi per Program Pembelajaran yang bisa dibuka oleh user ke Halaman Galeri Sekolah

**Jadwal Sekolah**

- Berisi jadwal rundown sekolah dari datang hingga pulang sekolah (seminimalnya user bisa tahu sekolah masuk jam berapa dan pulang jam berapa sesuai pembagian kelasnya)

### 4.3 Halaman Profil Sekolah

**Sejarah Singkat Sekolah**

- Berisi penjelasan mengenai kapan dan tujuan sekolah didirikan

**Visi Misi Sekolah**

- Visi dan Misi Sekolah

**Karyawan yang menjabat**

- Daftar karyawan yang menjabat mulai dari kepala sekolah, staf, guru, dan seterusnya.

**Penghargaan Sekolah**

- Beberapa penghargaan yang diraih oleh sekolah dan guru-gurunya

### 4.4 Halaman Artikel/Berita

- Konsepnya seperti newsletter biasa, ada gambar, isi artikel, penulis, dan tanggal rilisnya artikel.

### 4.5 Halaman Pendaftaran

- Form pendaftaran
- Tombol submit whatsapp
- Banner instruksi pendaftaran

### 4.6 Halaman Dashboard (Backoffice)

- Grafik trend akses dashboard
- Tabel Top Access by Device dan Location (Optional)

### 4.7 Halaman Aktivitas Sekolah (Backoffice)

- CRUD Program Sekolah berisi Nama Program dan Penjelasan Program
- CRUD Gambar beserta Caption Gambar dibagi per Program (diambil dari CRUD Program Sekolah)

### 4.8 Halaman Artikel/Berita (Backoffice)

- CRUD Artikel berisi Gambar, Konten Artikel, Nama Penulis

### 4.9 Halaman Manajemen (Backoffice)

- CRUD Karyawan dengan 4 level karyawan (Pimpinan Sekolah, Tenaga Kependidikan, Tenaga Pendidik, dan Tenaga Operasional)
- CRUD Jadwal Sekolah berisi Jam dan Nama Kegiatan
- CRUD Penghargaan Sekolah berisi Gambar untuk ditampilkan pada Carousel Halaman Profil Sekolah
- CRUD Social Media Sekolah berisi Jenis Sosial Media, Nama Akun, dan URL