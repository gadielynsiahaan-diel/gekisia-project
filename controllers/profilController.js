const db = require("../config/db");

// =============================
// GET PROFIL
// =============================

exports.getProfil = (req,res)=>{

    const churchId = Number(req.params.church_id);

    db.query(

        `

        SELECT *

        FROM profil_gereja

        WHERE church_id=?

        LIMIT 1

        `,

        [churchId],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500).json(err);

            }

            res.json(result[0] || {});

        }

    );

}

// =============================
// SIMPAN PROFIL
// =============================

exports.simpanProfil=(req,res)=>{
    
    console.log("===== SIMPAN PROFIL =====");
    console.log(req.body);
    console.log(req.files);
   
    const{

        nama_gereja,

        alamat,

        deskripsi,

        nama_pendeta,

    }=req.body;

    const foto_gereja =
    req.files?.foto_gereja
    ? req.files.foto_gereja[0].filename
    : null;

    const foto_pendeta =
    req.files?.foto_pendeta
    ? req.files.foto_pendeta[0].filename
    : null;

    const churchId = Number(req.params.church_id);
    
    db.query(

        "SELECT * FROM profil_gereja WHERE church_id=?",

        [churchId],

        (err, result) => {

            if(err){

                return res.status(500).json(err);

            }

            if(result.length==0){

                db.query(

                    `

                    INSERT INTO profil_gereja(

                    church_id,

                    nama_gereja,

                    alamat,

                    deskripsi,

                    nama_pendeta,

                    foto_gereja,

                    foto_pendeta

                    )

                    VALUES(?,?,?,?,?,?,?)

                    `,

                    [

                    churchId,

                    nama_gereja,

                    alamat,

                    deskripsi,

                    nama_pendeta,

                    foto_gereja,

                    foto_pendeta

                    ],

                    (err)=>{
                        if(err){
                            console.log(err);
                            return res.status(500).json(err);
                        }

                        res.json({
                            success:true,
                            message:"Profil berhasil disimpan"
                        });
                    }

                );

            }

            else{

                db.query(

                    `

                    UPDATE profil_gereja

                    SET

                    nama_gereja=?,

                    alamat=?,

                    deskripsi=?,

                    nama_pendeta=?,

                    foto_gereja=IFNULL(?,foto_gereja),

                    foto_pendeta=IFNULL(?,foto_pendeta)

                    WHERE church_id=?

                    `,

                    [

                        nama_gereja,

                        alamat,

                        deskripsi,

                        nama_pendeta,

                        foto_gereja,

                        foto_pendeta,

                        churchId

                    ],

                    (err)=>{
                        if(err){
                            console.log(err);
                            return res.status(500).json(err);
                        }

                        res.json({
                            success:true,
                            message:"Profil berhasil diupdate"
                        });
                    }

                );

            }

        }

    );

};

const fs = require("fs");
const path = require("path");

// =============================
// HAPUS FOTO GEREJA
// =============================

exports.hapusFotoGereja = (req, res) => {

    const churchId = req.params.church_id;

    db.query(

        "SELECT foto_gereja FROM profil_gereja WHERE church_id=?",

        [churchId],

        (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length == 0)
                return res.status(404).json({
                    message: "Data tidak ditemukan"
                });

            const namaFile = result[0].foto_gereja;

            if (namaFile) {

                const filePath = path.join(
                    __dirname,
                    "../uploads",
                    namaFile
                );

                if (fs.existsSync(filePath)) {

                    fs.unlinkSync(filePath);

                }

            }

            db.query(

                "UPDATE profil_gereja SET foto_gereja=NULL WHERE church_id=?",

                [churchId],

                (err) => {

                    if (err) return res.status(500).json(err);

                    res.json({

                        success:true,

                        message:"Foto gereja berhasil dihapus"

                    });

                }

            );

        }

    );

};

// =============================
// HAPUS FOTO PENDETA
// =============================

exports.hapusFotoPendeta = (req, res) => {

    const churchId = req.params.church_id;

    db.query(

        "SELECT foto_pendeta FROM profil_gereja WHERE church_id=?",

        [churchId],

        (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length == 0)
                return res.status(404).json({
                    message: "Data tidak ditemukan"
                });

            const namaFile = result[0].foto_pendeta;

            if (namaFile) {

                const filePath = path.join(
                    __dirname,
                    "../uploads",
                    namaFile
                );

                if (fs.existsSync(filePath)) {

                    fs.unlinkSync(filePath);

                }

            }

            db.query(

                "UPDATE profil_gereja SET foto_pendeta=NULL WHERE church_id=?",

                [churchId],

                (err) => {

                    if (err) return res.status(500).json(err);

                    res.json({

                        success:true,

                        message:"Foto pendeta berhasil dihapus"

                    });

                }

            );

        }

    );

};