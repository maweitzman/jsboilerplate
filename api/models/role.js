export default (sequelize, type) => {
    const Role = sequelize.define('Role', {
        id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
            notEmpty: true,
            unique: true
        },
        description: {
            type: type.STRING,
            allowNull: true,
            notEmpty: false
        }
    });

    Role.associate = (models) => {
        models.Role.belongsToMany(models.User, {through: 'UsersRoles'});
    }

    return Role;
}