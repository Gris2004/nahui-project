import express from 'express';
import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.use(express.json());
//app.use('/api', router)
app.set('json spaces', 2);

const port = process.env.API_PORT || 8080;
const ip = process.env.LOCAL_IP || localhost;

app.listen(port, ip, () => {console.log(`Listening port: ${port} and ip: ${ip}`)});
console.log(`url: http://${ip}:${port}`);
