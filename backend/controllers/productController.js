
const db = require("../config/db");

exports.getProducts = (req,res)=>{
  db.query("SELECT * FROM products",(err,result)=>{
    res.json(result);
  });
};

exports.createProduct = (req,res)=>{
  const {name,price,description} = req.body;

  db.query(
    "INSERT INTO products(name,price,description) VALUES(?,?,?)",
    [name,price,description],
    (err,result)=>{
      res.json({message:"Product added"});
    }
  );
};

exports.deleteProduct = (req,res)=>{
  const id = req.params.id;

  db.query(
    "DELETE FROM products WHERE id=?",
    [id],
    (err,result)=>{
      res.json({message:"Product deleted"});
    }
  );
};
