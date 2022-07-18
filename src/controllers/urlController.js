const validUrl = require("valid-url")
const shortId = require("shortid")
const urlModel = require("../model/urlModel")

// const isValidUrl = function(value){
//  let reg="/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/";
//  return reg.test(value)
// }

const shortUrl = async function (req, res) {
    try {
        let baseUrl = "http://localhost:3000"
        let url = req.body.longUrl

        if(!url) return res.status(400).send({status:false,message:"Please Provide Url"})
        if (!validUrl.isUri(url)) return res.status(404).send({ status: false, message: "Invalid Url" })

        // if(!isValidUrl(url)) return res.status(400).send({status:false,message:"Invalid Url"})
        let checkUrl= await urlModel .findOne({longUrl:url}).select({ _id: 0, __v: 0 })

        if(!checkUrl){
            let urlCode = shortId.generate()
            let shortUrl = baseUrl + "/" + urlCode
            const saveData = await urlModel.create({
                longUrl: url,
                shortUrl: shortUrl,
                urlCode: urlCode
            })
            let saveData1 = await urlModel.findById(saveData._id).select({ _id: 0, __v: 0 })
            res.status(201).send({ status: true, data: saveData1 })
        }
        else{
            res.status(200).send({ status: true, data: checkUrl })
        }
       
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.mesaage })
    }
}
module.exports.shortUrl = shortUrl


const redirect = async function (req, res) {
    try {
        let urlCode = req.params.urlCode
        let urlData = await urlModel.findOne({ urlCode: urlCode })
        if (!urlData) return res.status(404).send({ status: false, message: "No url found" })
        let longUrl = urlData.longUrl
        return res.redirect(longUrl)
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
module.exports.redirect = redirect
