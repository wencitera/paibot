const {footerInfo} = require("../config.json") 

module.exports = {

    announcementEmbed: function announcementEmbed(client, Discord, dsv, day, todayTalent, todayWeapon) {
        var todayEmbed = new Discord.MessageEmbed()
            .setTitle(`**Materiales para farmear hoy (${day})**`)
            .setColor("#f7f68f")
            .setThumbnail(client.users.cache.get('795800208117727242').avatarURL())
            .addField("Materiales de Talentos", todayTalent)
            .addField("Materiales de Armas", todayWeapon)
            .setFooter(footerInfo)

        if(client.channels.cache.get(dsv.announcementChannel)) client.channels.cache.get(dsv.announcementChannel).send(todayEmbed)
    },

    privateEmbed: function privateEmbed(client, Discord, id, day, daily){
        var privateEmbed = new Discord.MessageEmbed()
        .setTitle(`**Materiales para farmear hoy (${day})**`)
        .setDescription(daily)
        .setAuthor('Paimon al habla!', client.users.cache.get('795800208117727242').avatarURL())
        .setColor("#f7f68f")
        .setFooter(footerInfo)
        try{
           client.users.cache.get(id).send(privateEmbed)
           console.log("Exitoso en: ", client.users.cache.get(id).username)
        } catch
        {
            console.log("Error en:", client.users.cache.get(id).username)
        }
        
    }
}