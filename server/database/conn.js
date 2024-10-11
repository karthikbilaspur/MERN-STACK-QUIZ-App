//database/conn.js

import mongoose from "mongoose";

export default async function connect(){
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("Invalid Database Connection");
    }
}
