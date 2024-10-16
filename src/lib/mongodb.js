// src/lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB connection string (stored in .env file)
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

  client = new MongoClient(uri, options);
  clientPromise = client.connect();

export default clientPromise;
