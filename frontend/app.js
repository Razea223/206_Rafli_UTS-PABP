
const API = "http://localhost:3000/api";

function login(){

fetch(API+"/auth/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
email:document.getElementById("email").value,
password:document.getElementById("password").value
})
})
.then(res=>res.json())
.then(data=>{
localStorage.setItem("token",data.token);
alert("Login berhasil");
window.location='index.html';
});
}

function getProducts(){

fetch(API+"/products",{
headers:{
"Authorization":localStorage.getItem("token")
}
})
.then(res=>res.json())
.then(data=>{

let html="";

data.forEach(p=>{
html+=`
<tr>
<td>${p.id}</td>
<td>${p.name}</td>
<td>${p.price}</td>
<td>
<button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Delete</button>
</td>
</tr>
`;
});

document.getElementById("productTable").innerHTML=html;

});
}

function addProduct(){

fetch(API+"/products",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":localStorage.getItem("token")
},
body:JSON.stringify({
name:document.getElementById("name").value,
price:document.getElementById("price").value,
description:document.getElementById("description").value
})
})
.then(res=>res.json())
.then(data=>{
alert("Produk ditambahkan");
getProducts();
});
}

function deleteProduct(id){

fetch(API+"/products/"+id,{
method:"DELETE",
headers:{
"Authorization":localStorage.getItem("token")
}
})
.then(res=>res.json())
.then(data=>{
alert("Produk dihapus");
getProducts();
});
}

if(document.getElementById("productTable")){
getProducts();
}
