const db = require("../config/db");

// ======================================
// DASHBOARD ADMIN SINODE
// ======================================

exports.getDashboard = (req, res) => {

    const sqlBerita = "SELECT COUNT(*) AS total FROM berita";
    const sqlSDM = "SELECT COUNT(*) AS total FROM sdm";

    db.query(sqlBerita, (err, berita) => {

        if (err) return res.status(500).json(err);

        db.query(sqlSDM, (err2, sdm) => {

            if (err2) return res.status(500).json(err2);

            res.json({

                totalBerita: berita[0].total,
                totalSDM: sdm[0].total

            });

        });

    });

};

// ======================================
// DASHBOARD ADMIN GEREJA
// ======================================

exports.getDashboardGereja = (req,res)=>{

    const churchId = req.params.church_id;

    const sqlJemaat = `
    SELECT
    anak,
    remaja,
    pemuda,
    dewasa,
    lansia,
    total
    FROM jemaat
    WHERE church_id=?
    ORDER BY id DESC
    LIMIT 1
    `;

    const sqlWarta =
    `
    SELECT COUNT(*) AS total
    FROM agenda
    WHERE church_id=?
    `;

    const sqlGaleri =
    `
    SELECT COUNT(*) AS total
    FROM galeri
    WHERE church_id=?
    `;

    const sqlKontak =
    `
    SELECT COUNT(*) AS total
    FROM kontak
    WHERE church_id=?
    `;

    const sqlProfil =
    `
    SELECT *
    FROM profil_gereja
    WHERE church_id=?
    LIMIT 1
    `;

    db.query(sqlJemaat,[churchId],(e1,jemaat)=>{

        if(e1) return res.status(500).json(e1);

        db.query(sqlWarta,[churchId],(e2,agenda)=>{

            if(e2) return res.status(500).json(e2);

                db.query(sqlGaleri,[churchId],(e3,galeri)=>{

                    if(e3) return res.status(500).json(e3);

                    db.query(sqlKontak,[churchId],(e4,kontak)=>{

                        if(e4) return res.status(500).json(e4);

                        db.query(sqlProfil,[churchId],(e5,profil)=>{

                            if(e5) return res.status(500).json(e5);

                            const dataJemaat = jemaat[0] || {};
                            const dataAgenda = agenda[0] || {};
                            const dataGaleri = galeri[0] || {};
                            const dataKontak = kontak[0] || {};
                            const dataProfil = profil[0] || {};

                            res.json({

                                totalJemaat: dataJemaat.total || 0,

                                totalAnak: dataJemaat.anak || 0,

                                totalRemaja: dataJemaat.remaja || 0,

                                totalPemuda: dataJemaat.pemuda || 0,

                                totalDewasa: dataJemaat.dewasa || 0,

                                totalLansia: dataJemaat.lansia || 0,

                                totalWarta: dataAgenda.total || 0,

                                totalGaleri: dataGaleri.total || 0,

                                totalKontak: dataKontak.total || 0,

                                profil: dataProfil

                            });

                        });

                    });

                });

        });

    });

}