import specialtyService from '../services/specialtyService'
let createSpecailty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecailty(req.body)
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getAllSpecialties = async (req, res) => {
    try {
        let data = await specialtyService.getAllSpecialties()
        return res.status(200).json(data)

    } catch (error) {
        console.log('check error', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getDetailSpecialtyById = async (req, res) => {
    try {
        let data = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location)
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
    createSpecailty,
    getAllSpecialties,
    getDetailSpecialtyById
}