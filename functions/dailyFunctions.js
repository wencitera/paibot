const hints = require("../messages/message.json")
const { allTalentTypes, allWeaponTypes } = require("../database/db");
const { announcementEmbed} = require("../embeds/dailyEmbed");
const {footerInfo} = require("../config.json")
const genshindb = require('genshin-db')

function getStringDay() {
  var day = new Date().getDay();
  switch (day) {
    case 0:
      day = "Domingo"
      break;
    case 1:
      day = "Lunes"
      break;
    case 2:
      day = "Martes"
      break;
    case 3:
      day = "Miércoles"
      break;
    case 4:
      day = "Jueves"
      break;
    case 5:
      day = "Viernes"
      break;
    case 6:
      day = "Sábado"
      break;
  }
  return day;
}

function getTodayTalent() {
  
  var day = getStringDay();
  var todayTalent = genshindb.talentmaterialtypes(day, { matchCategories: true });
  /*
  allTalentTypes.forEach(talent => {
    var ttype = require(`../database/db/talentmaterialtypes/${talent}`)
    if (ttype.day.includes(day)) {
      todayTalent.push(ttype['name'])
    }
  });
*/
  return todayTalent;
}

function getTodayWeapon() {
  var day = getStringDay();
  var todayWeapon = genshindb.talentmaterialtypes(day, { matchCategories: true });
  
  /*
  allWeaponTypes.forEach(weapon => {
    var ttype = require(`../database/db/weaponmaterialtypes/${weapon}`)
    if (ttype.day.includes(day)) {
      todayWeapon.push(ttype['name'])
    }
  });*/
  return todayWeapon;
}

module.exports = {
  sendTodayAnnouncement(message, dsv, client, Discord) {
    if (dsv.announcementChannel !== '') announcementEmbed(client, Discord, dsv, getStringDay(), getTodayTalent(), getTodayWeapon());
    else message.channel.send(hints.missingAnnouncementChannel)
  },

  sendDailyAnnouncementChannel: async function sendDailyAnnouncementChannel(dsv, client, Discord) {

    var todayTalent = getTodayTalent();
    var todayWeapon = getTodayWeapon();
    var day = getStringDay();
    var ausers = dsv.users;
    console.log(todayTalent, todayWeapon);
    /*for (var j = 0; j < ausers.length; j++) {
      var daily = [];
      var listaR = ausers[j].remind;
      await client.users.fetch(ausers[j].id).then((user) => {
        todayTalent.forEach(t => {
          for (var i = 0; i < listaR.length; i++) {
            var str = listaR[i];
            console.log(str);
            if (str.includes(t))
              daily.push(`Guía de ${str}:\n ${genshindb.characters(str,{ matchCategories: true })}`);
          }
        })
        
        todayWeapon.forEach(w => {
          for (var i = 0; i < listaR.length; i++) {
            var str = listaR[i];
            if (str.includes(w)) daily.push(`${str}: \n${genshindb.weapons(str, { matchCategories: true })}`)
          }
        })*/

        /*if (daily.length > 0) {

          var privateEmbed = new Discord.MessageEmbed()
            .setTitle(`**Materiales para farmear hoy (${day})**`)
            .setDescription(daily)
            .setAuthor('Paimon al habla!', client.users.cache.get('795800208117727242').avatarURL())
            .setColor("#f7f68f")
            .setFooter(footerInfo)
          try {
            client.users.cache.get(user.id).send(privateEmbed)
            console.log("Exitoso en: ", client.users.cache.get(user.id).username)
          } catch
          {
            console.log("Error en:", client.users.cache.get(user.id).username)
          }

        }
        //if (daily.length > 0) privateEmbed(client, Discord, user.id, day, daily)
      }
      );

    }*/
    /*
    ausers.forEach((u) => {
      //if(daily.length > 0) privateEmbed(client,Discord,client.users.cache.get(u.id).id,day,daily)
    });
*/
    if (dsv.announcementChannel !== '') announcementEmbed(client,Discord,dsv,day,todayTalent,todayWeapon);
  }
}