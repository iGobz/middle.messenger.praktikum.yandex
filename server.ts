import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`My Chat listening on port ${PORT}!`);
});
