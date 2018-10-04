class User {
    constructor({id,password_hash,
                isActive,
                firstName,
                lastName,
                physicalAddress,
                email,
                phoneNumber,isAdmin}){

    this.id = id
   this.password_hash=password_hash
   this.isActive=isActive
   this.firstName=firstName
   this.lastName=lastName
   this.physicalAddress=physicalAddress
   this.email=email
   this.phoneNumber=phoneNumber
   this.isAdmin=isAdmin
    }
}

module.exports = User