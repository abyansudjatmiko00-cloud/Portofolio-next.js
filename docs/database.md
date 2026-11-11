
# Dokumentasi Database Portofolio

Database menggunakan Supabase (PostgreSQL).

## 1. Tabel projects

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| id | int8 | Primary Key, otomatis |
| created_at | timestamptz | Waktu dibuat |
| slug | text | Identitas unik proyek |
| judul | text | Nama proyek |
| deskripsi | text | Deskripsi proyek |
| kategori | text | Kategori proyek |
| minggu | text | Minggu pengerjaan |
| fitur | text[] | Daftar fitur proyek |
| gambar_url | text | Lokasi gambar proyek |

## 2. Tabel messages

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| id | int8 | Primary Key, otomatis |
| created_at | timestamptz | Waktu dibuat |
| nama | text | Nama pengirim |
| email | text | Email pengirim |
| pesan | text | Isi pesan |

## 3. Tabel skills

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| id | int8 | Primary Key, otomatis |
| created_at | timestamptz | Waktu dibuat |
| nama | text | Nama keterampilan |
| level | text | Tingkat kemampuan |

## 4. Keamanan Database

- Database menggunakan Supabase.
- Row Level Security (RLS) digunakan untuk mengatur akses data.
- Tabel projects dan skills dapat diberikan kebijakan akses baca publik.
- Tabel messages tidak diberikan akses baca publik.
- Publishable key digunakan untuk akses dari aplikasi.
- Secret key tidak boleh dibagikan atau dimasukkan ke GitHub.
