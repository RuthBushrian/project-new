const db = require("../models/index");

const Manager= db.managers;



exports.getManagerByOfficerID=(id)=>{

    return  Manager.findOne(
        {
            include:
            [{
                model: db.officers,
                attributes:[] ,
                where:{idofficer:id}
            }],

            raw:true
        }
    );

};