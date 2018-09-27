using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace lib_Catalog.Models
{
    public class Client : User
    {
        public Client()
        {

        }
        public Client(string email, string passwordHashed, string phoneNumber, string physicalAddress, string firstName, string lastName) : base(email, passwordHashed, phoneNumber, physicalAddress, firstName, lastName)
        {
        }
    }
}