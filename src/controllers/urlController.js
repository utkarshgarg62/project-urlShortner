const validUrl=require("valid-url")
const shortid=require("shortid")
const urlModel = require("../model/urlModel")

const shortUrl=async function(req,res){
try{
    let baseUrl="http://localhost:3000"

    let url=req.body.longUrl

    // if (!validUrl.isUri(suspect)) return 


    let shortId=shortid.generate()

    let shortUrl=baseUrl + "/" +shortId

    const saveData=await urlModel.create({
        longUrl:url,
        shortUrl:shortUrl,
        urlCode:shortId
    })
    let saveData1=await urlModel.findById(saveData._id).select({_id:0,__v:0})
    res.status(201).send({status:true, data:saveData1})
}
catch(err){
    res.status(500).send({status:false,message:err.mesaage})
}
}
module.exports.shortUrl=shortUrl


const redirect=async function(req,res){
    try{
        let urlCode=req.params.urlCode

        let urlData=await urlModel.findOne({urlCode:urlCode})

if(!urlData)return res.status(404).send({status:false,message:"No url found"})

        let longUrl=urlData.longUrl

        return res.redirect(longUrl)


    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}   
    module.exports.redirect=redirect
