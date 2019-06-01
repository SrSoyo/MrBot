const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mute) return message.channel.send("**ERROR |** Usuario no encontrado.");
  if(mute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**ERROR |** No puedes mutear a este Usuario!");
  let muterole = message.guild.roles.find(`name`, "muteado");
  //Creacion del rol
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muteado",
        color: "#818181",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.channel.send("**ERROR |** Tienes que definir el tiempo!");

  await(mute.addRole(muterole.id));
  message.channel.send(`<@${mute.id}> Fue muteado durante | **${ms(ms(mutetime))}**`);

  setTimeout(function(){
    mute.removeRole(muterole.id);
    message.channel.send(`<@${mute.id}> Ahora puede hablar!`);
  }, ms(mutetime));

}

module.exports.config = {
    name: "tempmute",
    description: "Quita el permiso de chatear al castigado durante un tiempo determinado",
    usage: "!tempmute (@usuario) (tiempo 1s/m/h/d)",
    acceso: "Staff",
    aliases: ["tm"]
}