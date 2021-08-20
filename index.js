require("dotenv").config();
const Discord = require("discord.js");
const Embed = new Discord.MessageEmbed();
const client = new Discord.Client();
const API_KEY = process.env.API_KEY;
const MONGO_PASS = process.env.MONGO_PASS;
const mongoose = require("mongoose");
client.commands = new Discord.Collection();
const fs = require("fs");
let files = fs.readdirSync("./commands").filter((f) => f.endsWith(".js"));
const prefix = "!";

// CONNECT TO DATABASE MONGODB
mongoose.connect(MONGO_PASS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MODELS
const Data = require("./models/profileData.js");

// QUEUE START

// LOAD COMMAND FILES
for (let file of files) {
  let command = require("./commands/" + file);
  client.commands.set(command.name, command);
  console.log(file + " fue cargado correctamente");
}

client.once("ready", () => {
  console.log(`Bot está activo como ${client.user.tag}`);
});

client.on("message", async (message) => {
  console.log(message.content);

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find((c) => c.alias.includes(commandName));
    if (command) {
      return await command.action(client, message, args);
    }
  }
});
client.login(API_KEY);
