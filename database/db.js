const fs = require('fs');
const allTalentTypes = ["ballad", "diligence", "freedom", "gold", "prosperity", "resistance"]
const allWeaponTypes = ["aerosiderite", "borealwolf", "dandeliongladiator", "decarabian", "guyun", "mistveiledelixir"]
const allCharacters = fs.readdirSync('./database/db/characters');
const allWeapons = fs.readdirSync('./database/db/weapons');
const hints = require("../messages/message.json")

function deleteUser(message, dsv) {
  var auxArray = dsv.users.filter((u) => u.id != message.author.id);
  dsv.users = auxArray;
  let data = JSON.stringify(dsv);
  fs.writeFileSync(`./database/servers/${dsv.id}.json`, data);
}

module.exports = {
  allCharacters,
  allWeapons,
  allTalentTypes,
  allWeaponTypes,
  deleteUser,

  newDatabase(guild) {
    var fileName = guild.id
    var dateNow = new Date()
    let jsonFile = {
      id: fileName,
      lang: "en",
      announcementChannel: '',
      date: dateNow,
      users: [],
    };

    let data = JSON.stringify(jsonFile);
    fs.writeFileSync(`./database/servers/${fileName}.json`, data);
  },

  writeNewUser(message, dsv) {

    dsv.users.push({
      id: message.author.id,
      remind: [],
      harem: [],
      notification: 0,
      primogems: 0,
      daily: ''
    })

    let data = JSON.stringify(dsv);
    fs.writeFileSync(`./database/servers/${dsv.id}.json`, data);
  },


  addNewRemind(dsv, user, character, weapon) {
    for (var i = 0; i < dsv.users.length; i++) {
      if (dsv.users[i].id === user.id) {
        if (character) {
          dsv.users[i].remind.push(`${character.name}`);
        }
        if (weapon) {
          dsv.users[i].remind.push(`${weapon.name}`);
        }
        let data = JSON.stringify(dsv);
        fs.writeFileSync(`./database/servers/${dsv.id}.json`, data);
      }
    }

  },

  deleteRemind(dsv, user, str) {
    for (var i = 0; i < dsv.users.length; i++) {
      if (dsv.users[i].id === user.id) {
        var auxArray = dsv.users[i].remind.filter((value) => value != str);
        dsv.users[i].remind = auxArray;
        let data = JSON.stringify(dsv);
        fs.writeFileSync(`./database/servers/${dsv.id}.json`, data);
        //if (dsv.users[i].remind.length == 0) deleteUser(message, dsv)
      }
    }
  },

  setAnnouncementChannel(message, dsv) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      dsv.announcementChannel = message.channel.id;
      let data = JSON.stringify(dsv);
      fs.writeFileSync(`./database/servers/${dsv.id}.json`, data);
      message.channel.send("Setting announcement channel")
    }
    else {
      message.channel.send(hints.missingPermission)
    }
  },

  removeAnnouncementChannel(message, dsv) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      dsv.announcementChannel = '';
      let data = JSON.stringify(dsv);
      fs.writeFileSync(`./database/servers/${dsv.id}.json`, data);
      message.channel.send("Removing announcement channel")
    }
    else {
      message.channel.send(hints.missingPermission)
    }
  },

}