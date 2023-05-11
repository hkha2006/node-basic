import handbookService from '../services/handbookService'
let createHandbook = async (req, res) => {
    try {
        let infor = await handbookService.createHandbook(req.body)
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getAllHandbooks = async (req, res) => {
    try {
        let data = await handbookService.getAllHandbooks()
        return res.status(200).json(data)

    } catch (error) {
        console.log('check error', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server'
        })
    }
}

let getDetailHandbookById = async (req, res) => {
    try {
        let data = await handbookService.getDetailHandbookById(req.query.id)
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
    createHandbook,
    getAllHandbooks,
    getDetailHandbookById
}