const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const fileupload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileupload());

app.use("/photos", express.static("photos"));
app.use("/cards", express.static("cards"));
app.use("/certificates", express.static("certificates"));

const PORT = 3001;
const EMAIL = "";
const PASSWD = "";

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "rural_mentoring_db",
    }
);

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWD
  }
});

app.get('/allmentor',(req,res)=>{
    db.query("SELECT * FROM mentor ORDER BY id DESC",
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send(result);
        }
    }
    );
});

app.get('/allmentee',(req,res)=>{
    db.query("SELECT * FROM mentee ORDER BY id DESC",
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send(result);
        }
    }
    );
});

app.post('/changementorstatus',(req,res)=>{
    const id = req.body.id;
    const status = req.body.status;

    db.query("UPDATE mentor SET status = ? WHERE id = ?",[status,id],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send("success");
        }
    }
    );
});

app.post('/changementeestatus',(req,res)=>{
    const id = req.body.id;
    const status = req.body.status;

    db.query("UPDATE mentee SET status = ? WHERE id = ?",[status,id],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send("success");
        }
    }
    );
});

app.post('/mentorregister',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const gender = req.body.gender;
    const age = req.body.age;
    const skill = req.body.skill;
    const photoFile = req.files.photoFile;
    const photoFileName = req.body.photoFileName;
    const cardFile = req.files.cardFile;
    const cardFileName = req.body.cardFileName;
    const certFile = req.files.certFile;
    const certFileName = req.body.certFileName;

    const photopath = __dirname + "/photos/";
    const cardpath = __dirname + "/cards/";
    const certpath = __dirname + "/certificates/";

    photoFile.mv(`${photopath}${photoFileName}`, (err) => {
        if (err) {
        res.send({ message: "File upload failed", code: 200 });
        }
    });

    cardFile.mv(`${cardpath}${cardFileName}`, (err) => {
        if (err) {
        res.send({ message: "File upload failed", code: 200 });
        }
    });

    certFile.mv(`${certpath}${certFileName}`, (err) => {
        if (err) {
        res.send({ message: "File upload failed", code: 200 });
        }
    });

    db.query("SELECT * FROM mentor WHERE email = ? OR phone = ? LIMIT 1",[email,phone],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            if(result.length == 1){
                res.send("error")
            }
            else{
                db.query("INSERT INTO mentor(name,email,phone,password,gender,age,skill,aadhar_card,photo,certificate) VALUES(?,?,?,?,?,?,?,?,?,?)",[name,email,phone,password,gender,age,skill,cardFileName,photoFileName,certFileName],
                (error,result)=>{
                    if(error){
                        console.log(error);
                    }
                    if(result){
                        res.send("success");
                    }
                }
                );
            }
        }
    });
});

app.post('/menteeregister',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const gender = req.body.gender;
    const age = req.body.age;
    const classField = req.body.classField;

    db.query("SELECT * FROM mentee WHERE email = ? OR phone = ? LIMIT 1",[email,phone],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            if(result.length == 1){
                res.send("error")
            }
            else{
                db.query("INSERT INTO mentee(name,email,phone,password,gender,age,class) VALUES(?,?,?,?,?,?,?)",[name,email,phone,password,gender,age,classField],
                (error,result)=>{
                    if(error){
                        console.log(error);
                    }
                    if(result){
                        res.send("success");
                    }
                }
                );
            }
        }
    });
});

app.post('/login',(req,res)=>{
    const phone = req.body.phone;
    const password = req.body.password;
    const type = req.body.type;

    if(type == 1){
        db.query("SELECT * FROM mentee WHERE phone = ? AND password = ? AND STATUS = ? LIMIT 1",[phone,password,1],
        (error,result)=>{
            if(error){
                console.log(error);
            }
            if(result){
                res.send(result);
            }
        }
        );
    }
    else{
        db.query("SELECT * FROM mentor WHERE phone = ? AND password = ? AND STATUS = ? LIMIT 1",[phone,password,1],
        (error,result)=>{
            if(error){
                console.log(error);
            }
            if(result){
                res.send(result);
            }
        }
        );
    }
});

app.post('/getpassword',(req,res)=>{
    const email = req.body.email;

    db.query("SELECT * FROM accounts WHERE email = ? LIMIT 1",[email],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            if(result.length == 1){
                var mailOptions = {
                    from: EMAIL,
                    to: email,
                    subject: 'Rural Mentoring Admin',
                    text: result[0].password+' is your Password'
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                      res.send("Check your Email "+email);
                    }
                });
            }
            else{
                res.send("Account Not Found");
            }
        }
    }
    );
});

app.post('/savementorinfo',(req,res)=>{
    const user = req.body.user;
    const age = req.body.age;
    const skill = req.body.skill;
    const certFile = req.files.certFile;
    const certFileName = req.body.certFileName;

    const certpath = __dirname + "/certificates/";

    certFile.mv(`${certpath}${certFileName}`, (err) => {
        if (err) {
        res.send({ message: "File upload failed", code: 200 });
        }
    });

    db.query("SELECT * FROM mentor WHERE id = ? LIMIT 1",[user],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            if(result.length == 1){
                db.query("UPDATE mentor SET age = ? , skill = ?, certificate = ? WHERE id = ?",[age,skill,certFileName,user],
                (error,result)=>{
                    if(error){
                        console.log(error);
                    }
                    if(result){
                        res.send(result);
                    }
                }
                );
            }
        }
    });
});

