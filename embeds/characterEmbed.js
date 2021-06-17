const {footerInfo} = require("../config.json");
const { hexElement } = require("../functions/elementFunction")

module.exports = {

    characterEmbed: function characterEmbed(message, Discord, chr) {
        var stars = "";
        for (var i = 0; i < chr.rarity; i++) {
            stars += "⭐️";
        }
        var hex = hexElement(chr.element);
        var characterEmbed = new Discord.MessageEmbed()
            .setColor(hex)
            .setTitle(`**${chr.name}**`)
            .setDescription(`*${chr.description}*`)
            .setThumbnail(chr.images.image)
            .addFields(
                { name: 'Arma', value: chr.weapontype, inline: true },
                { name: 'Elemento', value: chr.element, inline: true },
                { name: 'Substat', value: chr.substat, inline: true },
                { name: 'Estrellas', value: stars },
                //{ name: 'Material de Talento', value: chr.talentmaterialtype }
            )
            .setFooter(footerInfo);
        message.channel.send(characterEmbed);
    },
}