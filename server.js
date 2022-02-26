import express from 'express';
import * as mb from './messageboard.js';

const app = express();

// this will serve the files present in /public
app.use(express.static('public'));

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

app.get('/messages', getMessages);
app.get('/messages/:id', getMessage);
app.post('/messages', express.json(), postMessage); // ?

app.listen(8080);