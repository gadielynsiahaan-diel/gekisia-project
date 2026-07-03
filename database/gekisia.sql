-- =====================================================
-- DATABASE GEKISIA
-- =====================================================

CREATE DATABASE IF NOT EXISTS gekisia;
USE gekisia;

-- =====================================================
-- TABEL KORWIL
-- =====================================================

CREATE TABLE korwil (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    nama_korwil VARCHAR(50) NOT NULL,

    ketua VARCHAR(100),

    sekretaris VARCHAR(100),

    wilayah TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =====================================================
-- TABEL GEREJA
-- =====================================================

CREATE TABLE churches (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    korwil_id INT,

    nama_gereja VARCHAR(150) NOT NULL UNIQUE,

    alamat TEXT,

    pendeta VARCHAR(100),

    telepon VARCHAR(20),

    email VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (korwil_id)
    REFERENCES korwil(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL

);

-- =====================================================
-- TABEL ADMIN
-- =====================================================

CREATE TABLE admins (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    
    username VARCHAR(50) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    nama_lengkap VARCHAR(100) NOT NULL,

    role ENUM('superadmin','admin') NOT NULL,

    church_id INT UNIQUE NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (church_id)
    REFERENCES churches(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL

);

-- ==========================================
-- TABEL BERITA
-- ==========================================

CREATE TABLE berita (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    kategori ENUM(
    'Agenda',
    'Event'
    ) NOT NULL,

    judul VARCHAR(255) NOT NULL,

    isi LONGTEXT NOT NULL,

    gambar VARCHAR(255),

    penulis VARCHAR(100),

    tanggal DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE sdm (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    kategori ENUM(
        'Tenaga Kependetaan',
        'Tenaga Vikaris',
        'Tenaga Orientasi',
        'Tenaga Emeritus'
    ) NOT NULL,

    nama VARCHAR(150) NOT NULL,

    urutan INT NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ==========================================
-- TABEL JEMAAT
-- ==========================================

CREATE TABLE jemaat (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    church_id INT NOT NULL,

    anak INT DEFAULT 0,

    remaja INT DEFAULT 0,

    pemuda INT DEFAULT 0,

    dewasa INT DEFAULT 0,

    lansia INT DEFAULT 0,

    total INT DEFAULT 0,

    tahun YEAR,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(church_id)
    REFERENCES churches(id)
    ON DELETE CASCADE

);

-- =====================================================
-- TABEL GALERI
-- =====================================================

CREATE TABLE galeri (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    church_id INT NOT NULL,

    judul VARCHAR(255),

    gambar VARCHAR(255),

    deskripsi TEXT,

    tanggal DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (church_id)
    REFERENCES churches(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE

);

-- =====================================================
-- TABEL GALERI
-- =====================================================
CREATE TABLE galeri_sinode (

    id INT AUTO_INCREMENT PRIMARY KEY,

    judul VARCHAR(255) NOT NULL,

    gambar VARCHAR(255) NOT NULL,

    deskripsi TEXT,

    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ==========================================
-- TABEL KONTAK
-- ==========================================

CREATE TABLE kontak (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    church_id INT NOT NULL UNIQUE,

    alamat TEXT,

    telepon VARCHAR(30),

    email VARCHAR(100),

    maps TEXT,

    instagram VARCHAR(255),

    facebook VARCHAR(255),

    tiktok VARCHAR(255),

    youtube VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(church_id)
    REFERENCES churches(id)
    ON DELETE CASCADE

);

-- =====================================================
-- TABEL SLIDER
-- =====================================================

CREATE TABLE slider (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    judul VARCHAR(255),

    subtitle TEXT,

    gambar VARCHAR(255),

    urutan INT DEFAULT 1,

    status ENUM('aktif','nonaktif') DEFAULT 'aktif'

);

-- ==========================================
-- PROFIL GEREJA
-- ==========================================

CREATE TABLE profil_gereja (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    church_id INT NOT NULL UNIQUE,

    nama_gereja VARCHAR(150),

    alamat TEXT,

    deskripsi TEXT,

    nama_pendeta VARCHAR(150),

    foto_gereja VARCHAR(255),

    foto_pendeta VARCHAR(255),

    instagram VARCHAR(255),

    facebook VARCHAR(255),

    tiktok VARCHAR(255),

    email VARCHAR(255),

    whatsapp VARCHAR(30),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (church_id)
    REFERENCES churches(id)
    ON DELETE CASCADE

);

-- ==========================================
-- AGENDA
-- ==========================================

CREATE TABLE agenda (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    church_id INT NOT NULL,

    judul VARCHAR(255),

    file_pdf VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (church_id)
    REFERENCES churches(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE

);

-- ==========================================
-- DATA KORWIL
-- ==========================================

INSERT INTO korwil
(nama_korwil)

VALUES

('Korwil I'),
('Korwil II'),
('Korwil III'),
('Korwil IV'),
('Korwil V');

-- ==========================================
-- DATA GEREJA
-- ==========================================

INSERT INTO churches
(korwil_id, nama_gereja)

VALUES

(1,'GEKISIA Palak Bengkerung'),
(1,'GEKISIA Kota Bengkulu'),
(1,'GEKISIA Manna'),
(1,'GEKISIA Tais'),
(1,'GEKISIA Kaur'),
(1,'GEKISIA Sukamaju'),
(1,'GEKISIA Air Petai'),
(1,'GEKISIA Ergatai'),
(1,'GEKISIA Tallo'),
(1,'GEKISIA Pring 7'),
(1,'GEKISIA Talang Jawa'),

(2,'GEKISIA Tanjung Harapan'),
(2,'GEKISIA Sukasari'),
(2,'GEKISIA Arga Makmur'),
(2,'GEKISIA Taba Tembilang'),
(2,'GEKISIA Talang Tirta'),
(2,'GEKISIA Sebayur-Limas'),
(2,'GEKISIA Marga Sakti'),
(2,'GEKISIA Padang Jaya'),
(2,'GEKISIA Tebing Kandang'),
(2,'GEKISIA Ipuh'),
(2,'GEKISIA Air Majunto'),
(2,'GEKISIA Sungai Kiang'),

(3,'GEKISIA Jayaloka'),
(3,'GEKISIA Lubuk Linggau'),
(3,'GEKISIA Belalau'),
(3,'GEKISIA Jaya Bhakti'),
(3,'GEKISIA Dharma Sakti'),
(3,'GEKISIA Sukakarya'),
(3,'GEKISIA Palembang'),
(3,'GEKISIA Seruyan'),

(5,'GEKISIA Depok'),
(5,'GEKISIA Batu Payung'),
(5,'GEKISIA Celengan'),
(5,'GEKISIA Deranuk'),
(5,'GEKISIA Bambuk'),
(5,'GEKISIA Tanjung'),
(5,'GEKISIA Parigi'),
(5,'GEKISIA Jakarta Pusat'),
(5,'GEKISIA Serpong'),
(5,'GEKISIA Jakarta Kramat'),
(5,'GEKISIA Pelabuhan Ratu'),
(5,'GEKISIA Bandung'),
(5,'GEKISIA Makassar'),
(5,'GEKISIA Buol'),
(5,'GEKISIA Natar Lampung'),
(5,'GEKISIA Binuang'),
(5,'GEKISIA RHS 2'),
(5,'GEKISIA Santulangan'),

(4,'GEKISIA Laubekri'),
(4,'GEKISIA Medan'),
(4,'GEKISIA Tembung'),
(4,'GEKISIA Pematang Siantar'),
(4,'GEKISIA Laut Dendang'),
(4,'GEKISIA Batam'),
(4,'GEKISIA Pasir Pangarayan'),
(4,'GEKISIA Muko-Muko');

-- ==========================================
-- ADMIN SINODE
-- ==========================================

INSERT INTO admins
(username,password,nama_lengkap,role,church_id)

VALUES

('sinode','123456','Admin Sinode','superadmin',NULL);

-- ==========================================
-- ADMIN GEREJA
-- ==========================================

INSERT INTO admins
(username,password,nama_lengkap,role,church_id)

VALUES

('palakbengkerung','123456','Admin GEKISIA Palak Bengkerung','admin',1),
('kotabengkulu','123456','Admin GEKISIA Kota Bengkulu','admin',2),
('manna','123456','Admin GEKISIA Manna','admin',3),
('tais','123456','Admin GEKISIA Tais','admin',4),
('kaur','123456','Admin GEKISIA Kaur','admin',5),
('sukamaju','123456','Admin GEKISIA Sukamaju','admin',6),
('airpetai','123456','Admin GEKISIA Air Petai','admin',7),
('ergatai','123456','Admin GEKISIA Ergatai','admin',8),
('tallo','123456','Admin GEKISIA Tallo','admin',9),
('pring7','123456','Admin GEKISIA Pring 7','admin',10),
('talangjawa','123456','Admin GEKISIA Talang Jawa','admin',11),
('tanjungharapan','123456','Admin GEKISIA Tanjung Harapan','admin',12),
('sukasari','123456','Admin GEKISIA Sukasari','admin',13),
('argamakmur','123456','Admin GEKISIA Arga Makmur','admin',14),
('tabatembilang','123456','Admin GEKISIA Taba Tembilang','admin',15),
('talangtirta','123456','Admin GEKISIA Talang Tirta','admin',16),
('sebayurlimas','123456','Admin GEKISIA Sebayur-Limas','admin',17),
('margasakti','123456','Admin GEKISIA Marga Sakti','admin',18),
('padangjaya','123456','Admin GEKISIA Padang Jaya','admin',19),
('tebingkandang','123456','Admin GEKISIA Tebing Kandang','admin',20),
('ipuh','123456','Admin GEKISIA Ipuh','admin',21),
('airmajunto','123456','Admin GEKISIA Air Majunto','admin',22),
('sungaikiang','123456','Admin GEKISIA Sungai Kiang','admin',23),
('jayaloka','123456','Admin GEKISIA Jayaloka','admin',24),
('lubuklinggau','123456','Admin GEKISIA Lubuk Linggau','admin',25),
('belalau','123456','Admin GEKISIA Belalau','admin',26),
('jayabhakti','123456','Admin GEKISIA Jaya Bhakti','admin',27),
('dharmasakti','123456','Admin GEKISIA Dharma Sakti','admin',28),
('sukakarya','123456','Admin GEKISIA Sukakarya','admin',29),
('palembang','123456','Admin GEKISIA Palembang','admin',30),
('seruyan','123456','Admin GEKISIA Seruyan','admin',31),
('depok','123456','Admin GEKISIA Depok','admin',32),
('batupayung','123456','Admin GEKISIA Batu Payung','admin',33),
('celengan','123456','Admin GEKISIA Celengan','admin',34),
('deranuk','123456','Admin GEKISIA Deranuk','admin',35),
('bambuk','123456','Admin GEKISIA Bambuk','admin',36),
('tanjung','123456','Admin GEKISIA Tanjung','admin',37),
('parigi','123456','Admin GEKISIA Parigi','admin',38),
('jakartapusat','123456','Admin GEKISIA Jakarta Pusat','admin',39),
('serpong','123456','Admin GEKISIA Serpong','admin',40),
('jakartakramat','123456','Admin GEKISIA Jakarta Kramat','admin',41),
('pelabuhanratu','123456','Admin GEKISIA Pelabuhan Ratu','admin',42),
('bandung','123456','Admin GEKISIA Bandung','admin',43),
('makassar','123456','Admin GEKISIA Makassar','admin',44),
('buol','123456','Admin GEKISIA Buol','admin',45),
('natarlampung','123456','Admin GEKISIA Natar Lampung','admin',46),
('binuang','123456','Admin GEKISIA Binuang','admin',47),
('rhs2','123456','Admin GEKISIA RHS 2','admin',48),
('santulangan','123456','Admin GEKISIA Santulangan','admin',49),
('laubekri','123456','Admin GEKISIA Laubekri','admin',50),
('medan','123456','Admin GEKISIA Medan','admin',51),
('tembung','123456','Admin GEKISIA Tembung','admin',52),
('pematangsiantar','123456','Admin GEKISIA Pematang Siantar','admin',53),
('lautdendang','123456','Admin GEKISIA Laut Dendang','admin',54),
('batam','123456','Admin GEKISIA Batam','admin',55),
('pasirpangarayan','123456','Admin GEKISIA Pasir Pangarayan','admin',56),
('mukomuko','123456','Admin GEKISIA Muko-Muko','admin',57);

-- ==========================================
-- DATA SLIDER
-- ==========================================

INSERT INTO slider
(judul, subtitle, gambar, urutan, status)

VALUES

(
'Selamat Datang di GEKISIA',
'Gereja Kristen Injili di Indonesia',
'slider1.jpg',
1,
'aktif'
),

(
'Bertumbuh Dalam Kristus',
'Menjadi Gereja yang Bertumbuh, Mandiri dan Menjadi Berkat',
'slider2.jpg',
2,
'aktif'
),

(
'Kasih Kristus Mempersatukan',
'Bersama Melayani Tuhan dan Sesama',
'slider3.jpg',
3,
'aktif'
);

-- ==========================================
-- DATA KONTAK
-- ==========================================

INSERT INTO kontak
(
church_id,
alamat,
telepon,
email,
maps,
instagram,
facebook,
tiktok,
youtube
)

SELECT

id,

'-',

'-',

'-',

'-',

'',

'',

'',

''

FROM churches;

-- ==========================================
-- DATA JEMAAT
-- ==========================================

INSERT INTO jemaat
(
church_id,
anak,
remaja,
pemuda,
dewasa,
lansia,
total,
tahun
)

SELECT

id,

0,

0,

0,

0,

0,

0,

2026

FROM churches;

INSERT INTO sdm
(kategori,nama,urutan)

VALUES

('Tenaga Kependetaan','Pdt. Wesly Siahaan, S.T., S.Th.',1);

INSERT INTO berita
(
    kategori,
    judul,
    isi,
    gambar,
    penulis,
    tanggal
)
VALUES
(
    'Agenda',
    'Youth Camp 2027',
    'Isi berita',
    'agenda.pdf',
    'Admin Sinode',
    '2027-06-27'
);


INSERT INTO profil_gereja
(
church_id,
nama_gereja,
alamat,
deskripsi,
nama_pendeta,
foto_gereja,
foto_pendeta,
instagram,
facebook,
tiktok,
email,
whatsapp
)

SELECT

id,

nama_gereja,

'-',

'-',

'-',

'default-gereja.jpg',

'default-pendeta.jpg',

'',

'',

'',

'',

''

FROM churches;

INSERT INTO agenda
(
church_id,
judul,
file_pdf
)

SELECT

id,

'Belum ada Warta',

''

FROM churches;

INSERT INTO galeri
(
church_id,
judul,
gambar,
deskripsi
)

SELECT

id,

'Belum ada Galeri',

'default.jpg',

''

FROM churches;