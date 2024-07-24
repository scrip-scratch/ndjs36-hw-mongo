const express = require("express");
const redis = require("redis");

const REDIS_URL = process.env.REDIS_URL || "redis://localhost";
const client = redis.createClient({ url: REDIS_URL });

(async () => {
  client.connect();
})();

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get("/counter/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    const count = await client.get(bookId);
    res.json({ count: count });
  } catch (error) {
    res.json({ errorMessage: error });
  }
});

app.post("/counter/:bookId/incr", async (req, res) => {
  const { bookId } = req.params;

  try {
    const count = await client.incr(bookId);
    res.json({ count: count });
  } catch (error) {
    res.json({ errorMessage: error });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server is started on port ${PORT}`));
