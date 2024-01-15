const dbConfig = require('../dbConfig/dbConfig');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.officers = require('./officer.js')(sequelize, DataTypes)
db.files = require('./file.js')(sequelize, DataTypes)
db.statuses = require('./status.js')(sequelize, DataTypes)
db.documents=require('./document.js')(sequelize, DataTypes);
db.companies=require('./company.js')(sequelize, DataTypes);
db.managers=require('./manager.js')(sequelize, DataTypes);
db.document_results=require('./document_result.js')(sequelize, DataTypes);
db.stages_of_progress_of_files=require('./stages_of_progress_of_file.js')(sequelize, DataTypes);
db.languages= require('./language')(sequelize, DataTypes);

db.managers.belongsTo(db.companies, {foreignKey:'companyId'})
db.officers.belongsTo(db.managers, {foreignKey:'managerId'})
db.files.belongsTo(db.statuses, {foreignKey:'statusId'})
db.files.belongsTo(db.officers, {foreignKey:'officerId'})
db.documents.belongsTo(db.files, {foreignKey:'fileId', onDelete: 'Cascade', onUpdate: 'Cascade'})
db.documents.belongsTo(db.languages, {foreignKey:'languageId'})
db.document_results.belongsTo(db.documents,{foreignKey:'documentId', onDelete: 'Cascade', onUpdate: 'Cascade'} )
db.stages_of_progress_of_files.belongsTo(db.statuses, {foreignKey:'statusId'})
db.stages_of_progress_of_files.belongsTo(db.files, { foreignKey: 'fileId', onDelete: 'Cascade', onUpdate: 'Cascade'})
db.files.hasMany(db.stages_of_progress_of_files, { foreignKey: 'fileId', onDelete: 'Cascade', onUpdate: 'Cascade'})
db.files.hasMany(db.documents, { foreignKey: 'fileId', onDelete: 'Cascade', onUpdate: 'Cascade'})
db.managers.hasMany(db.officers, { foreignKey: 'managerId'})



db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })
module.exports = db;
