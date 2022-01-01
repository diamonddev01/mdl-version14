const { MessageEmbed } = require("discord.js-light");

module.exports = {
    name: 'allow',
    aliases: ['alw', 'allw'],
    description: 'Allows a user into your Voice Channel.',
    usage: ['allow <User>'],
    cooldown: 3,
    premium: "Premium",
    async execute(mdl, message, args) {
        const member = await message.guild.members.fetch(message.author.id, { cache: false });
        const vc = mdl.vcowners.get(member.user.id);
        if(!vc) return;
        if(member.voice.channelID != vc) return;
        if(!message.mentions.users.first()) return;
        const chan = await message.guild.channels.fetch(vc, { cache: false });
        await chan.updateOverwrite(message.mentions.users.first(), {
            CONNECT: true
        }).then(() => {
            message.channel.send(new MessageEmbed()
                .setDescription(`\`\`\` Allowed ${message.mentions.users.first().tag} \`\`\``)
                .setColor(mdl.config.pcol));
        }).catch(e => {
            message.channel.send(new MessageEmbed()
                .setDescription("``` Caught an error. ```")
                .setColor(mdl.config.errcol));
        })
    }
}