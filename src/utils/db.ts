import mongoose from "mongoose";

const connection: any = {};

async function connect() {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }

  require("dotenv").config();
  let urlDev = "mongodb://127.0.0.1/gestor-de-ingresos";
  let urlProd = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.a7z1tz9.mongodb.net/?retryWrites=true&w=majority`;

  const db = await mongoose.connect(
    process.env.NODE_ENV === "production" ? urlProd : urlDev
  );

  console.log({ db: process.env.NODE_ENV === "production" ? urlProd : urlDev });

  console.log({ connection });
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}

function convertDocToObj(doc: any) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
