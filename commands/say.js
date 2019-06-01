const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**ERROR |** No tienes permisos :D!");
  if(!args[0]) return message.channel.send("**ERROR |** Debes especificar el mensaje");
  let botmessage = args.join(" ");
  message.channel.send(botmessage);
}

module.exports.config = {
    name: "say",
    description: "Habla como si fueras el bot",
    usage: "!say (mensaje)",
    acceso: "Staff",
    aliases: ["s"]
}