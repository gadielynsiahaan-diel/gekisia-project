const db = require("../config/db");

// ==============================
// GET SEMUA DATA
// ==============================

exports.getJemaat = (req,res)=>{

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

        FROM jemaat

        WHERE church_id=?

        ORDER BY tahun DESC

        `,

        [churchId],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

}

// ==============================
// TAMBAH DATA
// ==============================

exports.tambahJemaat = (req, res) => {

    const churchId = req.params.church_id;

    if(!churchId){

        return res.status(400).json({

            success:false,

            message:"Church ID tidak ditemukan."

        });

    }

    const{

        anak,
        remaja,
        pemuda,
        dewasa,
        lansia,
        tahun

    }=req.body;

    const total =
        Number(anak) +
        Number(remaja) +
        Number(pemuda) +
        Number(dewasa) +
        Number(lansia);

    db.query(

        `INSERT INTO jemaat
        (church_id,anak,remaja,pemuda,dewasa,lansia,total,tahun)
        VALUES(?,?,?,?,?,?,?,?)`,

        [
            churchId,
            anak,
            remaja,
            pemuda,
            dewasa,
            lansia,
            total,
            tahun
        ],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"Data berhasil ditambahkan"

            });

        }

    );

};

// ==============================
// UPDATE
// ==============================

exports.updateJemaat = (req, res) => {

    const id = req.params.id;
    const churchId = req.params.church_id;

    if(!id || !churchId){

        return res.status(400).json({

            success:false,

            message:"ID atau Church ID tidak ditemukan."

        });

    }

    const {
        
        anak,
        remaja,
        pemuda,
        dewasa,
        lansia,
        tahun

    } = req.body;

    const total =
        Number(anak) +
        Number(remaja) +
        Number(pemuda) +
        Number(dewasa) +
        Number(lansia);

    db.query(

        `UPDATE jemaat
        SET
        anak=?,
        remaja=?,
        pemuda=?,
        dewasa=?,
        lansia=?,
        total=?,
        tahun=?
        WHERE id=? AND church_id=?`,

        [
            anak,
            remaja,
            pemuda,
            dewasa,
            lansia,
            total,
            tahun,
            id,
            churchId
        ],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            if(result.affectedRows===0){

                return res.status(404).json({

                    success:false,

                    message:"Data jemaat tidak ditemukan."

                });

            }

            res.json({

                success:true,

                message:"Data jemaat berhasil diupdate"

            });

        }

    );

};

// ==============================
// HAPUS
// ==============================

exports.hapusJemaat = (req, res) => {

    const id = req.params.id;
    const churchId = req.params.church_id;

    if(!id || !churchId){

        return res.status(400).json({

            success:false,

            message:"ID atau Church ID tidak ditemukan."

        });

    }

    db.query(

        `

        DELETE FROM jemaat

        WHERE id=?

        AND church_id=?

        `,

        [
            id,
            churchId
        ],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            if(result.affectedRows===0){

                return res.status(404).json({

                    success:false,

                    message:"Data jemaat tidak ditemukan."

                });

            }

            res.json({

                success:true,

                message:"Data berhasil dihapus"

            });

        }

    );

};