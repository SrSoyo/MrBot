const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("**ERROR |** No tienes permisos :D!");
  if(!args[0] || args[0 == "help"]) return message.reply("**ERROR |** !setprefix (nuevo prefix)");

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#01bab7")
  .setTitle("Prefix Cambiado Correctamente!")
  .setDescription(`Nuevo Prefix **${args[0]}**`);

  message.channel.send(sEmbed);

}

module.exports.config = {
    name: "setprefix",
    description: "Cambia el prefix del bot",
    usage: "!setprefix (nuevo prefix)",
    acceso: "Staff",
    aliases: ["solo esta"]
}