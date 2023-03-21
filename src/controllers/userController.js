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
    console.log(users)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser
}