using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace lib_Catalog.Models
{
    public class Admin : User
    {
        public Admin()
        {

        }
        public Admin(string email, string passwordHashed, string phoneNumber, string physicalAddress, string firstName, string lastName) : base(email, passwordHashed, phoneNumber, physicalAddress, firstName, lastName)
        {
        }
    }
}