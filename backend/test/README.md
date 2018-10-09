## Fundamentals of Tests
Writing tests are an essential part of any piece of code. Tests can be found in `backend/tests`.

## Running the test suite
`cd backend` cd to the backend.

`npm run tests` run the test script.

## Writing a test
_each step outlined below is explained below below_
1. Create a new file `yourtestname.test.js`. 
2. Import the request verbs functions (Post, Delete, Get, Put)
3. Use one method and pass it the correct parameters (check signatures below)
4. All methods have a handler with parameter {expect, res}. The body of this handler is run and contains the tests for that request. 
5. Within the body of the handler use the `expect` function to assert facts about the response object `res`. 
6. You can expect a status in the response to be 0 (Ok) or expect that status to be 1 (Error), the test passes if the assertion is held true.

#### Import Post, Delete, Get
`const {Post, Delete, Get} = require('../CreateTest')`

#### Signatures
`Get(APIroute:str ,description:str, handler:function)`

`Post(APIroute:str ,description:str data:json, handler:function)`

`Delete(APIroute:str ,description:str data:json, handler:function)`

Note: The handler function is invoked once the backend returns a response (it's async).

#### Handler
`res` contains the response json data, `expect` is a function defined by the CreateTest module. Your actual tests are written within the handler body.
`({expect, res})=> { // handler body }` 
#### Expect Function
These `expect` function calls occur with the hander body. These are the assertions made by your test.
Examine the following examples of valid expect calls

eg1. `expect(res.body.status).to.equal(1)`  test passes if status indicates error

eg2. `expect(res.body.message).to.equal('Ok')` test passes if message is equal to Ok

eg3. `expect(true).to.equal(!false)` test always passes

#### Example Code
    Post('/login', 'message should say Welcome', {email: 'ced@gmail.com', password: 'ced'},({expect, res})=>{ 
          expect(res.body.message).to.equal('Welcome') // here the test will pass iff the message is Welcome
     })

#### Nested Requests 
Nested Requests are possible and valuable for testing through the CRUD process. 
1. Start by creating the record (Post), the response should contain some sort of id for the record.
2. Use that id to get the record (Get)
3. Update the record (Put)
4. Finally delete that record (Delete). 

This will create an [idempotent](https://en.wikipedia.org/wiki/Idempotence) test, allowing it to be run again 
and again without changing the state of the database.

    mockUser = { ... } 
    Post('/createnewuser','Create User', mockUser,({expect, res})=>{
        expect(res.body.status).to.equal(0); // we expect to have no errors, ie status = 0
        expect(res.body.message).to.equal('Ok'); // we expect message to be Ok
        let insertId = res.body.user_id; // user_id is sent back in the response
        
        // note 'Put' is not yet implemented, just an example
        mockUser.firstName = "Jon"; // change names
        Put('updateuser', 'User should be updated', mockUser, (({expect, res})=>{
            expect(res.body.message).to.equal('User Updated.');
            expect(res.body.status).to.equal(0);
        })

        Delete('/deleteuser', 'User should be deleted.', {"user_id":insertId}, ({expect, res})=>{
            expect(res.body.message).to.equal('User Deleted.');
            expect(res.body.status).to.equal(0);
        })
    })
[Click here to see example of Nested Requests: lines 21 - 41](https://github.com/ramzouza/Library-Catalog/blob/development/backend/test/createnewuser.test.js)



