const {writeNewUser} = require("../database/db")

module.exports={
    searchCreateUser(message, dsv)
    {
        var users = dsv.users
        var user = users.find(u => {
            if(u.id == message.author.id)
            return u;
        })

        if (!user) {
            writeNewUser(message, dsv)
            user = users.find(u => {
                if(u.id == message.author.id)
                return u;
            })
        }

        return user;
    }
}
