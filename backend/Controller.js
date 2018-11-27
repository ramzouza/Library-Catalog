// ============ Random Dependencies ==========
const express = require('express')
const app = express()
const log = require('fancy-log')
const argv = require('yargs').argv
const { p = 3000, port = p, withlog } = argv
const bodyParser = require('body-parser')
const picSearch = require('./Users/ImageSearch')
const logger = (message) => {
    withlog ? log('Controller - ' + message) : null
}
// ============ Architecture Classes ==========
const AuthService = require('./Users/AuthService')
const UserCatalog = require('./Users/UserCatalog')
const ResourceCatalog = require('./Resources/ResourceCatalog')
const LoanService = require('./Resources/LoanService')
const UnitOfWork = require('./Resources/UnitOfWork')
const TransactionLogger = require('./Resources/TransactionLogger')
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

app.get('/url/:query', (req, res) => {
    const query = req.params.query
    picSearch(query, ({error, url}) => {
        res.status(error ? 500 : 200)
        res.json({ message: error ? error : 'ok' ,url })
        logger('GET - [/url] - '+query)
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    const { status, results, message } = AuthService.AuthenticateUser(email, password)
    if (status == 1) {
        res.status(400)
        res.json({ status, results, message })
        logger(`POST - [/login] - ${400} - ${email} `)
    } else {
        res.status(200)
        res.json({ status, results, message })
        logger(`POST - [/login] - ${200} - ${email} `)
    }
})

app.post('/disconnect', (req, res) => {
    const id = req.body.id;
    const { status, error } = UserCatalog.SetIsActive(id, 0)
    const ok = status === 0
    res.status(ok ? 200 : 500)
    res.json({ status: ok ? 'logged out' : 'an error occured', error })
    logger(`POST - [/disconnect] - ${200} - ${id} `)
})

app.post('/connect', (req, res) => {
    const id = req.body.id;
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
app.post('/createnewuser', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.body.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
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
        phoneNumber,
        isAdmin
    } = req.body;

    // hash the password and delete the password
    user.password_hash = AuthService.bestHashEver(password);
    delete user.password;

    // make the user
    const { status, message, error, results } = UserCatalog.MakeNewUser(user);

    if (status == 1) {
        res.status(400)
        res.json({ status, message, error })
        logger(`POST - [/createnewuser] - ${400} - ${sender_id} `)
    } else {
        res.status(200)
        res.json({ status, message, user_id: results.insertId, error })
        logger(`POST - [/createnewuser] - ${200} - ${sender_id} `)
    }
})

app.delete('/deleteuser', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.body.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`POST - [/deleteuser] - ${400} - ${sender_id} `)
    }

    const deleted_user_id = req.body.user_id;

    const { status, message, error } = UserCatalog.DeleteUserById(deleted_user_id);
    if (status == 1) {
        res.status(400)
        res.json({ status, message, error })
        logger(`POST - [/deleteuser] - ${400} - ${sender_id} `)
    } else {
        res.status(200)
        res.json({ status, message, error })
        logger(`POST - [/deleteuser] - ${200} - ${sender_id} `)
    }
})

app.post('/loggedusers', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized", results: [] })
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
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`POST -  [/resources] - ${400} - ${sender_id} `)
    }

    // get resource data and their type
    const { resource_data, type } = req.body;

    // make new resource
    const { status, message, results, error } = ResourceCatalog.MakeNewResource(resource_data, type, sender_id);
    if (status == 1) {
        res.status(400)
        res.json({ status, message, error })
        logger(`POST - [/resources] - ${400} - ${sender_id} `)
    } else {
        res.status(200)
        res.json({ status, message, results })
        logger(`POST - [/resources] - ${200} - ${sender_id} `)
    }


})

// GET ALL RESOURCES
app.get('/resources', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    // const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    // if (!auth.isAuthorized) {
    //     res.status(400)
    //     res.json({ status: 1, message: "Not Authorized" })
    //     logger(`GET -  [/resources] - ${400} - ${sender_id} `)
    // }
    // get resources here
    const resource_list = ResourceCatalog.GetAllResources();
    res.status(200);
    res.json({ "results": resource_list.results });
    logger(`GET - [/resources] - ${200} - ${sender_id} `);
})

app.get('/author', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    // const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    // if (!auth.isAuthorized) {
    //     res.status(400)
    //     res.json({ status: 1, message: "Not Authorized" })
    //     logger(`GET -  [/authors] - ${400} - ${sender_id} `)
    // }

    // get authors here
    const resource_list = ResourceCatalog.getAllAuthors();
    res.status(200);
    res.json({ "results": resource_list });
    logger(`GET - [/authors] - ${200} - ${sender_id} `);
})

