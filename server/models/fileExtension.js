import sql from '../util/sql';
import Sequelize from 'sequelize';

import Video from "./video"

const FileExtension = sql.define('fileExtension', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	extension: {
		type: Sequelize.STRING,
		notNull: true,
	}
});

// Associations
// FileExtension.hasMany(Video);


export default FileExtension;