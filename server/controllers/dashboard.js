const dashDal=require('../dal/dashboard');

exports.getLastFiles = (req, res) => {
    dashDal.getLastFiles(parseInt(req.params.num), parseInt(req.params.officerId))
    .then(data => {
        res.send(data);
        })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving files."
    });
    })

    };

    exports.getGrafOfFiles = (req, res) => {

        dashDal.getGrafOfFiles(parseInt(req.params.officerId))
        .then(data => {
            res.send(data);
            })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving data."
        });
        })
    };

    exports.getActiveFiles = (req, res) => {

        dashDal.getActiveFiles(parseInt(req.params.officerId))
        .then(data => {
            res.send(data);
            })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving data num of active files."
        });
        })
    
    };


    exports.getFakeFiles = (req, res) => {

        dashDal.getFakeFiles(parseInt(req.params.officerId))
        .then(data => {
            res.send(data);
            })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving data num of fake files."
        });
        })
        
    };


    exports.getUnderCheckFiles = (req, res) => {

        dashDal.getUnderCheckFiles(parseInt(req.params.officerId))
        .then(data => {
            res.send(data);
            })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving data num of under check files."
        });
        })
    
    };

    exports.getCheckedFiles = (req, res) => {

        dashDal.getCheckedFiles(parseInt(req.params.officerId))
        .then(data => {
            res.send(data);
            })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving data num of checked files."
        });
        })
    
    };