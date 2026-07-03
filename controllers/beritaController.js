const db=require("../config/db");

// =======================
// GET BERITA
// =======================

exports.getAllBerita=(req,res)=>{

db.query(

"SELECT * FROM berita ORDER BY id DESC",

(err,result)=>{

if(err){

return res.status(500).json(err);

}

res.json(result);

});

};

// =======================
// TAMBAH BERITA
// =======================

exports.tambahBerita = (req, res) => {

    const {
        kategori,
        judul,
        isi,
        penulis,
        tanggal
    } = req.body;

    const gambar = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO berita
        (
            kategori,
            judul,
            isi,
            gambar,
            penulis,
            tanggal
        )
        VALUES (?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            kategori,
            judul,
            isi,
            gambar,
            penulis,
            tanggal
        ],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success:false,
                    message:err.message
                });
            }

            return res.json({
                success:true,
                message:"Berita berhasil ditambahkan"
            });

        }
    );

};


// =======================
// EDIT
// =======================

exports.editBerita = (req, res) => {

    const id = req.params.id;

    const {
        kategori,
        judul,
        isi,
        penulis,
        tanggal
    } = req.body;

    let sql = `
    UPDATE berita
    SET
        kategori=?,
        judul=?,
        isi=?,
        penulis=?,
        tanggal=?
    WHERE id=?
    `;

    let data = [
        kategori,
        judul,
        isi,
        penulis,
        tanggal,
        id
    ];

    // kalau upload gambar baru
    if(req.file){

        sql = `
        UPDATE berita
        SET
            kategori=?,
            judul=?,
            isi=?,
            gambar=?,
            penulis=?,
            tanggal=?
        WHERE id=?
        `;

        data = [
            kategori,
            judul,
            isi,
            req.file.filename,
            penulis,
            tanggal,
            id
        ];

    }

    db.query(sql,data,(err)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            success:true,
            message:"Berita berhasil diupdate"
        });

    });

};

// =======================
// HAPUS
// =======================

exports.hapusBerita = (req,res)=>{

    const id = req.params.id;

    db.query(

        "DELETE FROM berita WHERE id=?",

        [id],

        (err)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"Berita berhasil dihapus"

            });

        }

    );

};