app.post('/savementeeinfo',(req,res)=>{
    const user = req.body.user;
    const age = req.body.age;
    const classField = req.body.classField;

    db.query("SELECT * FROM mentee WHERE id = ? LIMIT 1",[user],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            if(result.length == 1){
                db.query("UPDATE mentee SET age = ? , class = ? WHERE id = ?",[age,classField,user],
                (error,result)=>{
                    if(error){
                        console.log(error);
                    }
                    if(result){
                        res.send(result);
                    }
                }
                );
            }
        }
    });
});

app.post('/searchmentor',(req,res)=>{
    const skill = req.body.skill;

    db.query("SELECT mentor.id,mentor.name,mentor.email,mentor.phone,mentor.gender,mentor.age,mentor.skill,AVG(feedback.rating) as rating FROM mentor LEFT JOIN feedback ON mentor.id = feedback.mentor WHERE mentor.skill = ? GROUP BY feedback.mentor",[skill],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            console.log(result);
            res.send(result);
        }
    }
    );
});

app.post('/dorequest',(req,res)=>{
    const mentor = req.body.mentor;
    const mentee = req.body.mentee;
    const status = req.body.status;

    db.query("SELECT * FROM requests WHERE mentor = ? AND mentee = ? LIMIT 1",[mentor,mentee],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            if(result.length == 0){
                db.query("INSERT INTO requests(mentor,mentee,status) VALUES(?,?,?)",[mentor,mentee,status],
                (error,result)=>{
                    if(error){
                        console.log(error);
                    }
                    if(result){
                        res.send(result);
                    }
                }
                );
            }
        }
    });
});

app.post('/getmyrequests',(req,res)=>{
    const mentor = req.body.mentor;

    db.query("SELECT mentee.id,mentee.name,mentee.email,mentee.age,mentee.class,requests.id as reqid FROM mentee LEFT JOIN requests ON mentee.id=requests.mentee WHERE requests.mentor = ? AND requests.status = ? ORDER BY requests.id DESC",[mentor,0],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send(result);
        }
    }
    );
});

app.post('/getmenteelist',(req,res)=>{
    const mentor = req.body.mentor;

    db.query("SELECT mentee.id,mentee.name,mentee.email,mentee.phone,requests.id as reqid FROM mentee LEFT JOIN requests ON mentee.id=requests.mentee WHERE requests.mentor = ? AND requests.status = ? ORDER BY requests.id DESC",[mentor,1],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send(result);
        }
    }
    );
});

app.post('/getmentorlist',(req,res)=>{
    const mentee = req.body.mentee;

    db.query("SELECT mentor.id,mentor.name,mentor.email,mentor.phone,requests.id as reqid FROM mentor LEFT JOIN requests ON mentor.id=requests.mentor WHERE requests.mentee = ? AND requests.status = ? ORDER BY requests.id DESC",[mentee,1],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send(result);
        }
    }
    );
});

app.post('/acceptreq',(req,res)=>{
    const id = req.body.id;

    db.query("UPDATE requests SET status = ? WHERE id = ?",[1,id],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send("success");
        }
    }
    );
});

app.post('/delreq',(req,res)=>{
    const id = req.body.id;

    db.query("DELETE FROM requests WHERE id = ?",[id],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send("success");
        }
    }
    );
});

app.post('/addfeedback',(req,res)=>{
    const mentor = req.body.mentor;
    const mentee = req.body.mentee;
    const message = req.body.message;
    const rating = req.body.rating;

    db.query("SELECT * FROM feedback WHERE mentor = ? AND mentee = ? LIMIT 1",[mentor,mentee],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            if(result.length == 0){
                db.query("INSERT INTO feedback(mentor,mentee,message,rating) VALUES(?,?,?,?)",[mentor,mentee,message,rating],
                (error,result)=>{
                    if(error){
                        console.log(error);
                    }
                    if(result){
                        res.send("success");
                    }
                }
                );
            }
            else{
                db.query("UPDATE feedback SET message = ? , rating = ? WHERE mentor = ? AND mentee = ?",[message,rating,mentor,mentee],
                (error,result)=>{
                    if(error){
                        console.log(error);
                    }
                    if(result){
                        res.send("success");
                    }
                }
                );
            }
        }
    }
    );
});

app.post('/getfeedback',(req,res)=>{
    const mentor = req.body.mentor;

    db.query("SELECT mentee.name,mentee.email,feedback.message,feedback.rating FROM feedback LEFT JOIN mentee ON mentee.id = feedback.mentee WHERE feedback.mentor = ? ORDER BY feedback.id DESC",[mentor],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send(result);
        }
    }
    );
});

app.post('/getchats',(req,res)=>{
    const from_user = req.body.from_user;
    const to_user = req.body.to_user;

    db.query("SELECT * FROM chat WHERE from_user = ? AND to_user = ? OR to_user = ? AND from_user = ? ORDER BY ID ASC",[from_user,to_user,from_user,to_user],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send(result);
        }
    }
    );
});

app.post('/sendchat',(req,res)=>{
    const from_user = req.body.from_user;
    const to_user = req.body.to_user;
    const chat = req.body.chat;
    const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 

    db.query("INSERT INTO chat(from_user,to_user,chat,datetime) VALUES(?,?,?,?)",[from_user,to_user,chat,datetime],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send(result);
        }
    }
    );
});

app.post('/getrating',(req,res)=>{
    const mentor = req.body.mentor;

    db.query("SELECT AVG(rating)n FROM feedback WHERE mentor = ?",[mentor],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result){
            res.send(result);
        }
    }
    );
});

app.listen(PORT,()=>{
    console.log("Listening to ",{PORT})
});
