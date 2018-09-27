using System; namespace lib_Catalog.Models {     public class UserCatalog     {         private UserCatalog()         {                      }          public Status MakeNewUser(String email, String passwordHashed, bool isAdmin, String phoneNumber, String physicalAddress, String firstName, String lastName)         {             User newUser;              if (isAdmin)                 newUser = new Admin(email, passwordHashed, phoneNumber, physicalAddress, firstName, lastName);             else                 newUser = new Client(email, passwordHashed, phoneNumber, physicalAddress, firstName, lastName);              Status status = new Status(true, "User has been added.");              try             {
                // SQL TO ADD NEW USER
                status.status = true;                 status.message = "User could not be added.";             }             catch (Exception e)             {                 status.status = false;                 status.message = "User Not Added";             }              return status;         }           public User find(String email)
        {
            return new Client();
        }          public Status updateUser(User user)
        {
            return new Status(false, "Update User must be coded.");
        }     } }  