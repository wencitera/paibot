const {footerInfo} = require("../config.json")

module.exports = {

    supportEmbed: function supportEmbed(message,client,Discord){
        var supportEmbed = new Discord.MessageEmbed()
        .setAuthor("Wenxi al habla!",client.users.cache.get('303695993462063106').avatarURL())
        .setColor("#cbeb00")
        .setURL('https://discord.gg/AvQfmvN7eu')
        .setTitle("Invitacion de Discord")
        .setDescription("Puedes entrar a mi servidor de discord!\n Si encuentras algun error, bug o inconveniente, no dudes en contactarme \nTienes alguna sugerencia? Me encantaría leerla!")
        .setFooter(footerInfo)
        message.channel.send(supportEmbed);
    },

    donateEmbed: function donateEmbed(message, client, Discord){
        var donateEmbed = new Discord.MessageEmbed()
        .setAuthor("Wenxi al habla!",client.users.cache.get('303695993462063106').avatarURL())
        .setColor("#cbeb00")
        .setTitle("Te gusta este bot?")
        .setDescription("Si es así, me alegra mucho <3 \nSientete libre de contribuir con donaciones para poder seguir actualizando este bot dia a dia!")
        .addField("Paypal", "wencitera@gmail.com")
        .addField("Discord", "Puedes entrar a mi discord para charlar, reportar errores o sugerencias! \nhttps://discord.gg/AvQfmvN7eu")
        .setFooter(footerInfo)
        message.channel.send(donateEmbed);
    }
}