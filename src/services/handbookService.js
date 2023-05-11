import db from "../models/index"
let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMess: 'Missing Parameter'
                })
            }
            else {
                await db.Handbook.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMess: 'OK'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllHandbooks = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll()
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item
                })
            }
            resolve({
                errCode: 0,
                errMess: "OK",
                data: data
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailHandbookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMess: 'Missing Parameter'
                })
            }
            else {
                let data = await db.Handbook.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'image', 'descriptionHTML', 'descriptionMarkdown']
                })
                resolve({
                    errCode: 0,
                    errMess: "OK",
                    data: data ? data : {}
                })


            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createHandbook,
    getAllHandbooks,
    getDetailHandbookById
}