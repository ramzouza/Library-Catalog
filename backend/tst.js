const UserCatalog = require('./UserCatalog')
const User = require('./User')
const Auth = require('./AuthorizationService')

// Auth.MakeNewUser('admin', 1,'administrator', 'administrator', "here","admin@gmail.com","4123424",1,console.log)


//Auth.CanUserDoThis(1,'Admin',console.log) // works ?
UserCatalog.GetUserById(1,console.log);
/*
Auth.CanUserDoThis('jon@jonmongeau.com',"Admin", ({status, results}) => { 
    if (results.canDo){
        AuthorizationService.MakeNewUser(password,
            isActive,
            firstName,
            lastName,
            physicalAddress,
            email,
            phoneNumber,isAdmin, function({status, message}){
            if(status == 1){
                res.status(400)
                res.json({status, message})
                logger(`POST - [/createnewuser] - ${400} - ${email} `)
            } else {
                res.status(200)
                res.json({status, message})
                logger(`POST - [/createnewuser] - ${200} - ${email} `)
            }
        })
    } else{ // kkkk yeah its that
        res.status(200)
        res.json({status: 0, message:'hi yanis'})
        console.log('hi yanis'); 
    }
})*/