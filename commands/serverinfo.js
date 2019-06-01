const Discord = require("discord.js");
const botconfig = require("../botconfig.json");



module.exports.run = async (bot, message, args) => {
    let aEmbed = new Discord.RichEmbed()
    .setColor("#01bab7")
    .setThumbnail(message.guild.iconURL)
    .setDescription("Informacion relacionada a este servidor")
    .setAuthor("° Informacion Del Servidor °", message.guild.iconURL)
    .addField("**Dueño**", `${message.guild.owner.displayName}`)
    .addField("**Nombre**", `${message.guild.name}`)
    .addField("**Creado En**", `${message.guild.created}`)
    .setFooter(`Texto Creado Por **MrBot**`, bot.user.displayAvatarURL)
    message.channel.send({embed: aEmbed});
    //Aqui va el comando
}


module.exports.config = {
    name: "serverinfo",
    aliases: ["Solo esta"],
    usage: "!infoserver",
    description: "Conseguir informacion sobre este Discord."
}