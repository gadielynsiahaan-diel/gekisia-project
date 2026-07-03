const db = require("../config/db");

// =======================
// GET GALERI SINODE
// =======================

exports.getAllGaleri = (req, res) => {

    db.query(

        `
        SELECT *
        FROM galeri_sinode
        ORDER BY id DESC
        `,

        (err, result) => {

            if(err){

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

};

// =======================
// TAMBAH GALERI
// =======================

exports.tambahGaleri = (req,res)=>{

    console.log("BODY :", req.body);
    console.log("FILE :", req.file);

    const { judul, deskripsi } = req.body;

    if(!req.file){

        return res.status(400).json({

            success:false,
            message:"Silakan upload gambar."

        });

    }

    db.query(

        `
        INSERT INTO galeri_sinode
        (
            judul,
            gambar,
            deskripsi
        )
        VALUES (?,?,?)
        `,

        [

            judul,
            req.file.filename,
            deskripsi

        ],

        (err, result) => {

            if (err) {

                console.log("===== ERROR INSERT =====");
                console.log(err);

                return res.status(500).json({
                    success:false,
                    message: err.sqlMessage,
                    code: err.code
                });

            }

            console.log("INSERT BERHASIL");

            res.json({
                success:true,
                message:"Galeri berhasil ditambahkan"
            });

        }

    );

};

// =======================
// EDIT
// =======================

exports.editGaleri=(req,res)=>{

    const id=req.params.id;

    const{

        judul,
        deskripsi

    }=req.body;

    let sql;
    let data;

    if(req.file){

        sql=`

        UPDATE galeri_sinode

        SET

        judul=?,
        gambar=?,
        deskripsi=?

        WHERE id=?

        `;

        data=[

            judul,
            req.file.filename,
            deskripsi,
            id

        ];

    }

    else{

        sql=`

        UPDATE galeri_sinode

        SET

        judul=?,
        deskripsi=?

        WHERE id=?

        `;

        data=[

            judul,
            deskripsi,
            id

        ];

    }

    db.query(sql,data,(err)=>{

        if(err){

            return res.status(500).json(err);

        }

        res.json({

            success:true,
            message:"Galeri berhasil diupdate"

        });

    });

};

// =======================
// DELETE
// =======================

exports.hapusGaleri=(req,res)=>{

    db.query(

        "DELETE FROM galeri_sinode WHERE id=?",

        [req.params.id],

        (err)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                success:true,
                message:"Galeri berhasil dihapus"

            });

        }

    );

};