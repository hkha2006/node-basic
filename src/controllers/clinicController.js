import clinicService from '../services/clinicService'
let createClinic = async (req, res) => {
    try {
        let infor = await clinicService.createClinic(req.body)
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getAllClinics = async (req, res) => {
    try {
        let data = await clinicService.getAllClinics()
        return res.status(200).json(data)

    } catch (error) {
        console.log('check error', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getDetailClinictyById = async (req, res) => {
    try {
        let data = await clinicService.getDetailClinictyById(req.query.id, req.query.location)
        return res.status(200).json(data)

    } catch (error) {
        console.log('check error', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}


module.exports = {
    createClinic,
    getAllClinics,
    getDetailClinictyById
}