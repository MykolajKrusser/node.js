const db = require('../utils/database').getDb;
const mongodb = require('mongodb');
const ObjectId = new mongodb.ObjectId;


class User {
  constructor(userName, email){
    this.name = userName;
    this.email = email;
  }

  save(){
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  static findById(userId){
    const db = getDb();
    return db.collection('user').findOne({_id: new ObjectId(userId)});
  }
}
module.exports = User;