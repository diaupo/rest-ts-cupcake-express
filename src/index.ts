import { cupcakeRouter } from './cupcake/index.js';

import express, { Express, Request, Response } from "express";
import morgan from 'morgan';
import { createWriteStream } from 'fs';

const app: Express = express();
const port =  3000;

// required to parse request.body int json
app.use(express.json());
const accessLogStream = createWriteStream('access.log', { flags: 'a' });
app.use(morgan('common', {
immediate: true,
stream: accessLogStream
}));


app.use('/cupcake', cupcakeRouter);

//app.get('/', (request, response) => response.redirect('/cupcake'));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my first Typescript Express project");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});