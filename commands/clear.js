const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**ERROR |** No tienes permisos :D!");
  if(!args[0]) return message.channel.send("**ERROR |** Debes especificar el numero de mensajes");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}

module.exports.config = {
    name: "clear",
    description: "Borra mensajes",
    usage: "!clear (n° mensajes)",
    acceso: "Staff",
    aliases: ["c"]
}