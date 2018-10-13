// ============ Random Dependencies ==========
const express = require('express')
const app = express()
const log = require('fancy-log')
const argv = require('yargs').argv
const { p = 3000, port = p, withlog } = argv
const bodyParser = require('body-parser')
const logger = (message) => {
    withlog ? log('Controller - ' + message) : null
}
// ============ Architecture Classes ==========
const AuthService = require('./AuthService')
const UserCatalog = require('./UserCatalog')
const ResourceCatalog = require('./ResourceCatalog')

// ============ Allow Requests from a Browser ==========
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, id");
    next()
})

app.get('/', (req, res) => {
    res.status(200)
    res.json({ message: 'healthy' })
    logger('GET - [/] ')
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    const { status, results } = AuthService.AuthenticateUser(email, password);
    if (status == 1) {
        res.status(400)
        res.json({ status, results, message: 'Bad Credentials' })
        logger(`POST - [/login] - ${400} - ${email} `)
    } else {
        res.status(200)
        res.json({ status, results, message: 'Welcome' })
        logger(`POST - [/login] - ${200} - ${email} `)
    }
})

app.post('/disconnect', (req, res) => {
    const { id } = req.body
    const { status, error } = UserCatalog.SetIsActive(id, 0)
    const ok = status === 0
    res.status(ok ? 200 : 500)
    res.json({ status: ok ? 'logged out' : 'an error occured', error })
    logger(`POST - [/disconnect] - ${200} - ${id} `)
})

app.post('/connect', (req, res) => {
    const { id } = req.body
    const { status, error } = UserCatalog.SetIsActive(id, 1)
    const ok = status === 0
    res.status(ok ? 200 : 500)
    res.json({ status: ok ? 'logged out' : 'an error occured', error })
    logger(`POST - [/connect] - ${200} - ${id} `)
})
/*
{
	"password":"1234567890",
	"isActive":0,
	"firstName":"Mr.",
	"lastName":"Admin",
	"physicalAddress":"123",
	"email":"admin3gmail.com",
	"phoneNumber":"123 123 1234",
	"isAdmin": 1

}
*/
app.post('/createnewuser',  (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.body.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, requiresAdmin=true);
    if (!auth.isAuthorized){
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`POST - [/createnewuser] - ${400} - ${sender_id} `)
    }
    
    // declare user data
    const user = {
        password,
        isActive,
        firstName,
        lastName,
        physicalAddress,
        email,
        phoneNumber, isAdmin
    } = req.body;

    // hash the password and delete the password
    user.password_hash = AuthService.bestHashEver(password);
    delete user.password;

    // make the user
    const {status, message, error, results} = UserCatalog.MakeNewUser(user);

    if(status == 1){
        res.status(400)
        res.json({status, message, error})
        logger(`POST - [/createnewuser] - ${400} - ${sender_id} `)
    } else {
        res.status(200)
        res.json({status, message, user_id: results.insertId, error})
        logger(`POST - [/createnewuser] - ${200} - ${sender_id} `)
    }
})

app.delete('/deleteuser', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.body.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, requiresAdmin=true);
    if (!auth.isAuthorized){
        res.status(400)
        res.json({status:1, message:"Not Authorized"})
        logger(`POST - [/deleteuser] - ${400} - ${sender_id} `)
    }

    const deleted_user_id = req.body.user_id;

    const {status, message, error } = UserCatalog.DeleteUserById(deleted_user_id);
    if(status == 1){
        res.status(400)
        res.json({status, message, error})
        logger(`POST - [/deleteuser] - ${400} - ${sender_id} `)
    } else {
        res.status(200)
        res.json({status, message, error})
        logger(`POST - [/deleteuser] - ${200} - ${sender_id} `)
    }
})

app.post('/loggedusers', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, requiresAdmin = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized",results:[] })
        logger(`POST -  [/loggedusers] - ${400} - ${sender_id} `)
    } else {
        const { users } = UserCatalog.ViewLoggedInUsers()
        const message = `Ok`
        res.status(200)
        res.json({ status: 0, results: users, message })
        logger(`POST - [/loggedusers] - ${200} - ${message}`)
    }
    
})


// MAKE NEW RESOURCE
app.post('/resources', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.header.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, requiresAdmin = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`POST -  [/resources] - ${400} - ${sender_id} `)
    }

    // get resource data and their type
    const { resource_data , type } = req.body;
    
    // make new resource
    const {status, message, results, error} = ResourceCatalog.MakeNewResource(resource_data, type);
    
    if(status == 1){
        res.status(400)
        res.json({status, message, error})
        logger(`POST - [/resources] - ${400} - ${sender_id} `)
    } else {
        res.status(200)
        res.json({status, message, results})
        logger(`POST - [/resources] - ${200} - ${sender_id} `)
    }


})

// GET ALL RESOURCES
app.get('/resources', (req,res) => {
    // check if the sender is authenticated
    const sender_id = req.header.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, requiresAdmin = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`GET -  [/resources] - ${400} - ${sender_id} `)
    }

    // get resources here
    const resource_list = ResourceCatalog.GetAllResources();
    console.log({resource_list})
    res.status(200);
    res.json({"results":resource_list});
    logger(`GET - [/resources] - ${200} - ${sender_id} `);
})

// EDIT resource by resource_ID
/*app.put('/resources', (req,res) => {
    // check if the sender is authenticated
    const sender_id = req.header.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, requiresAdmin = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`PUT -  [/resources] - ${400} - ${sender_id} `)
    }

    // get resource data and their type
    const { resource_id, resource_data , type } = req.body

    // Edit the Resource
    const {status, message, results, error} = ResourceCatalog.EditResource(resource_id, resource_data, type);

    if(status == 1){
        res.status(400);
        res.json({status, message, error});
        logger(`PUT - [/resources] - ${400} - ${sender_id} `);
    } else {
        res.status(200);
        res.json({status, message, results});
        logger(`PUT - [/resources] - ${200} - ${sender_id} `);
    }

})*/
app.put('/resources', (req,res) => {
    // check if the sender is authenticated
    const sender_id = req.header.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, requiresAdmin = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`PUT -  [/resources] - ${400} - ${sender_id} `)
    } else {
            // get resource data and their type
        const { id, title } = req.body.resource_data
        // Edit the Resource
        const {status, message, results, error} = ResourceCatalog.EditResource(id, title);

        if(status == 1){
            res.status(400);
            res.json({status, message, error});
            logger(`PUT - [/resources] - ${400} - ${sender_id} `);
        } else {
            res.status(200);
            res.json({status, message, results});
            logger(`PUT - [/resources] - ${200} - ${sender_id} `);
        }
    }
})

// Delete resource by resource_ID
app.delete('/resources', (req,res) => {
    // check if the sender is authenticated
    const sender_id = req.header.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, requiresAdmin = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`PUT -  [/resources] - ${400} - ${sender_id} `)
    } else {
        // get resource data and their type
        const { resource_id } = req.body;


        // Edit the Resource
        const {status, message, results, error} = ResourceCatalog.DeleteResource(resource_id);

        if(status == 1){
            res.status(400);
            res.json({status, message, error});
            logger(`DELETE - [/resources] - ${400} - ${sender_id} `);
        } else {
            res.status(200);
            res.json({status, message, results});
            logger(`DELETE - [/resources] - ${200} - ${sender_id} `);
        }
    }

})





server = app.listen(port, () => {
    logger('backend started on port ' + port)
})
 
module.exports = server;
