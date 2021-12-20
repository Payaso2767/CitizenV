module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
        username: {
            type: Sequelize.STRING(20),
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING(100)
        },
        role: {
            type: Sequelize.STRING(10)
        },
        province: {
            type: Sequelize.STRING(2),
            defaultValue: null
        },
        district: {
            type: Sequelize.STRING(3),
            defaultValue: null
        },
        commune: {
            type: Sequelize.STRING(5),
            defaultValue: null
        },
        locked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    }, 
    {
        timestamps: true
    });
    return Account;
};