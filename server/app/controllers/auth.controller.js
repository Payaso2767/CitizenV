const db = require('../models')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.config')
const bcrypt = require('bcryptjs')

exports.signIn = async (req, res) => {
    const Account = db.account

    let account = req.body

    let username = account.username
    let password = account.password
    console.log(account)
    try {
        let result = await Account.findAll({
            where: {
                username
            }
        })

        if (result.length > 0) {
            let account = result[0].dataValues;
            if (bcrypt.compare(password, account.password)) {
                    let token = jwt.sign({ username: account.username, accountType: account.accountType }, authConfig.secret, {
                        expiresIn: "1d"
                    })

                    res.status(202).send({
                        username: account.username,
                        accountType: account.accountType,
                        token,
                        account: account
                    })
            } else {
                res.status(401).send({ message: 'Invalid username or password2' })
            }
        } else {
            res.status(400).send({ message: 'Invalid username or password3' })
        }
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

