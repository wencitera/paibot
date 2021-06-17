const { addNewRemind, deleteRemind,  allCharacters, allWeapons } = require("../database/db")
const { searchCreateUser } = require("./searchCreateUser")
const hints = require("../messages/message.json")
const { footerInfo } = require("../config.json")
const { searchCharacter, searchWeapon } = require("./findFunctions")
const genshindb = require('genshin-db')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {

    capitalizeFirstLetter,

    remindToUser(message, args, dsv) {

        var character = undefined;
        var weapon = undefined;
        if (searchCharacter(args)) {
            character = searchCharacter(args)
        } else {
            if (searchWeapon(args)) {
                weapon = searchWeapon(args)
            }
        }

        var user = searchCreateUser(message, dsv)

        if (character) {
            if (!user.remind.includes(character.name)) {
                addNewRemind(dsv, user, character, weapon)
                message.react("✅")
                message.channel.send(hints.rememberSuccessType)

            } else {
                message.channel.send(hints.rememberAlreadyType)

            }
            return;
        }
        if (weapon) {
            if (!user.remind.includes(weapon.name)) {
                addNewRemind(dsv, user, character, weapon)
                message.react("✅")
                message.channel.send(hints.rememberSuccessType)

            } else {
                message.channel.send(hints.rememberAlreadyType)
                
            }
            return;
        }
        message.channel.send(hints.rememberUnknownType)
    },

    removeRemindToUser(message, args, dsv) {

        var character = searchCharacter(args);
        var weapon = searchWeapon(args);
        var user = searchCreateUser(message, dsv)
        var str = "";
        
        if (character) {
            str = character.name;
            console.log(str);
            if (user.remind.includes(str)) {
                deleteRemind(dsv,user,str);
                message.react("✅")
                message.channel.send(hints.rememberRemoveType)
            }else{
                message.channel.send(hints.rememberMissingType)
            }
            return;
        }
        if (weapon) {
            str = weapon.name
            if (user.remind.includes(str)){
                deleteRemind(dsv, user, str)
                message.react("✅")
                message.channel.send(hints.rememberRemoveType)
                
            }else{
                message.channel.send(hints.rememberMissingType)
            }
            return;
        }
        message.channel.send(hints.rememberUnknownType)
    },

    remindListOfUser(message, dsv, Discord) {
        var user = searchCreateUser(message, dsv)
        var listOfReminds = "";
        user.remind.forEach((r) => {
            listOfReminds += capitalizeFirstLetter(r) + "\n"
        });
        var listRemind = new Discord.MessageEmbed()
            .setColor("#3486eb")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle('Lista a recordar:')
            .setDescription(listOfReminds)
            .setFooter(footerInfo);
        message.channel.send(listRemind);
    }
}