import express from 'express';

const app = express();

app.use(express.static('./site/build'));

app.listen(process.env.PORT ?? 3000, () => console.log('app started'));
