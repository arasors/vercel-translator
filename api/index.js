const express = require('express');
const bodyParser = require('body-parser');
const { translate } = require('free-translate');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

const beSolid = (l) => {
  return l?.includes("-") ? l.split("-")[0] : l;
}
// Configure body parser for JSON requests
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const {text, from, to } = req.query;

  try {


      const translatedText = await translate(text, { from: beSolid(from), to: beSolid(to) });

    res.json({
      status: true,
      result: translatedText
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      status: false,
      error: error.message,
      text,
      from,
      to
    });
  }
});

app.post('/', async (req, res) => {
  const { text, from, to } = req.body;

  try {
    const translatedText = await translate(
      text, { from: beSolid(from), to: beSolid(to) }
    );

    res.json({
      status: true,
      result: translatedText,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      status: false,
      error: error.message,
      text,
      from,
      to
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;