app.get('/director', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    // const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    // if (!auth.isAuthorized) {
    //     res.status(400)
    //     res.json({ status: 1, message: "Not Authorized" })
    //     logger(`GET -  [/director] - ${400} - ${sender_id} `)
    // }

    // get director here
    const resource_list = ResourceCatalog.getAllDirectors();
    res.status(200);
    res.json({ "results": resource_list });
    logger(`GET - [/director] - ${200} - ${sender_id} `);
})

app.get('/publisher', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    // const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    // if (!auth.isAuthorized) {
    //     res.status(400)
    //     res.json({ status: 1, message: "Not Authorized" })
    //     logger(`GET -  [/director] - ${400} - ${sender_id} `)
    // }

    // get publisher here
    const resource_list = ResourceCatalog.getAllPublishers();
    res.status(200);
    res.json({ "results": resource_list });
    logger(`GET - [/director] - ${200} - ${sender_id} `);
})

app.get('/artist', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    // const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    // if (!auth.isAuthorized) {
    //     res.status(400)
    //     res.json({ status: 1, message: "Not Authorized" })
    //     logger(`GET -  [/director] - ${400} - ${sender_id} `)
    // }

    // get artist here
    const resource_list = ResourceCatalog.getAllArtists();
    res.status(200);
    res.json({ "results": resource_list });
    logger(`GET - [/director] - ${200} - ${sender_id} `);
})
// EDIT resource by resource_ID
app.put('/resources', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`PUT -  [/resources] - ${400} - ${sender_id} `)
    }

    // get resource data and their type
    const { resource_id, resource_data, type } = req.body
    console.log('putting', { resource_id, resource_data, type })
    // Edit the Resource
    const { status, message, results, error } = ResourceCatalog.EditResource(resource_id, resource_data, type, sender_id);

    if (status == 1) {
        res.status(400);
        res.json({ status, message, error });
        logger(`PUT - [/resources] - ${400} - ${sender_id} `);
    } else {
        res.status(200);
        res.json({ status, message, results });
        logger(`PUT - [/resources] - ${200} - ${sender_id} `);
    }

})

// Delete resource by resource_ID
app.delete('/resources', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`PUT -  [/resources] - ${400} - ${sender_id} `)
    } else {
        // get resource data and their type
        const { resource_id, resource_data, type } = req.body;


        // Edit the Resource
        const { status, message, results, error } = ResourceCatalog.DeleteResource(resource_id, resource_data, type, sender_id);

        if (status == 1) {
            res.status(400);
            res.json({ status, message, error });
            logger(`DELETE - [/resources] - ${400} - ${sender_id} `);
        } else {
            res.status(200);
            res.json({ status, message, results });
            logger(`DELETE - [/resources] - ${200} - ${sender_id} `);
        }
    }

})


app.post('/addLineItem', (req, res) => {

    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`POST -  [/addLineItem] - ${400} - ${sender_id} `)
    }
    // get resources here
    const { resource_id } = req.body;
    const { message, lineItem } = ResourceCatalog.addLineItem(resource_id);
    res.json({ "results": message, "lineItem": lineItem });
    logger(`POST - [/addLineItem] - ${200} - ${sender_id} `)
})

app.post('/loanItem', (req, res) => {

    const { userId, item } = req.body;// will userId suceed if no data sent.
    const auth = AuthService.AuthorizeUser(userId, requiresAdmin = false);

    const { status, message, info } = LoanService.loanItem(userId, item, auth.isAuthorized);
    res.json({ "status": status, "message": message, "info": info });
    logger(`POST - [/loanItem] - ${200} - ${userId} `)
});

app.post('/returnItem', (req, res) => {

    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`POST -  [/returnItem] - ${400} - ${sender_id} `)
    }
    // get resources here
    const { itemId } = req.body;
    const { status } = LoanService.returnItem(auth.isAuthorized, itemId);
    res.json({ "status": status });
    logger(`POST - [/returnItem] - ${200} - ${sender_id} `)
})

app.post('/deleteLineItem', (req, res) => {

    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`PUT -  [/deleteLineItem] - ${400} - ${sender_id} `)
    }
    // get resources here
    const { resource_line_item_id } = req.body;
    const message = ResourceCatalog.deleteLineItem(resource_line_item_id);

    res.json({ "results": message });
    logger(`GET - [/deleteLineItem] - ${200} - ${sender_id} `)
})


