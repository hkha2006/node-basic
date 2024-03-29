import bcrypt from 'bcryptjs';
import db from "../models/index"
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password'
                    }

                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }
            } else {
                userData.errCode = 1
                userData.errMessage = `Your's Email isn't exist.`

            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (error) {
            reject(error)

        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId && userId !== 'all') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId == 'all') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email)
            if (checkEmail) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already'
                })
            }
            else {
                let hashPass = await hashPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPass,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.image
                })
                resolve({
                    errCode: 0,
                    message: 'Create new user successed'
                })
            }
        }

        catch (error) {
            reject(error)
        }
    })
}

let salt = bcrypt.genSaltSync(10);
let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch (e) {
            reject(e)
        }

    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'User is not exist'
                })
            }
            else {
                await db.User.destroy({
                    where: { id: userId }
                })
                resolve({
                    errCode: 0,
                    message: 'User is deleted'

                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'User is not exist edit'
                });
            } else {
                await db.User.update(
                    {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        roleId: data.roleId,
                        positionId: data.positionId,
                        gender: data.gender,
                        phonenumber: data.phonenumber,
                        image: data.image
                    },
                    { where: { id: data.id } }

                )
                resolve({
                    errCode: 0,
                    message: 'User is updated'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }
            else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                })
                res.errCode = 0
                res.data = allcode
                resolve(res)

            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUserById: deleteUserById,
    updateUserById: updateUserById,
    getAllCodeService: getAllCodeService
}