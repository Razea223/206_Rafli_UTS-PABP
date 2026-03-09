
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req,res)=>{
  const {name,email,password} = req.body;
  const hash = bcrypt.hashSync(password,10);

  db.query(
    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
    [name,email,hash],
    (err,result)=>{
      if(err) return res.json(err);
      res.json({message:"Register success"});
    }
  );
};

exports.login = (req,res)=>{
  const {email,password} = req.body;

  db.query("SELECT * FROM users WHERE email=?",[email],(err,result)=>{

    if(result.length===0)
      return res.json({message:"User not found"});

    const user = result[0];
    const valid = bcrypt.compareSync(password,user.password);

    if(!valid)
      return res.json({message:"Wrong password"});

    const token = jwt.sign({id:user.id},"SECRETKEY",{expiresIn:"1h"});
    res.json({token});
  });
};
