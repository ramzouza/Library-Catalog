using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace lib_Catalog.Models
{
    public abstract class User
    {
        public User()
        {

        }
        public User(String email, String passwordHashed, String phoneNumber, String physicalAddress, String firstName, String lastName)
        {
            this.Email = email;
            this.Password_hash = passwordHashed;
            this.IsActive = false;
            this.PhoneNumber = phoneNumber;
            this.PhysicalAddress = physicalAddress;
            this.FirstName = firstName;
            this.LastName = lastName;

        }

        public int Id { get; set; }

        public string Password_hash { get; set; }

        public bool IsActive { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhysicalAddress { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

    }
}