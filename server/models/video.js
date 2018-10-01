import sql from '../util/sql';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import ffprobe from 'ffprobe';

import FileMetaData from './fileMetaData';

const path = require('path');
const DB_HYDRATE_KEY = process.env.DB_HYDRATE_KEY;
const TEST_DATA = "./testdata.json";

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
		type: Sequelize.DATE,
	},
	duration: {
		type: Sequelize.INTEGER,
	},
	source: {
		type: Sequelize.STRING,
	}
}, {
	hooks: {
		beforeCreate: getMetaData,
		beforeUpdate: getMetaData
	}
});


// Associations
FileMetaData.belongsTo(Video);

function getMetaData(video) {
	ffprobe(video.source, function(error, info) {
		if (error) {
			return done(error);
		} else {
			Video.createMetaFile(info);
			console.log("Meta Data returned successfully from ffprobe: ", info);
		}
	})
}

Video.prototype.createMetaFile = function(video) {
	return FileMetaData.upsert(info)
	.then("Meta Data file created for video; ", this.title);
}

function hydrateDB(req) {
	if (DB_HYDRATE_KEY === req.body.dbkey) {
		console.log("Database being hydrated.");
		// write forEach function here to insert entries into the db

	}
}

export default Video;