const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix;



module.exports.run = async (bot, message, args) => {

    if(args[0] == "help") return message.channel.send(`Usa ${prefix}help para mas info.`)

    if(args[0]){
        let command = args[0];
        if(bot.commands.has(command)){
            command = bot.commands.get(command);
            var Hembed = new Discord.RichEmbed()
            .setColor("#01bab7")
            .setAuthor("° Ayuda de Comandos °")
            .setDescription(`\n**Prefix |**\n${prefix}\n\n**Comando |**\n ${command.config.name}\n\n**Descripcion |**\n ${command.config.description || "Descripcion Indefinida"}\n\n**Uso |**\n${command.config.usage || "Uso Indefinido"}\n\n**Permitido para |**\n${command.config.acceso || "Usuarios"}\n\n**Formas de uso**\n${command.config.noalias || command.config.aliases}`)
            message.channel.send(Hembed)
        }}

    if(!args[0]){
        message.delete();

        let Membed = new Discord.RichEmbed()
        .setAuthor("Ayuda de MrBot")
        .setColor("#01bab7")
        .setFooter(`Texto generado automaticamente por 𝐌𝐫𝐁𝐨𝐭`)
        .setDescription("Toda la ayuda de comandos relacionada a 𝐌𝐫𝐁𝐨𝐭")
        .addField("**Prefix**", `${prefix}`)
        .addField(`**Comandos**`, "``IP``")

        message.channel.send("Toda la ayuda fue enviada a **MD**").then(m => m.delete(10000))
        message.author.send(Membed)


    }

}


module.exports.config = {
    name: "help",
    aliases: ["ayuda"]
}