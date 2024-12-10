import 'dotenv/config';
import mongoose from 'mongoose'

// Handle Configuration for connect to database

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'financial_instrument';

const URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;


const dbConnection = () => {
    mongoose.connect(URL)
    .then((conn) => console.log(`Connected to MongoDB: ${conn.connection.host}`))
}

export default dbConnection;
