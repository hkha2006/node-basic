import db from "../models/index"
let createSpecailty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMess: 'Missing Parameter'
                })
            }
            else {
                await db.Specialty.create({
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

let getAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll()
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

let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMess: 'Missing Parameter'
                })
            }
            else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })

                if (data) {
                    let doctorsSepcialty = []
                    console.log('check location', location);
                    if (location === 'ALL') {

                        doctorsSepcialty = await db.Doctor_Infor.findAll({
                            logging: console.log,
                            where: { specialtyId: inputId },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    if (location !== 'ALL') {
                        console.log('check another case');
                        doctorsSepcialty = await db.Doctor_Infor.findAll({
                            logging: console.log,
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }

                    data.doctorsSepcialty = doctorsSepcialty
                }
                else {
                    data = {}
                }
                resolve({
                    errCode: 0,
                    errMess: "OK",
                    data
                })


            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createSpecailty,
    getAllSpecialties,
    getDetailSpecialtyById
}