using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Web.Hosting;



namespace lib_Catalog.Models
{
    public class UserCatalog
    {
        //ramez code
        private static string dbName = System.IO.Path.Combine(HostingEnvironment.ApplicationPhysicalPath, "Content", "test.db");
        private static string cs = "URI=file:" + dbName;
        public static void TestConenction()
        {
            if (!System.IO.File.Exists(dbName))
            {
                SQLiteConnection.CreateFile(dbName);
            }

            using (SQLiteConnection con = new SQLiteConnection(cs))
            {
                con.Open();
                using (SQLiteCommand cmd = new SQLiteCommand(con))
                {
                    cmd.CommandText = "DROP TABLE IF EXISTS Catalog";
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = @"CREATE TABLE Catalog(Id INTEGER PRIMARY KEY, 
                    email TEXT, password TEXT, isActive bool, PhoneNumber TEXT, PhysicalAddress TEXT, FirstName TEXT, LastName TEXT)";
                    cmd.CommandText = "INSERT INTO Catalog VALUES(1,'ramezzaid@outlook.com', 'ramez', 1, '514-531-5389', 'this is great', 'ramez', 'zaid')";
                    cmd.ExecuteNonQuery();
                }
            }
        }


       
            public static bool AddUser(User Admin)
        {
            if (Admin == null)
            {
                return false;
            }

           

            try
            {
                using (SQLiteConnection con = new SQLiteConnection(cs))
                {
                    con.Open();
                    string sql = "INSERT INTO Catalog(Id , email , password , isActive , PhoneNumber , PhysicalAddress , FirstName , LastName ) VALUES (@Id, @email,@password,@isActive,@PhoneNumber, @PhysicalAddress, @FirstName, @LastName)" ;
                    using (SQLiteCommand cmd = new SQLiteCommand(con))
                    {
                        cmd.CommandText = $"SELECT MAX(Id) FROM Cars";
                        Admin.Id = Convert.ToInt32(cmd.ExecuteScalar()) + 1;

                        cmd.CommandText = sql;
                        cmd.Parameters.Add(new SQLiteParameter("@Id", Admin.Id));
                        cmd.Parameters.Add(new SQLiteParameter("@email", Admin.Email));
                        cmd.Parameters.Add(new SQLiteParameter("@password", Admin.Password_hash));
                        cmd.Parameters.Add(new SQLiteParameter("@isActive", Admin.IsActive));
                        cmd.Parameters.Add(new SQLiteParameter("@PhoneNumber", Admin.PhoneNumber));
                        cmd.Parameters.Add(new SQLiteParameter("@PhysicalAddress", Admin.PhysicalAddress));
                        cmd.Parameters.Add(new SQLiteParameter("@FirstName", Admin.FirstName));
                        cmd.Parameters.Add(new SQLiteParameter("@LastName", Admin.LastName));
                        
                       
                        cmd.ExecuteNonQuery();
                        return true;
                    }
                }
            }
            catch (Exception exp)
            {
                return false;
            }
        }


        // ramez ending of coding segment
        private UserCatalog()
        {
            
        }

        public Status MakeNewUser(String email, String passwordHashed, bool isAdmin, String phoneNumber, String physicalAddress, String firstName, String lastName)
        {
            User newUser;

            if (isAdmin)
                newUser = new Admin(email, passwordHashed, phoneNumber, physicalAddress, firstName, lastName);
            else
                newUser = new Client(email, passwordHashed, phoneNumber, physicalAddress, firstName, lastName);

            Status status = new Status(true, "User has been added.");

            try
            {
                // SQL TO ADD NEW USER
                status.status = true;
                status.message = "User could not be added.";
            }
            catch (Exception e)
            {
                status.status = false;
                status.message = "User Not Added";
            }

            return status;
        }


        public User find(String email)
        {
            return new Client();
        }

        public Status updateUser(User user)
        {
            return new Status(false, "Update User must be coded.");
        }
    }
}

