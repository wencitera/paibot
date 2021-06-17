const {footerInfo} = require("../config.json");

module.exports = {
    weaponEmbed: function weaponEmbed(message, Discord, wp) {
        var stars = "";
        for (var i = 0; i < wp.rarity; i++) {
            stars += "⭐️";
        }
        var wpEmbed = new Discord.MessageEmbed()
            .setTitle(`**${wp.name}**`)
            .setDescription(`*${wp.description}*`)
            .setThumbnail(wp.images.image)
            .setColor("#3486eb")
            .addFields(
                { name: 'Estrellas', value: stars, inline: true },
                { name: 'Ataque base', value: wp.baseatk, inline: true },
                { name: 'Stat Base', value: wp.subvalue + "  " + wp.substat },
                { name: 'Efecto secundario', value: `**${wp.effectname}**: ${wp.effect}` }
            )
            .setFooter(footerInfo);
        message.channel.send(wpEmbed);
    }
}