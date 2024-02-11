async function loadPrefix(client) {
    const { loadFiles } = require('../Eventos/Funciones/fileLoader.js')
    const ascii = require('ascii-table')
    const table = new ascii().setHeading('Comandos', 'Estado')

    await client.prefixs.clear()
    const Files = await loadFiles('comandosprefix')
    Files.forEach((file) => {
        const prefixs = require(file);
        client.prefixs.set(prefixs.name, prefixs);
        if(prefixs.aliases && Array.isArray(prefixs.aliases)) {
            prefixs.aliases.forEach(alias => {
                prefixs.aliases.set(alias, prefixs.name)
            })
        }

        table.addRow(prefixs.name, '✅')
    })

    return console.log(table.toString(), "\nComandos de Prefix cargados")
}

module.exports = { loadPrefix }