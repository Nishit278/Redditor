// const keepAlive = require('./server')
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
    if (cmdName === "wholesome") {
      try {
        const random = Math.floor(Math.random() * 100);
        const post = await getWholesome(random);
        message.channel.send(post.title, { files: [post.url] });
      } catch (err) {
        console.log(err);
      }
    }
    if (cmdName === "darkjoke") {
      try {
        const random = Math.floor(Math.random() * 100);
        const post = await getDarkJokes(random);
        message.channel.send(`${post.title} \n${post.selftext}`);
      } catch (err) {
        console.log(err);
      }
    }
    if (cmdName === "yum") {
      try {
        const random = Math.floor(Math.random() * 100);
        const post = await getFood(random);
        message.channel.send(post.title, { files: [post.url] });
      } catch (err) {
        console.log(err);
      }
    }
    if (cmdName === "pup") {
      const random = Math.floor(Math.random() * 100);
      const post = await getFloofs(random);
      message.channel.send(post.title, { files: [post.url] });
    }
  }
});
// keepAlive();

client.login(TOKEN);

const getMemes = async (num) => {
  const posts = await fetch(
    "https://www.reddit.com/r/dankmemes/hot.json?limit=100"
  );
  const data = await posts.json();
  const postArray = data.data.children;
  return postArray[num].data;
};
const getWholesome = async (num) => {
  const posts = await fetch(
    "https://www.reddit.com/r/wholesomememes/hot.json?limit=100"
  );
  const data = await posts.json();
  const postArray = data.data.children;
  return postArray[num].data;
};
const getFood = async (num) => {
  const posts = await fetch("https://www.reddit.com/r/Food/hot.json?limit=100");
  const data = await posts.json();
  const postArray = data.data.children;
  return postArray[num].data;
};
const getDarkJokes = async (num) => {
  const posts = await fetch(
    "https://www.reddit.com/r/DarkJokes/hot.json?limit=100"
  );
  const data = await posts.json();
  const postArray = data.data.children;
  return postArray[num].data;
};
const getFloofs = async (num) => {
  const posts = await fetch(
    "https://www.reddit.com/r/PuppySmiles/hot.json?limit=100"
  );
  const data = await posts.json();
  const postArray = data.data.children;
  return postArray[num].data;
};
