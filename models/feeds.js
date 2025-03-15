import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
    feed_url: { type: String, required: true, unique: true },
    title: { type: String, default: "Unknown" },
    description: { type: String, default: "Unknown" },
    language: { type: String, default: "Unknown" },
});

const Feed = mongoose.model("Feed", feedSchema);

export default Feed;