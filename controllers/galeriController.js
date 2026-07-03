const db = require("../config/db");
console.log("GALERI CONTROLLER TERLOAD");

// ===========================
// GET GALERI
// ===========================

exports.getAllGaleri = (req,res)=>{
    
    console.log("QUERY GET GALERI");

    console.log("PARAM :",req.params);

    const church_id=req.params.church_id;

    console.log("CHURCH :",church_id);

    db.query(

        `
        SELECT *
        FROM galeri
        WHERE church_id = ?
        ORDER BY id DESC
        `,

        [church_id],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

};

// ===========================
// TAMBAH GALERI
// ===========================

exports.tambahGaleri = (req, res) => {

    const { church_id, judul, deskripsi } = req.body;

    if (!req.file) {
        return res.status(400).json({
            success:false,
            message:"Silakan upload gambar."
        });
    }

    const gambar = req.file.filename;

    const churchId =
            req.body.church_id ||
            req.params.church_id;

            if(!churchId){

                return res.status(400).json({

                    success:false,
                    message:"Church ID tidak ditemukan."

                });

            }

            console.log("BODY :", req.body);
            console.log("PARAM :", req.params);
            console.log("FILE :", req.file);

            db.query(

            `
            INSERT INTO galeri
            (
            church_id,
            judul,
            gambar,
            deskripsi
            )
            VALUES (?,?,?,?)
            `,

            [
            churchId,
            judul,
            gambar,
            deskripsi
            ],

            (err)=>{

                if(err){

                    console.log(err);

                    return res.status(500).json(err);

                }

                res.json({

                    success:true,
                    message:"Galeri berhasil ditambahkan"

                });

            }

        );

};


// ===========================
// HAPUS GALERI
// ===========================

exports.hapusGaleri=(req,res)=>{

    const id=req.params.id;

    db.query(

        "DELETE FROM galeri WHERE id=?",

        [id],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"Foto berhasil dihapus"

            });

        }

    );

};

// ===========================
// EDIT GALERI
// ===========================

exports.editGaleri=(req,res)=>{

    const id=req.params.id;

    const{
        judul,
        deskripsi
    }=req.body;

    let sql;
    let values;

    if(req.file){

        sql=`

        UPDATE galeri

        SET

        judul=?,
        gambar=?,
        deskripsi=?

        WHERE id=?

        `;

        values=[
            judul,
            req.file.filename,
            deskripsi,
            id
        ];

    }else{

        sql=`

        UPDATE galeri

        SET

        judul=?,
        deskripsi=?

        WHERE id=?

        `;

        values=[
            judul,
            deskripsi,
            id
        ];

    }

    db.query(sql,values,(err)=>{

        if(err){

            return res.status(500).json(err);

        }

        res.json({

            success:true,

            message:"Galeri berhasil diupdate"

        });

    });

};