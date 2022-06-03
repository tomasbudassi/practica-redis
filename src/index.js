const express = require("express");
const axios = require("axios");
const redis = require("redis");
const responseTime = require("response-time");
const { promisify } = require("util");

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

const app = express();

app.use(responseTime());

app.get("/character", async (req, res, next) => {
  try {
    // Response from cache
    const reply = await GET_ASYNC("character");
    if (reply) {
        return res.send(JSON.parse(reply));
    } 

    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );

    await SET_ASYNC("character", JSON.stringify(response.data));

    res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/character/:id", async (req, res) => {
  console.log(req.originalUrl);

  try {
    const reply = await GET_ASYNC(req.params.id);

    if (reply) {
      return res.send(JSON.parse(reply));
    }

    const response = await axios.get(
      "https://rickandmortyapi.com/api/character/" + req.params.id
    );

    await SET_ASYNC(req.params.id, JSON.stringify(response.data));
    return res.json(response.data);
  } catch (error) {
    return res.status(error.response.status).json({ message: error.message });
  }
});

app.listen(3000);
console.log("server on port 3000");
