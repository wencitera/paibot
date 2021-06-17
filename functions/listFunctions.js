const config = require("../config.json")
const footerInfo = config.footerInfo
var fs = require('fs');
const genshindb = require("genshin-db");
    
module.exports = {

    listCommands: function listCommands(message,client, Discord){

        var commands = [
            "`-g h/help`                       - Ver todos los comandos",
            "`-g s/support` - Invitacion al discord para soporte",
            "`-g d/donate` - Datos para donacion",
            "",
            "**Comandos de Informacion:**",
            "`-g ic/infocharacter Character`   - Ver informacion de un personaje",
            "`-g iw/infoweapon Weapon`         - Ver informacion de un arma",
            "`-g ia/infoartifact ArtifactSet`  - Ver informacion de un set de artefactos",
            "",
            "`-g t/talents Character`          - Ver los talentos de un personaje",
            "`-g c/constellations Character`   - Ver las constelaciones de un personaje",
            "`-g wm/weaponmaterial Weapon`     - Ver los materiales de ascension de un arma",
            "`-g tm/talentmaterial Character`  - Ver los materiales de ascension de un personaje",
            "",
            "`-g lc/listcharacters` - Ver la lista de personajes",
            "`-g la/listartifacts` - Ver la lista de set de artefactos",
            "`-g lw/listweapons` - Ver la lista de armas",
            "",
            "**Comandos de conmfiguracion (Solo administradores):**",
            "`-g sac/setannouncementchannel`   - Configurar el canal donde se ejecuta el comando, como canal de anuncios diarios",
            "`-g rac/removeannouncementchannel`- Eliminar el canal de anuncios diarios",
            "",
            "**Comandos de ayuda:**",
            "*Puedo recordar cosas por ti, solo pídemelo!*",
            "*Diariamente te avisare por privado que debes farmear!*",
            "`-g r/remind <Character or Weapon>`        - Agregar a tu lista de recordatorio",
            "`-g rr/remindremove <Character or Weapon>` - Eliminar de tu lista de recordatorio",
            "`-g rl/remindlist`                         - Ver la lista de recordatorio"
        ]

        var listCommand = new Discord.MessageEmbed()
            .setColor("#3486eb")
            .setAuthor(client.users.cache.get('795800208117727242').username + " commands",client.users.cache.get('795800208117727242').avatarURL())
            .setDescription(commands)
            .setFooter(footerInfo);
        message.channel.send(listCommand)
    },

    listWeapons: function listWeapons(message, Discord){
        
        var polearms = genshindb.weapons('polearm', { matchCategories: true })
        var bows=genshindb.weapons('bow', { matchCategories: true })
        var catalyzers = genshindb.weapons('catalyst', { matchCategories: true })
        var swords = genshindb.weapons('decarabian', { matchCategories: true })
        var claymores = genshindb.weapons('claymore', { matchCategories: true })

        var listWeapons = new Discord.MessageEmbed()
            .setColor("#3486eb")
            .setTitle('List of Weapons')
            .setDescription('Full list of weapons')
            .addField('Mandobles', claymores)
            .addField('Arcos', bows)
            .addField('Espadas', swords)
            .addField('Catalizadores', catalyzers)
            .addField('Lanzas', polearms)
            .setFooter(footerInfo);
        message.channel.send(listWeapons)
    },


    listCharacters: function listCharacters(message, Discord){
        var characters = genshindb.characters('names', { matchCategories: true })

        var listCharacters = new Discord.MessageEmbed()
            .setColor("#3486eb")
            .setTitle('Lista de personajes')
            .setDescription('Lista completa de los personajes actuales')
            .addField('Personajes', characters)
            .setFooter(footerInfo);
        message.channel.send(listCharacters)
    },

    listSetArtifact: function listSetArtifact(message, Discord)
    {
        var setArtifacts = genshindb.artifacts('names', { matchCategories: true });

        var listArtifacts = new Discord.MessageEmbed()
            .setColor("#3486eb")
            .setTitle('Lista de Set de artefactos')
            .setDescription('Lista completa de set de artefactos')
            .addField('Set de artefactos', setArtifacts)
            .setFooter(footerInfo);
        message.channel.send(listArtifacts)
    }
}