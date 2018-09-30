import sql from '../util/sql';
import Sequelize from 'sequelize';

const path = require('path');

const Video = sql.define('video', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: Sequelize.STRING,
	},
	description: {
		type: Sequelize.STRING,
	},
	author: {
		type: Sequelize.STRING,
	},
	date: {
		type: Sequelize.STRING,
	},
	duration: {
		type: Sequelize.STRING,
	},
	source: {
		type: Sequelize.STRING,
	},
});


export default Video;