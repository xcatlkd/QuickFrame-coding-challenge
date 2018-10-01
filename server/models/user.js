import sql from "../util/sql";
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

const User = sql.define('user', {
	uuid: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV1,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING,
		notNull: true,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		notNull: true,
	}
}, {
	hooks: {
		beforeCreate: hashUserPassword,
		beforeUpdate: hashUserPassword,
	}
})

function hashUserPassword(user) {
	if (user.password) {
		return bcrypt.genSalt()
		.then(function(salt) {
			return bcrypt.hash(user.password, salt);
		})
		.then(function(hashedPassword) {
			user.password = hashedPassword;
		})
	}
};

User.signup = function(req) {
	return User.create({
		username: req.body.username,
		password: req.body.password,
	})
	.then((user) => {
		return user;
	})
}

User.prototype.comparePassword = function(password) {
	return bcrypt.compare(password, this.get("password"));
}

User.login = function(req) {

}

export default User;