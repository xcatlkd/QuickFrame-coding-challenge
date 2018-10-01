import sql from "../util/sql";
import Sequelize from 'sequelize';

import Video from "./video";

const FileMetaData = sql.define('fileMetaData', {
	data: {
		type: Sequelize.JSON
	}
})

export default FileMetaData;