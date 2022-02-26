import express from 'express';
import uuid from 'uuid-random';

const app = express();

// this will serve the files present in /public
app.use(express.static('public'));

let messages = [
  {
    id: 'xnshfdsafasd',
    msg: 'these are three default messages',
    time: 'an hour ago',
  },
  {
    id: 'dskjdshkjhsd',
    msg: 'delivered from the server',
    time: 'yesterday',
  },
  {
    id: 'vcxbxcvfggzv',
    msg: 'using a custom route',
    time: 'last week',
  },
];
app.get('/messages', (req, res) => {
  res.json(messages);
});



// Retrieve the details of any individual message.
app.get('/messages/:id', (req, res) => {
  for (const message of messages) {
    if (message.id === req.params.id) {
      res.json(message);
      return; // break
    }
  }
  res.status(404).send('No match for that ID.');
});

app.post('/messages', express.json(), (req, res) => {
  const newMessage = {
    id: uuid(),
    msg: req.body.msg,
    time: Date(),
  };
  messages = [newMessage, ...messages.slice(0, 9)];
  res.json(messages);
});

app.listen(8080);