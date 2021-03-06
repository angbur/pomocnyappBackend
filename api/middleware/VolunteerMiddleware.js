const jwt=require('jsonwebtoken');
const VolunteerModel = require('../models/VolunteerModel');


exports.Userdata= function (req,res,next) {
    const token = req.header('auth-token');

    try {
        if (!token) throw new Error ('Odmowa dostępu. Operacja możliwa tylko dla zalogowanego użytkownika.');
       jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            if(err) {
                console.log(err);
                throw new Error ('Odmowa dostępu. Nieprawidłowy token');
            } else {
                req.user = decoded
            }
        });
        next();
    }
    catch (error) {
        res.status(400).send({message:error.message})
    }

},

exports.loggedVolunteer= async function (req,res,next) {
    const token = req.header('auth-token');
    let volunteer
    let verifiedUserId;
    try {
        if (!token) {
            res.status(401)
            throw new Error ('Odmowa dostępu. Operacja możliwa tylko dla zalogowanego użytkownika.');
        }
        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            if(err) {
                console.log(err);
                throw new Error ('Odmowa dostępu. Nieprawidłowy token');
            } else {
                verifiedUserId = decoded._id
            }
        });

        volunteer = await VolunteerModel.findById(req.params.id).populate('user').catch((err)=> {
            res.status(404)
            throw new Error("Podany wolontariusz nie istnieje");
        });

        if(!volunteer) {
            res.status(404)
            throw new Error("Podany wolontariusz nie istnieje");
        }

        if(verifiedUserId !== volunteer.user.id) {
            res.status(403)
            throw new Error('Odmowa dostępu. Bak możliwości zmiany danych dla tego użytkownika')
        } 
        next();
    }
    catch (error) {
        res.send({message:error.message})
    }
}