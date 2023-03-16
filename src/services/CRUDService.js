import bcrypt from 'bcryptjs';
import db from '../models/index';

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPass = await hashPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPass,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('Oke Succeed')
        } catch (e) {
            reject(e)
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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }

        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve()
            } else {
                resolve();
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                await user.destroy();
                resolve()
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}