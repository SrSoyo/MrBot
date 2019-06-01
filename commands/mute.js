const discord = require("discord.js");
const prefix = require("../botconfig.json");


module.exports.run = async (bot,message,args) => {

//Obtener si el usuario Tiene el permiso
if(!message.member.hasPermissions("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("No tienes permisos para ejecutar este comando")

if(!message.guild.me.hasPermissions(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("No tengo permisos de agregar roles...")

//Definir razon y mutear
let mutee = message.mentions.members.first() || message.guild.members.get(args[0])
if(!mutee) return message.channel.send("Por favor menciona al jugador que vas a mutear")

let reason = args.slice(1).join(" ");
if(!reason) reason = "No se expecifico la razon."

//definir rol de mute y si no existe crear uno
let muterole = message.guild.roles.find(r => r.name === "Muteado")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Muteado",
            color: "#818181",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterol, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}

//añadir rol de mute y envio de md explicando la razon

mutee.addRole(muterol.id).then(() => {
    message.delete()
    mutee.send(`Fuiste **muteado** en ${message.guild.name} por: ${reason}`)
    message.channel.send(`${mutee.user.username} Fue **muteado** correctamente.`)
})

//Enviar un embed a los logs del discord

let embed = new Discord.RichEmbed()
.setColor("#01bab7")
.setAuthor(`${message.guild.name} | STAFFLOGS`, message.guild.iconURL)
.addField("ACCION |", "MUTE")
.addField("Usuario |", mutee.user.username)
.addField("Sancion Por |", message.author.username)
.addField("En |", message.createdAt)

let sChannel = message.guild.chanels.find(c => c.name === "staff")
sChannel.send(embed)
}

module.exports.config = {
    name: "mute",
    description: "Quita el permiso de chatear al castigado",
    usage: "!mute (@usuario) (razon)",
    acceso: "Staff",
    aliases: ["m"]
}