const validUrl = require("valid-url")
const shortId = require("shortid")
const urlModel = require("../model/urlModel")

const shortUrl = async function (req, res) {
    try {
        let baseUrl = "http://localhost:3000"
        let url = req.body.longUrl

        if(!url) return res.status(400).send({status:false,message:"Please Provide Url"})

        if (!validUrl.isUri(url)) return res.status(404).send({ status: false, message: "Invalid Url" })

        // let checkUrl= await urlModel .findOne({longUrl:url})
        // if(checkUrl) return res.status(400).send({status:false,message:"This Url is already shortened"})

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
