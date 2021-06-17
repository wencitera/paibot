const Discord = require('discord.js');
const client = new Discord.Client();
const hints = require("./messages/message.json")
const cmd = require("./messages/aliases.json")
const { token } = require("./token.json")
const genshindb = require('genshin-db')
const { prefix, log_channel, develope_guild } = require("./config")
const { findCharacter, findWeapon, findArtifact, findTalentMaterials, findTalents, findConstelations, findWeaponMaterials } = require("./functions/findFunctions")
const { remindToUser, removeRemindToUser, remindListOfUser } = require("./functions/remindFunctions")
const { sendDailyAnnouncementChannel, sendTodayAnnouncement } = require("./functions/dailyFunctions")
const { newDatabase, setAnnouncementChannel, removeAnnouncementChannel } = require("./database/db")

var cron = require('node-cron');
const { listCommands, listWeapons, listCharacters, listSetArtifact } = require('./functions/listFunctions');
const { supportEmbed, donateEmbed } = require('./embeds/gestionEmbeds');
var dsv;



function createDatabase(guild) {
  newDatabase(guild)
  var log = client.guilds.cache.get(develope_guild);
  log.channels.cache.get(log_channel).send("New DB: " + guild.name + " " + guild.id)
}

client.on("guildCreate", guild => {
  createDatabase(guild)
})

client.on("guildDelete", guild => {
  var log = client.guilds.cache.get(develope_guild);
  log.channels.cache.get(log_channel).send("Exit on: " + guild.name + " " + guild.id)
})

client.on('message', message => {

  if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  //Mecanismo por si hubo una desconexión del bot y lo invitaron justo
  try {
    dsv = require(`./database/servers/${message.guild.id}`)
  } catch
  {
    createDatabase(message.guild)
  }


  //Comandos sin argumentos
  if (!args.length) {
    if (cmd.helpAlises.includes(command)) {
      console.log("Entré: " + command)
      listCommands(message, client, Discord)
      return;
    }

    if (cmd.donateAliases.includes(command)) {
      console.log("Entré: " + command)
      donateEmbed(message, client, Discord)
      return
    }

    if (cmd.supportAliases.includes(command)) {
      console.log("Entré: " + command)
      supportEmbed(message, client, Discord)
      return;
    }

    if (cmd.listArtifactAliases.includes(command)) {
      console.log("Entré: " + command)
      listSetArtifact(message, Discord)
      return;
    }

    if (cmd.listWeaponAliases.includes(command)) {
      console.log("Entré: " + command)
      listWeapons(message, Discord)
      return;
    }

    if (cmd.listCharacterAliases.includes(command)) {
      console.log("Entré: " + command)
      listCharacters(message, Discord)
      return;
    }

    if (cmd.reminderListAlias.includes(command)) {
      console.log("Entré: " + command)
      remindListOfUser(message, dsv, Discord)
      return;
    }

    if (cmd.setAnnouncementChannelAliases.includes(command)) {
      console.log("Entré: " + command)
      setAnnouncementChannel(message, dsv);
      return;
    }

    if (cmd.removeAnnouncementChannelAliases.includes(command)) {
      console.log("Entré: " + command)
      removeAnnouncementChannel(message, dsv);
      return;
    }

    if (cmd.todayFarmAliases.includes(command)) {
      console.log("Entré: " + command)
      sendTodayAnnouncement(message, dsv, client, Discord)
      return;
    }

    if (command === "test" && message.author.id === '303695993462063106') {
      //console.log("Entré: " + command)
      //console.log(genshindb.characters('ballad', { matchCategories: true, queryLanguages: 'English' }))
      //sendDailyAnnouncementChannel(message, dsv, client, Discord)
      console.log(genshindb.talentmaterialtypes('satur', { matchCategories: true}));
      return;
    }
  }

  //Comandos con argumentos
  if (args.length) {
    if (cmd.infoCharacterAliases.includes(command)) {
      console.log("Entré: " + command)
      findCharacter(message, Discord, args, dsv)
      return;
    }

    if (cmd.infoWeaponAliases.includes(command)) {
      console.log("Entré: " + command)
      findWeapon(message, Discord, args)
      return;
    }

    if (cmd.infoArtifactAliases.includes(command)) {
      console.log("Entré: " + command)
      findArtifact(message, Discord, args)
      return;
    }

    if (cmd.infoTalentAliases.includes(command)) {
      console.log("Entré: " + command)
      findTalents(message, Discord, args)
      return;
    }

    if (cmd.infoConstellationsAliases.includes(command)) {
      console.log("Entré: " + command)
      findConstelations(message, Discord, args)
      return;
    }

    if (cmd.infoTalentMaterialAliases.includes(command)) {
      console.log("Entré: " + command)
      findTalentMaterials(message, Discord, args)
      return;
    }

    if (cmd.infoWeaponMaterialAliases.includes(command)) {
      console.log("Entré: " + command)
      findWeaponMaterials(message, Discord, args)
      return;
    }

    if (cmd.reminderAliases.includes(command)) {
      console.log("Entré: " + command)
      remindToUser(message, args, dsv)
      return;
    }

    if (cmd.reminderRemoveAliases.includes(command)) {
      console.log("Entré: " + command)
      removeRemindToUser(message, args, dsv)
      return;
    }
  }

  message.channel.send("Unknown command, hehe te nandayo 👉👈")


});


client.once("ready", () => {
  console.log("Startup complete");
  client.user.setActivity("-g help | 😎");

  genshindb.setOptions({
    matchAliases: true, // Allows the matching of aliases.
    matchCategories: false, // Allows the matching of categories. If true, then returns an array if it matches.
    verboseCategories: false, // Used if a category is matched. If true, then replaces each string name in the array with the data object instead.
    queryLanguages: ["English", "Spanish"], // Array of languages that your query will be searched in.
    resultLanguage: "Spanish" // Output language that you want your results to be in.
  })

  client.guilds.cache.forEach(g => {
    console.log(g.name, g.id)
  })

  cron.schedule('0 4 * * *', () => {
    var fs = require('fs');
    var guilds = fs.readdirSync('./database/servers')
    guilds.forEach(g => {
      try {
        var adsv = require(`./database/servers/${g}`)
        sendDailyAnnouncementChannel(adsv, client, Discord);
      } catch (e) {
        console.log("Tuve error en :", g);
      }
    });

  }, {
    scheduled: true,
    timezone: "America/Sao_Paulo"

  });

});



client.login(token);