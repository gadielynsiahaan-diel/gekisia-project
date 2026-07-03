const db = require("../config/db");

// ===============================
// GET WARTA BERDASARKAN GEREJA
// ===============================

exports.getAgenda = (req, res) => {

    const churchId = req.params.church_id;

    if (!churchId) {

        return res.status(400).json({

            success: false,

            message: "Church ID tidak ditemukan."

        });

    }

    db.query(

        `

        SELECT *

        FROM agenda

        WHERE church_id=?

        ORDER BY created_at DESC

        `,

        [churchId],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

};

// ===============================
// TAMBAH WARTA
// ===============================

exports.tambahAgenda = (req, res) => {
    
    const churchId = req.params.church_id;

    if (!churchId) {

        return res.status(400).json({

            success: false,

            message: "Church ID tidak ditemukan."

        });

    }

    const { judul } = req.body;

    if (!req.file) {

        return res.status(400).json({

            success: false,

            message: "Silakan upload file PDF."

        });

    }

    const file = req.file.filename;

    db.query(

        `INSERT INTO agenda
        (church_id, judul, file_pdf)
        VALUES (?,?,?)`,

        [
            churchId,
            judul,
            file
        ],

        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            res.json({

                success: true,
                message: "Warta berhasil ditambahkan"

            });

        }

    );

};

// ===============================
// EDIT WARTA
// ===============================

exports.editAgenda = (req, res) => {

    const id = req.params.id;

    const churchId = req.params.church_id;

    if (!id || !churchId) {

        return res.status(400).json({

            success: false,

            message: "ID atau Church ID tidak ditemukan."

        });

    }

    const { judul } = req.body;

    let sql;
    let params;

    if (req.file) {

        sql = `
            UPDATE agenda
            SET
            judul=?,
            file_pdf=?
            WHERE id=? AND church_id=?
        `;

        params = [

            judul,
            req.file.filename,
            id,
            churchId

        ];

    } else {

        sql = `
            UPDATE agenda
            SET
            judul=?
            WHERE id=? AND church_id=?
        `;

        params = [

            judul,
            id,
            churchId

        ];

    }

    db.query(sql, params, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,

                message: "Data warta tidak ditemukan."

            });

        }

        res.json({

            success: true,

            message: "Warta berhasil diupdate"

        });

    });

};

// ===============================
// HAPUS WARTA
// ===============================

exports.hapusAgenda = (req, res) => {

    const id = req.params.id;
    const churchId = req.params.church_id;

    if (!id || !churchId) {

        return res.status(400).json({

            success: false,

            message: "ID atau Church ID tidak ditemukan."

        });

    }

    db.query(

        `DELETE FROM agenda
        WHERE id=?
        AND church_id=?`,

        [

            id,
            churchId

        ],

        (err, result) => {

            if (err) {

                return res.status(500).json(err);

            }

            if(result.affectedRows===0){

                return res.status(404).json({

                    success:false,

                    message:"Data warta tidak ditemukan."

                });

            }

            res.json({

                success:true,

                message:"Warta berhasil dihapus"

            });

        }

    );

};