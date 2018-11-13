var fs = require('fs');
var path= require('path')
let components = []
let str = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
`
let str2 =''
let str3 = 
`</body>
</html>
<style>
    *{
        background:white;
    }
    img {
        width:300px;
        height:200px;
    }
    img:hover {
        width:auto;
        height:auto;
    }
</style>
`
const files = fs.readdirSync('./images')
files.forEach(function (item, index) {
    let stat = fs.lstatSync("./images/" + item)
    if (stat.isDirectory() === true) { 
      let info = {
          name:item,
          url:[]
      }
      components.push(info)
    }
})
components.forEach((item,index, arr )=>{
   let items = fs.readdirSync('./images/'+item.name)
   let item3 = items.map((item2,index,arr)=>{
        return path.join('./images/'+item.name+'/'+item2)
   })
    item.url = item3;
})

components.forEach((item,index, arr )=>{
    let str6 =
    `<div>
    <div>${item.name}</div>
    `
    // let str6 = '';
    let str8 ='</div>';
    item.url.forEach((item2,index2,arr2)=>{
        let str7 = `<img src="${item2}" alt="${item.name}">`
        str6 += str7;
    })
    str6 += str8
    str2 += str6
 })
let all  = str + str2 + str3;
fs.appendFileSync('./index.html', all)



