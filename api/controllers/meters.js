const Meter =  require('../models/meter');
const mongoose = require('mongoose');

exports.meters_get_all = (req,res,next)=>{
    Meter
    .find()
    .select('SerialNumber ReadingDateTime WH VARH')
    .exec()
    .then(docs=> {
        //console.log(docs);
        const response = {
            meters: docs
        };
        res.status(200).json(response);
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({err:error});
    });
}
exports.create_meters = (req, res, next) => {
    const meter = new Meter({
        _id: new mongoose.Types.ObjectId(),
        ID: req.body.ID,
        SerialNumber: req.body.SerialNumber,
        ReadingDateTime: req.body.ReadingDateTime,
        WH: req.body.WH,
        VARH: req.body.VARH
    });
    
    meter
        .save()
         .then(result => {
            console.log(result);
            res.status(201).json({
             message: "Created meter successfully",
            createdMeter: {
            SerialNumber: result.SerialNumber,
            ReadingDateTime: result.ReadingDateTime,
            WH :result.WH,
            VARH :result.VARH
 
        }
        });
        })
        .catch(error => console.log(error));
        res.status(500).json({
            err:error
        })
}
exports.delete_metersByID = (req,res,next)=>{
    const id=req.params.meterid;
    Meter
    .deleteOne({_id:id})
    .exec()
    .then(result =>{
        console.log("From database", result);
        res.status(200).json({
            meter: result,
            request: {
                type: 'GET',
                url: 'http://localhost:9000/meters'
            }
        });

    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            err:error
        });
    });
}
exports.get_meterBySerialNumber = (req, res, next) => {
    const id = req.params.meterid;
    Meter
    .find({"SerialNumber": id}) 
    .exec()
    .then(docs => {
        const response = {
            meters:docs.map(doc =>{
             return {
                        ID: doc.ID, 
                         ReadingDateTime :doc.ReadingDateTime,
                          WH :  doc.WH
            };
         })
          };
        if(docs){
        res.status(200).json(response);
        }
        else {
         res.status(404).json({message:"No record found for this id."});
        }
    })
    .catch(error => 
     {
        console.log(error);
        res.status(500).json({err: error});
     })
    }