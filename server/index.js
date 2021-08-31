const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");
const { Users, Events, Registrations } = require("./mongoose");
require("dotenv").config();

const app = express();

app.use(express.json({ limit: "50mb" }));

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

app.post("/check", async (req, res) => {
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

app.post("/add", async (req, res) => {
  try {
    const check = await auth(req.body.email, req.body.pass);
    if (check) {
      const newEvent = new Events({
        event: req.body.event,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        image: req.body.image,
        max: req.body.max,
        registered: 0,
      });
      await newEvent.save();
      res.send({ status: "true" });
    } else {
      res.send({ status: "false" });
    }
  } catch {}
});

app.post("/update", async (req, res) => {
  try {
    const check = await auth(req.body.email, req.body.pass);
    if (check) {
      await Events.findByIdAndUpdate(
        { event: req.body.oldevent },
        {
          $set: {
            event: req.body.event,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            image: req.body.image,
            max: req.body.max,
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

app.post("/register", async (req, res) => {
  try {
    let event = await Events.findOne({ event: req.body.event });
    if (event.max == 0 || event.registered < event.max) {
      let newRegister = new Registrations({
        event: req.body.event,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        branch: req.body.branch,
        year: req.body.year,
      });
      await newRegister.save();
      await Events.findOneAndUpdate(
        { event: req.body.event },
        { $inc: { registered: 1 } },
        { new: true }
      );
      res.send({ status: "true" });
    } else {
      res.send({ status: "" });
    }
  } catch {
    res.status(404).send({ status: "false" });
  }
});

app.post("/get", async (req, res) => {
  try {
    let date = new Date().getTime();
    let upcoming = await Events.find({
      date: { $gte: date },
    }).sort({
      date: 1,
    });

    let previous = await Events.find({
      date: { $lt: date },
    }).sort({
      date: 1,
    });
    res.send({
      status: "true",
      upcoming: upcoming,
      previous: previous,
    });
  } catch {
    res.status(404).send({ status: "false" });
  }
});

app.post("/registrations", async (req, res) => {
  try {
    const check = await auth(req.body.email, req.body.pass);
    if (check) {
      let result = await Registrations.find({
        event: req.body.event,
      });
      res.send({ status: "true", result: result });
    } else {
      res.send({ status: "false" });
    }
  } catch {}
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    "running at http://localhost:" +
      (process.env.PORT ? process.env.PORT : 3000)
  );
});
