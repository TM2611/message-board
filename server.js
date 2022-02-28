import express from 'express';
import * as mb from './messageboard.js';

const app = express();

// this will serve the files present in /public
// extensions parameter to automatically fill in .html in URLs.
app.use(express.static('public', { extensions: ['html'] }));

async function getMessages(req, res) {
  res.json(await mb.listMessages());
}

async function getMessage(req, res) {
  const result = await mb.findMessage(req.params.id);
  if (!result) {
    res.status(404).send('No match for that ID.');
    return;
  }
  res.json(result);
}

async function postMessage(req, res) {
  const messages = await mb.addMessage(req.body.msg);
  res.json(messages);
};

function putMessage(req, res) {
  const message = mb.editMessage(req.body);
  res.json(message);
}

// wrap async function for express.js error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/messages', asyncWrap(getMessages));
app.get('/messages/:id', asyncWrap(getMessage));
app.put('/messages/:id', express.json(), asyncWrap(putMessage));
app.post('/messages', express.json(), asyncWrap(postMessage));

app.listen(8080);