import router_login from '../BackEnd/router.js';

const express = require ('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/login', router_login);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });