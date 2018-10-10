const {Post} = require("../CreateTest")
const newBookData = {
    title:'test',author:'test', format:'test',pages:'test',publisher:'test',language:'test', ISBN_10:'test', ISBN_13:'test'
}
const dataTest1 = {isAdmin:false, newBookData}
const dataTest2 = {isAdmin:true, newBookData}


Post('/createbook','Fail if not admin', dataTest1,({expect,res})=>{
  expect(res.body.message).to.equal("Not allowed to create book")
  expect(res.status).to.equal(412)
  expect(res.body.status).to.equal(1)

})

Post('/createbook','Expect successful book creation',dataTest2,({expect,res})=>{
    expect(res.body.message).to.equal("Saved book")
    expect(res.status).to.equal(200)
    expect(res.body.status).to.equal(0)
})

