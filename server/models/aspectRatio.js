import sql from "../util/sql";
import Sequelize from 'sequelize';

import Video from "./video";

const AspectRatio = sql.define('aspectRatio', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	ratio: {
		type: Sequelize.STRING,
		notNull: true
	}
});

// Associations
// AspectRatio.hasMany(Video);

export default AspectRatio;