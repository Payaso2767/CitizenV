module.exports = (sequelize, Sequelize) => {
    const Info = sequelize.define("info", {
        ID: {
            type: Sequelize.STRING(12),
            primaryKey: true
        },
        full_name: {
            type: Sequelize.STRING(100)
        },
        birth: {
            type: Sequelize.DATE
        },
        gender: {
            type: Sequelize.STRING(100)
        },
        place_origin_province: {
            type: Sequelize.STRING(2)
        },
        place_origin_district: {
            type: Sequelize.STRING(3)
        },
        palce_origin_commune: {
            type: Sequelize.STRING(5)
        },
        perm_residence_province: {
            type: Sequelize.STRING(2)
        },

        perm_residence_district: {
            type: Sequelize.STRING(3)
        },

        perm_residence_commune: {
            type: Sequelize.STRING(5)
        },
        
        temp_residence_province: {
            type: Sequelize.STRING(2)
        },

        temp_residence_district: {
            type: Sequelize.STRING(3)
        },

        temp_residence_commune: {
            type: Sequelize.STRING(5)
        },
        religion: {
            type: Sequelize.STRING(100)
        },
        edu_level: {
            type: Sequelize.STRING(100)
        },
        occupation: {
            type: Sequelize.STRING(100)
        }
    }, 
    {
        timestamps: true
    });
    return Info;
};