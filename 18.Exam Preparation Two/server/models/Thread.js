let threadSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.String, required: true }],
    dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now }
})
