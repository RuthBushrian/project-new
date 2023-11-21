const managerDal= require('../dal/manager')

   

exports.getManagerByOfficerID=(req, res)=>{
    const id =req.params.id;
    managerDal.getManagerByOfficerID(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find manager with Officer id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving manager with Officer id=" + id
        });
    });
}