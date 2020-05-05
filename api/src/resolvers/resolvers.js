// const db = require("../database/config/dbConfig");
// const { getUser } = require("../middleware/m2mRouter");

module.exports = {
    Query: {
        getUser: async (parent, _, context) => {
            const user = {
                firstName: context.user.given_name,
                lastName: context.user.family_name,
                email: context.user.email,
            };
            return user;
        },
        // getUpdatedUser: async (parent, _, context) => {

        //         const updated_user = await updateUser(context.user_info);

        //         console.log(updated_user, "updated user");

        //         return {userInfo: JSON.stringify(updated_user)};
        //     },
    },
    // Mutation: {
    //     createUser: (parent, { data }) => {
    //         return db("users").insert({ data });
    //     },
    //     getUpdatedUser: async (_, args, context) => {
    //         // console.log(args, "getUpdatedUser Body");

    //         const updatedUser = await updateUser(context.token, args);

    //         // console.log(updatedUser, "Updated User Holy Grail =====");

    //         return { userInfo: JSON.stringify(updatedUser) };
    //     },
    // },
};
