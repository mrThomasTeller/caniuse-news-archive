import express from 'express';

const app = express();

app.use(express.static('./docs/'));

app.listen(process.env.PORT ?? 3000, () => console.log('app started'));
