import 'dotenv';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})