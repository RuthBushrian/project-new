const db = require("../models/index");

const File= db.files;
const Stages= db.stages_of_progress_of_files;

const sequelize= require('sequelize');
const Op= sequelize.Op;


exports.getLastFiles= (numOfFiles, officerId)=>
{
    const statusOfChecked=2;////

    console.log("officerId", officerId);

    return Stages.findAll(
        {  
            include:
            [{
                model:File,  
                where:
                {
                    statusId:statusOfChecked,
                    officerId:officerId
                },
            }],
            raw:true,
            limit: parseInt(numOfFiles),
            order:[['date', 'DESC']], 
            where:
            {
                statusId:statusOfChecked

            }
            
        }
        )
};


exports.getGrafOfFiles = (officerId) => {

      return Stages.findAll({
        attributes: [
          [sequelize.fn('YEAR', sequelize.col('date')), 'year'],
          [sequelize.fn('SUM', sequelize.literal('CASE WHEN result = 0 THEN 1 ELSE 0 END')), 'red'],
          [sequelize.fn('SUM', sequelize.literal('CASE WHEN result = 1 THEN 1 ELSE 0 END')), 'green'],

        ],
        include: [{ model: File, attributes:[], where:{officerId:officerId}}],
        raw:true,
        where: { statusId: 2 },
        group: [sequelize.fn('YEAR', sequelize.col('date'))],
        order:[sequelize.fn('YEAR', sequelize.col('date'))],
      })
    };

exports.getActiveFiles = (officerId) => {

    return File.findAll({
        attributes: [
        [sequelize.fn('COUNT','*'),'num']
        ],
        where: { officerId: officerId ,statusId:{[Op.lte]:2 }}
    })
};

exports.getFakeFiles = (officerId) => {

    return File.findAll({
        attributes: [
        [sequelize.fn('COUNT','*'),'num']
        ],
        where: { officerId: officerId ,result:0}
    })
};

exports.getUnderCheckFiles = (officerId) => {

    return File.findAll({
        attributes: [
        [sequelize.fn('COUNT','*'),'num']
        ],
        where: { officerId: officerId ,statusId:1 }
    })
};

exports.getCheckedFiles = (officerId) => {

    return File.findAll({
        attributes: [
            [sequelize.fn('COUNT','*'),'num']
        ],
        where:  { officerId: officerId ,statusId:2}
    })
};








