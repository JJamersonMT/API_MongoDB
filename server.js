const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//importacao de rotas
const heroRouter = require('./routes/heroRoutes.js');

//config 
const app = express();
const port = 3000;
mongoose.set('strictQuery',true);

app.use(express.urlencoded());
app.use(express.static('public'))
app.use(cors());


//atrellar as rotas no express
app.use('/api',heroRouter)

 
app.get('/',async function(req,res){
    return res.json({msg:'conteudo'})
})

//conexao
mongoose.connect(`mongodb://127.0.0.1:27017/crudML`,{useNewUrlParser:true,useUnifiedTopology:true})
.then((res)=>{
    console.log(`conexao estabelecida!`)
    app.listen(port,()=>{
        console.log(`servidor rodando porta: ${port}`)
    })
})
.catch((erro)=>{
    console.log(`erro na conexao com o banco : ${erro}`)
});
 
 