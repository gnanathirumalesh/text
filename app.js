/*
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/download', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const formattedText = parseHTML(html);

    // Set headers for file download
    res.setHeader('Content-disposition', 'attachment; filename=data.txt');
    res.setHeader('Content-type', 'text/plain');

    // Send the formatted text content as a downloadable file
    res.send(formattedText);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to Fetch the Data. Please provide a valid URL.' });
  }
});

function parseHTML(html) {
  // Use cheerio to parse the HTML and extract text content
  const $ = cheerio.load(html);

  // Filter out unwanted elements, e.g., script and style tags
  $('script').remove();
  $('style').remove();

  // Extract text content from the body
  const textContent = $('body').text();

  // Remove leading whitespaces and indentations, and break lines after every 30 words
  const trimmedAndFormattedText = formatText(textContent);

  return trimmedAndFormattedText;
}

function formatText(inputText) {
  // Remove leading whitespaces and indentations
  let trimmedText = inputText.replace(/^\s+/gm, '');

  // Break lines after every 30 words
  let formattedText = trimmedText.replace(/(\S+\s*){1,15}/g, '$&\n');

  return formattedText;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
*/

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/download', async (req, res) => {
  const { url } = req.query; // Extract the URL parameter from query parameters

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is missing.' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const formattedText = parseHTML(html);

    // Set headers for file download
    res.setHeader('Content-disposition', 'attachment; filename=data.txt');
    res.setHeader('Content-type', 'text/plain');

    // Send the formatted text content as a downloadable file
    res.send(formattedText);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to Fetch the Data. Please provide a valid URL.' });
  }
});

function parseHTML(html) {
  // Use cheerio to parse the HTML and extract text content
  const $ = cheerio.load(html);

  // Filter out unwanted elements, e.g., script and style tags
  $('script').remove();
  $('style').remove();

  // Extract text content from the body
  const textContent = $('body').text();

  // Remove leading whitespaces and indentations, and break lines after every 30 words
  const trimmedAndFormattedText = formatText(textContent);

  return trimmedAndFormattedText;
}

function formatText(inputText) {
  // Remove leading whitespaces and indentations
  let trimmedText = inputText.replace(/^\s+/gm, '');

  // Break lines after every 30 words
  let formattedText = trimmedText.replace(/(\S+\s*){1,15}/g, '$&\n');

  return formattedText;
}

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
