const db = require("../config/db");

// =========================
// TAMPILKAN SDM
// =========================

exports.getAllSDM = (req,res)=>{

    const sql = `
        SELECT *
        FROM sdm
        ORDER BY kategori, urutan
    `;

    db.query(sql,(err,result)=>{

        if(err){

            return res.status(500).json(err);

        }

        res.json(result);

    });

};

// =========================
// TAMBAH SDM
// =========================

exports.tambahSDM = (req,res)=>{

    const {

        kategori,
        nama,
        urutan

    } = req.body;

    const sql = `
        INSERT INTO sdm
        (kategori,nama,urutan)
        VALUES (?,?,?)
    `;

    db.query(

        sql,

        [
            kategori,
            nama,
            urutan
        ],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"SDM berhasil ditambahkan"

            });

        }

    );

};

// =========================
// EDIT SDM
// =========================

exports.editSDM=(req,res)=>{

    const id=req.params.id;

    const{

        kategori,
        nama,
        urutan

    }=req.body;

    const sql=`

    UPDATE sdm

    SET

    kategori=?,

    nama=?,

    urutan=?

    WHERE id=?

    `;

    db.query(

        sql,

        [

            kategori,

            nama,

            urutan,

            id

        ],

        (err)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"Data berhasil diubah"

            });

        }

    );

};

// =========================
// HAPUS SDM
// =========================

exports.hapusSDM=(req,res)=>{

    const id=req.params.id;

    db.query(

        "DELETE FROM sdm WHERE id=?",

        [id],

        (err)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"Data berhasil dihapus"

            });

        }

    );

};