const router = require('express').Router();
const mongoose = require('mongoose');
const path = require('path');

//models
const Hero = require('../models/hero')

//rota que busca todos os herois
router.get('/',async function(req,res){
    const heros = await Hero.find({})
    res.json({
        error:null,
        heros:heros,
    })
})

//rota que filtra os herois por classe
router.get('/classe/:filter',async function(req,res){

    const filter = req.params.filter;

    try {
        const heros = await Hero.find({$or:[{class:filter},{subClass:filter}]})
    res.json({
        error:null,
        heros:heros
    })
    } catch (e) {
      return res.status(400).json({error:'caiu no catch'})  
    }
})

//rota que pega um hero
router.get('/hero/:filter',async function(req,res){

    const filter = req.params.filter;

    try {
        const hero = await Hero.findOne({name:filter})
    res.json({
        error:null,
        hero:hero
    })
    } catch (e) {
      return res.status(400).json({error:'hero n existe'})  
    }
})

//rota de insercao de heroi
router.post('/add',async function(req,res){

    //atribuicoes
    const name = req.body.name;
    const classe = req.body.classe;
    const subClasse = req.body.subClasse;
    console.log(classe)
    //adicionando ao banco de dados
    const hero = new Hero({
        name:name,
        classe:classe,
        subClasse:subClasse
    })
    
    //salvando heroi e enviando resposta de sucesso dentro do trycatch
    try {
        const newHero = await hero.save();
        res.json({
            error:null,msg:'heroi adicionado com sucesso!',
            hero:newHero
        });
    } catch (e) {
        return res.status(400).json({error:'hero n foi adicionado',e})
    }
    
})

//rota de atualizacao de hero
router.post('/update',async function(req,res){

    //atribuicoes
    const heroUpdate = {
        name : req.body.name,
        classe : req.body.classe,
        subClasse : req.body.subClasse
    }
    console.log(heroUpdate)
  
    
    //salvando heroi e enviando resposta de sucesso dentro do trycatch
    try {
        
        //validacao dos campos 
        if( !heroUpdate.name && !heroUpdate.classe  && !heroUpdate.subClasse ){
            return res.status(400).json({error:'insira algum valor que deseje atualizar'})
        }
        //adicionando ao banco de dados
        const hero = await Hero.findOneAndUpdate({name:heroUpdate.name},{$set: heroUpdate },{new:true})
        if(!hero){
            return res.status(400).json({error:'nao existe'})
        }

        return res.json({error:null,msg:"atualizado",data:heroUpdate})
    
    } catch (e) {
        return res.status(400).json({error:'hero n foi atualizado',e})
    }
    
});

//rota de remocao de heroi
router.delete('/delete/:filter',async function(req,res){

    const filter = req.params.filter;

    try {
        
        const hero = await Hero.deleteOne({name:filter});
        console.log(hero)
        if(hero.deletedCount==0){
            return res.status(400).json({error:'nao existe'})
        }
        return res.json({error:null,msg:"removido",data:hero})
    
    } catch (error) {
        return res.status(400).json({error:'hero n foi deletado',e})
    }
})


module.exports = router;  