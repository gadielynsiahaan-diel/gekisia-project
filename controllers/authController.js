const db = require("../config/db");

exports.login = (req, res) => {

        const { role, church, username, password } = req.body;

    let sql = "";
    let values = [];

    if (role === "sinode") {

        sql = `
            SELECT *
            FROM admins
            WHERE username = ?
            AND password = ?
            AND role = 'superadmin'
        `;

        values = [username, password];

    }

    else if (role === "gereja") {

        sql = `
            SELECT
                a.id,
                a.username,
                a.nama_lengkap,
                a.role,
                a.church_id,
                c.nama_gereja

            FROM admins a

            INNER JOIN churches c
            ON a.church_id = c.id

            WHERE

            a.username = ?
            AND a.password = ?
            AND a.role = 'admin'
            AND c.nama_gereja = ?
        `;

        values = [
            username,
            password,
            church
        ];

    }

    else{

        return res.json({

            success:false,
            message:"Role belum dipilih"

        });

    }

    console.log("BODY :", req.body);
    console.log(sql);
    console.log(values);
    
    db.query(sql,values,(err,result)=>{

        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message,
                code: err.code,
                sqlMessage: err.sqlMessage
            });
        }

        if(result.length===0){

            return res.json({

                success:false,
                message:"Username atau Password salah"

            });

        }

        res.json({

            success:true,
            admin:result[0]

        });

    });

};
