import userService from "../services/userService"
let handleLogin = async (req, res) => {
    // lấy giá trị từ client truyền lên
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs para'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    // kiểm tra email tồn tại
    // so sánh pass
    // trả về thông tin người dùng
    // token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (req, res) => {
    // let id = req.body.id; //ALL || Id
    let id = req.query.id;
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    // console.log(message)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (req.body.id) {
        let message = await userService.deleteUserById(req.body.id);
        return res.status(200).json(message)
    }
    else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing para',
        })
    }
}
let handleUpdateUser = async (req, res) => {
    let message = await userService.updateUserById(req.body)
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data)

    } catch (error) {
        console.log('get all code error', error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser,
    getAllCode: getAllCode
}