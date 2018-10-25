const User = require('./User')
const UserMapper = require('./UserMapper')

class UserCatalog {
    static MakeNewUser(user_data) { // Sync
        user_data.id = 0; // For query
        const user = new User(user_data);
        const { results, error }  = this.GetUserByEmail(user.email);
        if (results.length != 0) // Array is not empty
            return { status: 1, message: 'User exists already', error }
        return UserMapper.PersistUser(user)
    }

    static GetUserByEmail(email) { // Sync
        return UserMapper.RetrieveUserByEmail(email)
    }

    static GetUserById(id) { // Sync
        return UserMapper.RetrieveUserById(id)
    }

    static DeleteUserById(id) {
        return UserMapper.DeleteUser(id)
    }

    static ViewLoggedInUsers() { // Sync
        return UserMapper.ActiveUsers()
    }


    static SetIsActive(id, isActive) { // Sync
        return UserMapper.SetActive(id,isActive)
    }

    static objectToQueryString(object) { // Helper. This method turns an object into a string formated for an SQL query
        return Object.values(object).map(x => "'" + x + "'").join(',');
    }
}

module.exports = UserCatalog;
