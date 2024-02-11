module.exports = {
    name: 'directo',
    run: async(message, client, args) => {
        message.delete()
        message.channel.send('Estamos en directo! https://twitch.tv/kirinuxx')
    }
}