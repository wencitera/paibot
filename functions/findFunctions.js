const config = require("../config.json")
const hints = require("../messages/message.json")
const footerInfo = config.footerInfo
const genshindb = require('genshin-db')

const { hexElement } = require("./elementFunction")
const { characterEmbed } = require("../embeds/characterEmbed")
const { weaponEmbed } = require("../embeds/weaponEmbed")

function searchCharacter(args) {
  var chr = genshindb.characters(args);
  /*var nameCharacter = ""

    for (var i = 0; i < args.length; i++) {
      nameCharacter += args[i];
    }
  var chr = require(`../database/db/characters/${nameCharacter}.json`)*/
  return chr
}

function searchWeapon(args) {
  var nameWeapon = "";
  for (var i = 0; i < args.length; i++) {
    nameWeapon += args[i];
  }
  var wp =  genshindb.weapons(nameWeapon);
  return wp;
}

module.exports = {

  searchCharacter, searchWeapon,

  findCharacter: function findCharacter(message, Discord, args) {

    try {
      characterEmbed(message, Discord, searchCharacter(args))
    }
    catch(e)
    {
      console.log(e);
      message.channel.send(hints.missingCharacter);
    }
  },

  findWeapon: function findWeapon(message, Discord, args) {

    try {
      weaponEmbed(message, Discord, searchWeapon(args))
    }
    catch(e)
    {
      console.log(e)
      message.channel.send(hints.missingWeapon);
    }

  },

  findArtifact: function findArtifact(message, Discord, args) {

    var nameArtifact = ""

    for (var i = 0; i < args.length; i++) {
      nameArtifact += args[i];
    }

    try {
      var art = genshindb.artifacts(nameArtifact)
      
      var minstars = "";
      for (var i = 0; i < art.rarity[0]; i++) {
        minstars += "⭐️";
      }

      var maxstars = "";
      for (var i = 0; i < art.rarity[art.rarity.length-1]; i++) {
        maxstars += "⭐️";
      }

      /*var drop = "";
      for (var i = 0; i < 6; i++) {
        if (art.drop[i]) {
          drop += `**${i}**⭐️\n`;
          if (art.drop[i].length > 1) {
            for (var j = 0; j < art.drop[i].length; j++) {
              drop += art.drop[i][j] + "\n";
            }
          } else drop += art.drop[i] + "\n";
        }
      }*/

      var set = [];
      if (art.flower) {
        set.push(art.flower.name)
      }
      if (art.plume) {
        set.push(art.plume.name)
      }
      if (art.sands) {
        set.push(art.sands.name)
      }
      if (art.goblet) {
        set.push(art.goblet.name)
      }
      if (art.circlet) {
        set.push(art.circlet.name)
      }

      var image = "";
      if (art.flower) {
        image = art.images["flower"]
      }
      else {
        image = art.images["circlet"]
      }

      var combo = [];
      if(art["2pc"])
      {
        combo.push(art["2pc"])
        combo.push(art["4pc"])
      }
      else
      {
        combo.push("No posee combo")
        combo.push("No posee combo")
      }
      var artEmbed = new Discord.MessageEmbed()
        .setTitle(`**${art.name}**`)
        .setColor('#fcbe03')
        .setThumbnail(image)
        .addFields(
          { name: 'Min. Estrellas', value: minstars, inline: true },
          { name: 'Max. Estrellas', value: maxstars, inline: true },
          { name: '2 Piezas', value: combo[0] },
          { name: '4 Piezas', value: combo[1] }
        )
        //.addField('Drop', drop) //Drop separa por estrellas.
        .addField('Piezas del set', set)
        .setFooter(footerInfo);

      //.addField('Pieces', `${art.flower.name} \n ${art.plume.name} \n ${art.sands.name} \n ${art.goblet.name} \n ${art.circlet.name}`)
      message.channel.send(artEmbed);

    } catch (error) {
      console.log(error)
      message.channel.send(hints.missingArtifact);
    }
  },

  findTalents: function findTalents(message, Discord, args) {

    var nameCh = "";
    var adaptive = "";
    var chr = "";
    if (args.length > 1) {
      nameCh = args[0] + args[1];
      adaptive = "aether";

    } else nameCh = args[0]

    try {

      if (!adaptive) chr = require(`../database/db/characters/${nameCh}`)
      else chr = require(`../database/db/characters/${adaptive}`)

      var hex = hexElement(chr.element)
      var tchar = require(`../database/db/talents/${nameCh}`)
      var tcharacterEmbed = new Discord.MessageEmbed()
        .setTitle(`**Talentos de ${tchar.name}**`)
        .setColor(hex)
        .setThumbnail(chr.images.image)
        .addFields(
          { name: "⭐️" + tchar.combat1["name"], value: tchar.combat1["info"] },
          { name: '\u200b', value: '\u200b' },
          { name: "⭐️" + tchar.combat2["name"], value: tchar.combat2["info"] },
          { name: '\u200b', value: '\u200b' },
          { name: "⭐️" + tchar.combat3["name"], value: tchar.combat3["info"] },
        )
        .addField('\u200b', '\u200b')
        .setFooter(footerInfo)
      if (tchar.passive3) {
        tcharacterEmbed.addFields(
          { name: "⭐️" + tchar.passive1["name"], value: tchar.passive1["info"] },
          { name: '\u200b', value: '\u200b' },
          { name: "⭐️" + tchar.passive2["name"], value: tchar.passive2["info"] },
          { name: '\u200b', value: '\u200b' },
          { name: "⭐️" + tchar.passive3["name"], value: tchar.passive3["info"] }
        )
      }
      else {
        tcharacterEmbed.addFields(
          { name: "⭐️" + tchar.passive1["name"], value: tchar.passive1["info"] },
          { name: '\u200b', value: '\u200b' },
          { name: "⭐️" + tchar.passive2["name"], value: tchar.passive2["info"] }
        )
      }


      message.channel.send(tcharacterEmbed);

    }
    catch {
      message.channel.send(hints.missingCharacter)
    }
  },


  findConstelations: function findConstelations(message, Discord, args) {

    var nameCh = "";
    var adaptive = "";
    var chr = "";
    if (args.length > 1) {
      nameCh = args[0] + args[1];
      adaptive = "aether";

    } else nameCh = args[0]

    try {

      if (!adaptive) chr = require(`../database/db/characters/${nameCh}`)
      else chr = require(`../database/db/characters/${adaptive}`)

      var hex = hexElement(chr.element)
      var cchar = require(`../database/db/constellations/${nameCh}`)
      var ccharacterEmbed = new Discord.MessageEmbed()
        .setTitle(`**Constellations of ${cchar.name}**`)
        .setColor(hex)
        .setThumbnail(chr.images.image)
        .addFields(
          { name: "⭐️" + cchar.c1["name"], value: cchar.c1["effect"] },
          { name: "⭐️" + cchar.c2["name"], value: cchar.c2["effect"] },
          { name: "⭐️" + cchar.c3["name"], value: cchar.c3["effect"] },
          { name: "⭐️" + cchar.c4["name"], value: cchar.c4["effect"] },
          { name: "⭐️" + cchar.c5["name"], value: cchar.c5["effect"] },
          { name: "⭐️" + cchar.c6["name"], value: cchar.c6["effect"] }
        )
        .setFooter(footerInfo)
      message.channel.send(ccharacterEmbed);
    }
    catch {
      message.channel.send(hints.missingCharacter)
    }
  },

  findTalentMaterials: function findTalentMaterials(message, Discord, args) {

    try {
      var nameCh = "";
      var adaptive = "";
      var chr = "";
      if (args.length > 1) {
        nameCh = args[0] + args[1];
        adaptive = "aether";

      } else nameCh = args[0]

      if (!adaptive) chr = require(`../database/db/characters/${nameCh}`)
      else chr = require(`../database/db/characters/${adaptive}`)

      var tmt = (chr.talentmaterialtype).toLowerCase();

      tm = require(`../database/db/talentmaterialtypes/${tmt}`)

      var tmEmbed = new Discord.MessageEmbed()
        .setTitle(`**Talent Material Items of ${chr.name}**`)
        .setColor(hexElement(chr.element))
        .setThumbnail(chr.images.image)
        .addFields(
          { name: "⭐️" + "Item", value: `${tm["2starname"]} \n ${tm["3starname"]} \n ${tm["4starname"]}` },
          { name: "⭐️" + "Days", value: `${tm.day[0]} \n ${tm.day[1]} \n ${tm.day[2]}` },
          { name: "⭐️" + "Domain", value: tm.domainofmastery }
        )
        .setFooter(footerInfo)

      message.channel.send(tmEmbed);
    }
    catch {
      message.channel.send(hints.missingCharacter)
    }
  },


  findWeaponMaterials: function findWeaponMaterials(message, Discord, args) {

    var aux = "";
    for (var i = 0; i < args.length; i++) {
      aux += args[i]
    }
    var weapon = require(`../database/db/weapons/${aux}`)
    var waux = weapon.weaponmaterialtype.replace(/\s/g, '')
    var wm = require(`../database/db/weaponmaterialtypes/${waux.toLowerCase()}`)

    var wmEmbed = new Discord.MessageEmbed()
      .setTitle(`**Materials of ${weapon.name}**`)
      .setColor("#348feb")
      .setThumbnail(weapon.images.image)
      .addFields(
        { name: "⭐️" + "Item", value: `${wm["2starname"]} \n ${wm["3starname"]} \n ${wm["4starname"]} \n${wm["5starname"]}` },
        { name: "⭐️" + "Days", value: `${wm.day[0]} \n ${wm.day[1]} \n ${wm.day[2]}` },
        { name: "⭐️" + "Domain", value: wm.domainofforgery }
      )
      .setFooter(footerInfo)

    message.channel.send(wmEmbed);
  }
}