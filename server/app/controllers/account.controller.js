const db = require("../models");
const Account = db.account;
const sequelize = db.sequelize

// Create and Save a new account
exports.create = async (req, res) => {
	const accountData = req.body
	if (!accountData.username || !accountData.password || !accountData.role) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	let result = await Account.findAll({
		where: {
			username: accountData.username 
		}
	})

	if (result.length !== 0) {
		res.status(406).send({ message: "There is an account registered with given information. Please check username" })
	} else {
		try {
			const account = {
				username: accountData.username,
				password: accountData.password,
				role: accountData.role,
                province: accountData.province,
                district: accountData.district,
                commune: accountData.commune,
				locked: false,
			};
			await Account.create(account)

			res.status(201).send({ message: 'Signup successfully' })
		} catch (err) {
			res.status(500).send({
				error: err.message || "Some error occurred while creating the account."
			});
		}
	}
}

exports.findOne = (req, res) => {
	const username = req.params.username;

	Account.findByPk(username)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving account with id=" + id
        });
    });
};

exports.findAll = (req, res) => {
	condition = req.query
	Account.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving accounts."
        });
    });
};

exports.findByType = (req, res) => {
	const searchType = req.params.type;

	Account.findOne({ where: { role: searchType } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "No account with " + searchType + " found!"
        });
    });
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Account.destroy({
		where: { id: id }
	})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Account was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete account with id=${id}. Maybe account was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete account with id=" + id
        });
    });
};

exports.edit = (req, res) => {
	const username = req.params.username;

	Account.update(req.body, {
		where: { username }
	})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "account was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update account with username=${username}. Maybe account was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating account with username=" + username
        });
    });
};



