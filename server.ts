import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));

let wordsToFind: string[] = ['python', 'javascript', 'browser', 'react', 'nodejs', 'programming', 'internet', 'software', 'computer'];

app.get('/get-word', (req: Request, res: Response) => {
  let chosenWord: string = wordsToFind[Math.floor(Math.random() * wordsToFind.length)].toUpperCase();
  let hiddenWord: string = chosenWord.replace(/[A-Z]/g, '_');
  res.json({ hiddenWord, length: chosenWord.length });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
