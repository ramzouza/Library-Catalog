const {Post, Delete, Get, Put} = require('../CreateTest')


const mockResource = {
    password:"0123456789",
    isActive:0,
    firstName:"admin",
    lastName:"admin",
    physicalAddress:"location",
    email:"admin0@gmail.com",
    phoneNumber:"5142342342",
    isAdmin:1
}
    
Post('/resources','Resource should be created', mockResource,({expect, res})=>{
        expect(res.body.status).to.equal(0);
        let insertId = res.body.resource_id;
    
        Post('/resources','Resource should already exist', mockResource,({expect, res})=>{
            expect(res.body.status).to.equal(1);
    
            // Change mockResource
            mockResource.firstName = "new name";
            Put('/resources', {"resource_id":insertId, "resource": mockResource}, ({expect, rest}) =>{
                expect(res.body.status).to.equal(0);

                Delete('/resources', 'Resource should be deleted.', {"user_id":insertId}, ({expect, res})=>{
                    expect(res.body.message).to.equal('User Deleted.');
                    expect(res.body.status).to.equal(0);
                })
            })
        })
    
        
    
    })


