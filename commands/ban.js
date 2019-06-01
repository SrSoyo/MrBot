const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!User) return message.channel.send("**ERROR |** Usuario no encontrado!");
    let Razon = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("**ERROR |** No tienes permisos :D!");
    if(User.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**ERROR |** No puedes banear a esta persona!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**BANEO**")
    .setColor("#01bab7")
    .addField("Usuario |", `${User}`)
    .addField("Sancionado por |", `<@${message.author.id}>`)
    .addField("En |", message.createdAt)
    .addField("Razon |", Razon);

    let incidentchannel = message.guild.channels.find(`name`, "logs");
    if(!incidentchannel) return message.channel.send("**ERROR |** No se encontro el canal de logs.");

    message.guild.member(User).ban(Razon);
    incidentchannel.send(banEmbed);
}

module.exports.config = {
    name: "ban",
    description: "Expulsa al jugador del discord si posibilidad de volver a entrar",
    usage: "!ban (@usuario) (razon)",
    acceso: "Staff",
    aliases: ["b"]
}