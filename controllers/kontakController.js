const db = require("../config/db");

// =========================
// GET
// =========================

exports.getKontak = (req, res) => {

    const churchId = req.params.church_id;

    if(!churchId){

        return res.status(400).json({

            success:false,

            message:"Church ID tidak ditemukan."

        });

    }

    db.query(

        `

        SELECT *

        FROM kontak

        WHERE church_id=?

        LIMIT 1

        `,

        [churchId],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json(result[0] || {});

        }

    );

};

// =========================
// UPDATE
// =========================

exports.updateKontak = (req, res) => {

    const churchId = req.params.church_id;

    if(!churchId){

        return res.status(400).json({

            success:false,

            message:"Church ID tidak ditemukan."

        });

    }

    const {

        alamat,
        telepon,
        email,
        maps,
        instagram,
        facebook,
        tiktok,
        youtube

    } = req.body;

    db.query(
        `
        UPDATE kontak
        SET
            alamat=?,
            telepon=?,
            email=?,
            maps=?,
            instagram=?,
            facebook=?,
            tiktok=?,
            youtube=?
        WHERE church_id=?
        `,
        [
            alamat,
            telepon,
            email,
            maps,
            instagram,
            facebook,
            tiktok,
            youtube,
            churchId
        ],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            if(result.affectedRows===0){

                return res.status(404).json({

                    success:false,

                    message:"Data kontak tidak ditemukan."

                });

            }

            res.json({

                success:true,

                message:"Kontak berhasil diupdate"

            });

        }

    );

};