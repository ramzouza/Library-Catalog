using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace lib_Catalog.Models
{
    public class AuthorizationService
    {
        static private UserCatalog userCatalog;
 
        private AuthorizationService()
        {

        }

		// Given an email and password, this method will return a status that says whether the user is logged in or not
        public static Status AuthorizeCredentials(String email, String password)
        {
            User user = userCatalog.find(email); // get the user from the catalog 
            if (user == null)
			{
                return new Status(false, "User with email " + email + " was not found.");
			} else 
			{
				Status status = AuthorizationService.ValidateUser(user, password);
				if (status.status){
					user.IsActive = true;
					AuthorizationService.userCatalog.updateUser(user);
				}
                return status;
			}
            
        }
		
		// Given a password, the method will return a hashed_version of the password
        private static string Hash_password(String password)
        {
            return password;
        }
		
		// Given a user and a password, this method will return a Status indicated if the password matches the users password
        private static Status ValidateUser(User user, String password)
        {
			if (user.Password_hash == AuthorizationService.Hash_password(password)){
                return new Status(true, "Logged In.");
			} else
			{
				return new Status(false, "Password not authenticated. Please try again.");
			}
        }

		// Given the user information, email, password, and an isAdmin, this method will pass a message to userCatalog to store a user, this method will
		// return a Status indicating that the user has been created.
        public static Status MakeNewUser(string email, String password, bool isAdmin, String phoneNumber, String physicalAddress, String firstName, String lastName)
        {
			if (userCatalog.find(email) == null)
			{
				return userCatalog.MakeNewUser(email, AuthorizationService.Hash_password(password), isAdmin, phoneNumber, physicalAddress,  firstName,  lastName);
			} else 
			{
				return new Status(false, "User already exists in the database.");
			}
        }
		
		
		public static Status ViewLoggedInUsers(){
            return new Status(true, "");
		}
    }
}