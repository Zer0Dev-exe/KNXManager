module.exports = {
    name: 'cerrar',
    run: async(message, client, args) => {
        console.log(message.channel.id)
        console.log(args)
        if(args == 'test') {
            console.log('yes')
        }
    }
}