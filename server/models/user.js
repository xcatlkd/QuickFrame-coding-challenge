import sql from "../util/sql";
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

const User = sql.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
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

function signup(user) {
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

function login(user) {

}

export default User;