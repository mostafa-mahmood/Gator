import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
    feed_url: { type: String, required: true, unique: true },
    title: { type: String, default: "Unknown" },
    description: { type: String, default: "Unknown" },
    language: { type: String, default: "Unknown" },
    article_count: { type: Number, default: -1 }
});

const Feed = mongoose.model("Feed", feedSchema);

export default Feed;