const db = require("../models");
const Info = db.info;
const sequelize = db.sequelize

exports.create = async (req, res) => {
	const infoData = req.body
	if (!infoData.ID || !infoData.full_name || !infoData.birth || !infoData.gender || !infoData.place_origin_province || !infoData.place_origin_district || !infoData.palce_origin_commune
        || !infoData.perm_residence_province || !infoData.perm_residence_district || !infoData.perm_residence_commune || !infoData.religion || !infoData.edu_level || !infoData.occupation) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	let result = await Info.findAll({
		where: {
			ID: infoData.ID 
		}
	})

	if (result.length !== 0) {
		res.status(406).send({ message: "There is an info registered with given information. Please check ID" })
	} else {
		try {
			const info = {
				ID: infoData.ID,
				full_name: infoData.full_name,
				birth: infoData.birth,
				gender: infoData.gender,
                place_origin_province: infoData.place_origin_province,
                place_origin_district: infoData.place_origin_district,
                palce_origin_commune: infoData.palce_origin_commune,
                perm_residence_province: infoData. perm_residence_province,
                perm_residence_district: infoData.perm_residence_district,
                perm_residence_commune: infoData.perm_residence_commune,
                temp_residence_province: infoData.temp_residence_province,
                temp_residence_district: infoData.temp_residence_district,
                temp_residence_commune: infoData.temp_residence_commune,
                religion: infoData.religion,
                edu_level: infoData.edu_level,
                occupation: infoData.occupation,
			};
			await Info.create(info)

			res.status(201).send({ message: 'Khai báo thành công' })
		} catch (err) {
			res.status(500).send({
				error: err.message || "Đã xảy ra lỗi. Vui lòng kiểm tra lại dữ liệu."
			});
		}
	}
}

exports.findOne = (req, res) => {
	const id = req.params.id;

	Info.findByPk(id)
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
	Info.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving information."
        });
    });
};

exports.findByID = (req, res) => {
	const searchType = req.params.id;

	Info.findOne({ where: { ID: searchType } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "No info with ID " + searchType + " found!"
        });
    });
};

exports.findByName = (req, res) => {
	const searchType = req.params.full_name;

	Info.findAll({ where: { full_name: searchType } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "No info with name " + searchType + " found!"
        });
    });
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Info.destroy({
		where: { id: id }
	})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Info was deleted successfully!"
            });
        } else {
            res.send({
                message: "Cannot delete account with id=${id}. Maybe account was not found!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete id= " + id
        });
    });
};

exports.edit = (req, res) => {
	const ID = req.params.id;
    console.log(ID)
	Info.update(req.body, {
		where: { ID }
	})
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Updated successfully."
            });
        } else {
            res.send({
                message: "Cannot update ID=${ID}. Maybe info was not found or req.body is empty!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating info with ID= " + ID
        });
    });
};

exports.getInfofollowCommune = (req, res) => {
	const commune = req.params.commune;

	Info.findAll({ where: { perm_residence_commune: commune } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "No info with ID " + searchType + " found!"
        });
    });
};

exports.getInfofollowDistrict = (req, res) => {
	const district = req.params.district;

	Info.findAll({ where: { perm_residence_district: district } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "No info with ID " + searchType + " found!"
        });
    });
};