// Search for resources:
// the body of the request contains a json with a key called 'type' which determines
// what type of resource the client is searching for and it also contains all possible
// object attributes as keys in the json to help conduct the search.
app.post('/resource', (req, res) => {

    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    // const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    // if (!auth.isAuthorized) {
    //     res.status(400)
    //     res.json({ status: 1, message: "Not Authorized" })
    //     logger(`PUT -  [/resources] - ${400} - ${sender_id} `)
    // }
    // get resources here
    const { resource_data, isFilter } = req.body;
    const advancedInfo = ResourceCatalog.SearchResource(resource_data, isFilter);
    console.log(1);
    res.json({ "results": advancedInfo });
    logger(`POST - [/resource] - ${200} - ${sender_id} `);

})


//View whats is in the Unit of Work.
app.post('/cart', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized", results: [] })
        logger(`POST -  [/cart] - ${400} - ${sender_id} `)
    } else {
        const cart = UnitOfWork.ViewUnitOfWork(sender_id);
        console.log({ cart })
        const message = `Ok`
        res.status(200)
        res.json({ status: 0, results: cart, message })
        logger(`POST - [/cart] - ${200} - ${sender_id}`)
    }

})

app.post('/UserCart', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, requiresAdmin = true);
    if (!auth.isAuthorized) {
        const cart = UnitOfWork.ViewUnitOfWork(sender_id);
        console.log({ cart })
        const message = `Ok`
        res.status(200)
        res.json({ status: 0, results: cart, message })
        logger(`POST - [/UserCart] - ${200} - ${message}`)
    }

})

app.delete('/cartItem', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized" })
        logger(`PUT -  [/resources] - ${400} - ${sender_id} `)
    } else {
        // get resource data and their type
        const { index } = req.body;

        // Edit the Resource
        const { status, message, results, error } = UnitOfWork.RemoveItem(index, sender_id);
        if (status == 1) {
            res.status(400);
            res.json({ status, message, error });
            logger(`REMOVE - [/cartItem] - ${400} - ${sender_id} `);
        } else {
            res.status(200);
            res.json({ status, message, results });
            logger(`REMOVE - [/cartItem] - ${200} - ${sender_id} `);
        }
    }

})

// Route to handle the Unit Of Work's save
app.post('/saveCart', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized", results: [] })
        logger(`POST -  [/saveCart] - ${400} - ${sender_id} `)
    } else {
        const cart = UnitOfWork.save(sender_id); // calling the UoW's save method
        console.log(JSON.stringify(cart))
        const message = `Ok`
        res.status(200)
        res.json({ status: 0, results: cart, message })
        logger(`POST - [/saveCart] - ${200} - ${message}`)
    }

})


app.post('/transactions', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    if (!auth.isAuthorized) {
        res.status(400)
        res.json({ status: 1, message: "Not Authorized", results: [] })
        logger(`GET -  [/transactions] - ${400} - ${sender_id} `)
    } else {
        let transactions = TransactionLogger.getLogs(); // get the transaction logs
        transactions = transactions.map(x => {
            return {
                ...x,
                userData: UserCatalog.GetUserById(x.user_id)
            }
        })
        res.status(200)
        res.json({ status: 0, results: transactions })
        logger(`GET - [/transactions] - ${200} - Ok`)
    }

})

app.post('/loans', (req, res) => {
    // check if the sender is authenticated
    const sender_id = req.headers.id || 34242; // will always suceed if no data sent.
    const auth = AuthService.AuthorizeUser(sender_id, permissionLevel = true);
    console.log(auth);
    console.log(auth.isAuthorized);
    if (!auth.isAuthorized) { /// this doesnt work <--
        let loans = LoanService.allLoanUser(sender_id);
        console.log("this is the loans" + loans);
        for (i = 0; i < loans.length; i++) {
            loans[i].userData = UserCatalog.GetUserById(loans[i].user_id);
        }

        res.status(200)
        res.json({ status: 0, results: loans })
        logger(`POST - [/loans] - ${200} - Ok`)
    } else {
        // Do querry where you select all loaned items 
        let loans = LoanService.allLoanAdmin();

        console.log(loans);
        for (i = 0; i < loans.length; i++) {
            loans[i].userData = UserCatalog.GetUserById(loans[i].user_id);
        }

        res.status(200)
        res.json({ status: 0, results: loans })
        logger(`POST - [/loans] - ${200} - Ok`)
    }

})






server = app.listen(port, () => {
    logger('backend started on port ' + port)
})
module.exports = server;
