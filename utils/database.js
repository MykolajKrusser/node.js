const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback)=>{
  MongoClient.connect(
    'mongodb+srv://nicko:nicko123@cluster0-zfaem.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected');
      _db = client.db()
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err
    });
  };

const getDb = () =>  {
  if(_db){
    return _db;
  };
  throw 'No dataBase found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
