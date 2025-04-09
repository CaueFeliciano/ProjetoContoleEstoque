require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = process.env.MONGO_URI;

const BD_NAME = "controle_estoque";
const COLLECTION_PRODUTOS = "produtos";

const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1,
    useNewUrlParse: true,
    useUnifiedTopology: true
});

let db;
let produtosCollection;

async function connect() {
    try{
        if(db){
            console.log('Usando conexão existente com o Mongo');
            return {db, produtosCollection};
        }

        await client.connect();
        console.log('Conectado com sucesso ao servidor MongoDB');

        db = client.db(BD_NAME);
        produtosCollection = db.collection(COLLECTION_PRODUTOS);
        console.log(`Conectado ao banco de dados '${DB_NAME}' e collection '${COLLECTION_PRODUTOS}'`);

        return {db, produtosCollection};

    } catch (error){
        console.error('Erro ao conectar ao MongoDB', erro);
        throw error;
    }
}

async function close() {
    try {
      await client.close();
      db = null;
      produtosCollection = null;
      console.log('Conexão com MongoDB fechada');
    } catch (error) {
      console.error('Erro ao fechar conexão com MongoDB:', error);
      throw error;
    }
}