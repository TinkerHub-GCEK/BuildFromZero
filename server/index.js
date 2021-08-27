const express = require("express");
const bcrypt = require("bcryptjs");
const { Users, Events, Registrations } = require("./mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const auth = async (email, pass) => {
  try {
    const result = await Users.findOne({ email: email });
    if (result && pass == result.pass) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  } catch {
    return Promise.resolve(false);
  }
};

app.get("/check", async (req, res) => {
  try {
    const result = await Users.findOne({ email: req.body.email });
    if (result) {
      const isMatch = await bcrypt.compare(req.body.pass, result.pass);
      if (isMatch) {
        res.send({ status: "true", api: result.pass });
      } else {
        res.status(404).send({ status: "false" });
      }
    } else {
      res.status(404).send({ status: "false" });
    }
  } catch {
    res.status(404).send({ status: "false" });
  }
});

app.get("add", async (req, res) => {
  try {
    const check = await auth();
    if (check) {
      const newEvent = new Events({
        event: req.body.event,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        banner: req.body.banner,
        max: req.body.max ? req.body.max : 0,
        registered: 0,
        status: req.body.status,
      });
      await newEvent.save();
      res.send({ status: "true" });
    } else {
      res.send({ status: "false" });
    }
  } catch {}
});

app.get("update", async (req, res) => {
  try {
    const check = await auth();
    if (check) {
      await Events.findByIdAndUpdate(
        { event: req.body.event },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            banner: req.body.banner,
            max: req.body.max ? req.body.max : 0,
            status: req.body.status,
          },
        },
        { new: true }
      );
      res.send({ status: "true" });
    } else {
      res.send({ status: "false" });
    }
  } catch {}
});

app.get("register", async (req, res) => {
  try {
    let newRegister = new Registrations({
      event: req.body.event,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      branch: req.body.branch,
      year: req.body.year,
      school: req.body.school ? req.body.school : "",
    });
    await newRegister.save();
    await Events.findOneAndUpdate(
      { event: req.body.event },
      { $inc: { registered: 1 } },
      { new: true }
    );
    res.send({ status: "true" });
  } catch {
    res.status(404).send({ status: "false" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("running");
});
