/** @param {Symbol} sym @param {string} user */
async function getuser(sym, user) {
    return new Promise((resolve, reject) => {
        let i = require("../index");

        if (!(sym ?? undefined) || !(user ?? undefined)) return reject(Error("no sym or users defined"))

        i.OberknechtAPI[sym].getUsers((i.regex.twitch.usernamereg().test(user) ? user : undefined), (i.regex.numregex().test(user) ? user : undefined))
            .then((u) => {
                if (!u.data[0]) return reject(Error("api didn't return any data on user"));

                let ch = u.data[0];
                return resolve(ch);
            })
            .catch(e => {
                return reject(Error(e));
            });
    });
};

module.exports = getuser;