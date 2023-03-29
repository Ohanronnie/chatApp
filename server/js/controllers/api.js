import User from "../model/User.js";
/*mongoose.connect(
  process.env.MONGOURL!,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connected")
);*/
const chat = async (req, res) => {
    const result = await User.findOne({ email: req.body.email }).select("_id");
    result
        ? res.json({ status: "OK", _id: result._id || result })
        : res.json({ status: "ERR" });
};
export { chat as chat };
