require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const TOKEN = process.env.BOT_TOKEN;
const PREFIX = "$";

client.on("ready", () => {
  console.log("Our BOT is running");
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [cmdName, ...args] = message.content
      .substring(PREFIX.length)
      .split(/\s+/);
    if (cmdName === "meme") {
      try {
        const random = Math.floor(Math.random() * 100);
        const post = await getMemes(random);
        message.channel.send(post.title, { files: [post.url] });
      } catch (err) {
        console.log(error);
      }
    }
    if (cmdName === "aww") {
      const random = Math.floor(Math.random() * 100);
      const post = await getFloofs(random);
      message.channel.send(post.title, { files: [post.url] });
    }
  }
});

client.login(TOKEN);

const getMemes = async (num) => {
  const posts = await fetch(
    "https://www.reddit.com/r/dankmemes/hot.json?limit=100"
  );
  const data = await posts.json();
  const postArray = data.data.children;
  return postArray[num].data;
};
const getFloofs = async (num) => {
  const posts = await fetch("https://www.reddit.com/r/aww/top.json?limit=100");
  const data = await posts.json();
  const postArray = data.data.children;
  return postArray[num].data;
};