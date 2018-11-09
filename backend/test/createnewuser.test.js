const {Post, Delete, Get} = require('./CreateTest')


/*
1. Create User (expect status=0)
2. Create User again (expect status=1)
3. Delete User (expect status=1)
*/
const mockUser = {
password:"0123456789",
isActive:0,
firstName:"admin",
lastName:"admin",
physicalAddress:"location",
email:"admin0@gmail.com",
phoneNumber:"5142342342",
isAdmin:1
}


Post('/createnewuser','User should be created', mockUser,({expect, res})=>{
        expect(res.body.status).to.equal(0);
        expect(res.body.message).to.equal('Ok');
        let insertId = res.body.user_id;

        Post('/createnewuser','User should already exist', mockUser,({expect, res})=>{
            expect(res.body.message).to.equal('User exists already');
            expect(res.body.status).to.equal(1);

            Delete('/deleteuser', 'User should be deleted.', {"user_id":insertId}, ({expect, res})=>{
                expect(res.body.message).to.equal('User Deleted.');
                expect(res.body.status).to.equal(0);
            })
        })

    })

