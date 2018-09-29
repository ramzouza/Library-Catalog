class User {
    constructor(password_hash,
                isActive,
                firstName,
                lastName,
                physicalAddress,
                email,
                phoneNumber,){

   this.password_hash=password_hash
   this.isActive=isActive
   this.firstName=firstName
   this.lastName=lastName
   this.physicalAddress=physicalAddress
   this.email=email
   this.phoneNumber=phoneNumber
    }
}

module.exports = User