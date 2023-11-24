require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js')

const BrawlStars = require("brawlstars.js")
const token = process.env.APITOKEN
const cliente = new BrawlStars.Client(token)

module.exports = {
  data: new SlashCommandBuilder()
  .setName('brawl')
  .setDescription('Stats de Brawl'),

  async execute(interaction, client) {
    const player = await cliente.getPlayer("#8GC9PQVQQ")

    console.log(player)
  } 
}