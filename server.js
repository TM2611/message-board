import express from 'express';
import * as mb from './messageboard.js';

const app = express();

// this will serve the files present in /public
// extensions parameter to automatically fill in .html in URLs.
app.use(express.static('public', { extensions: ['html'] }));

function getMessages(req, res) {
  res.json(mb.listMessages());
}

function getMessage(req, res) {
  const result = mb.findMessage(req.params.id);
  if (!result) {
    res.status(404).send('No match for that ID.');
    return;
  }
  res.json(result);
}

function postMessage(req, res) {
  const messages = mb.addMessage(req.body.msg);
  res.json(messages);
};

function putMessage(req, res) {
  const message = mb.editMessage(req.body);
  res.json(message);
}

app.get('/messages', getMessages);
app.get('/messages/:id', getMessage);
app.post('/messages', express.json(), postMessage); // 3?
app.put('/messages/:id', express.json(), putMessage); // 3?

app.listen(8080);