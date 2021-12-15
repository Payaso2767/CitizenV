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