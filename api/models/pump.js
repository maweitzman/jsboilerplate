export default (sequelize, type) => {
    const Pump = sequelize.define('Pump', {
        id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
            notEmpty: true
        }
    });

    return Pump;
};