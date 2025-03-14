import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    feed_id: { type: mongoose.Schema.Types.ObjectId, ref: "Feed", required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image_url: { type: String, default: null },
    category: { type: String, default: null },
    publish_date: { type: Date, default: null }
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
