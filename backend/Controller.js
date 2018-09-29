// ============ Random Dependencies ==========
const express = require('express')
const app = express()
const log = require('fancy-log')
const argv = require('yargs').argv
const {p = 3000 , port = p} = argv
const bodyParser = require('body-parser')
const logger = (message, {MODULE, STATUS, MESSAGE}={}) => {
    log('Controller - '+message)
}
// ============ Architecture Classes ==========
const AuthorizationService = require('./AuthorizationService')
const UserCatalog = require('./UserCatalog')

// ============ Allow Requests from a Browser ==========
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.get('/', (req, res) => {
    res.status(200)
    res.json({message: 'healthy'})
    logger('GET - [/] ')
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    AuthorizationService.AuthorizeUser(email,password, function({status, results}){
        if(status == 1){
            res.status(400)
            res.json({status, results, message: 'Bad Credentials'})
            logger(`POST - [/login] - ${400} - ${email} `)
        } else {
            res.status(200)
            res.json({status, results, message: 'Welcome'})
            logger(`POST - [/login] - ${200} - ${email} `)
        }
    })
})

app.post('/logout', async (req, res) => {
    const {email} = req.body
    UserCatalog.SetIsActive(email,0,(result)=>{
        res.status(200)
        res.json({status: 'logged out'})
        logger(`POST - [/logout] - ${200} - ${email} `)
    })
})

app.post('/createnewuser', async (req, res) => {
    const {password,
        isActive,
        firstName,
        lastName,
        physicalAddress,
        email,
        phoneNumber, isAdmin} = req.body

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
})

app.post('/loggedusers', async (req, res) => {
    const {isAdmin} = req.body

    
    UserCatalog.ViewLoggedInUsers(function(results){
        if(isAdmin){
            const message = `Ok`
            res.status(200)
            res.json({status: 0, results: results.users})
            logger(`POST - [/loggedusers] - ${200} - ${message}`)
        } else {
            const message = `You're not an admin`
            res.status(400)
            res.json({status: 1, results: [], message})
            logger(`POST - [/loggedusers] - ${400} - ${message}`)
        }
    })
})
    
app.listen(port, ()=> {
    logger('backend started on port '+port)
})

module.exports = app;