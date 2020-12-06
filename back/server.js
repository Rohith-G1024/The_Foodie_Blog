const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const url = "mongodb://localhost:27017/mydb";
const port = 5000;
const userroutes = express.Router();

let Users = require("./users.model");
let Foods = require("./foods.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("Database connected successfully");
});

userroutes.route("/").get((req, res) => {
  Users.find((err, users) => {
    if (err) console.log(err);
    else res.json(users);
  });
});

userroutes.route("/find").get((req, res) => {
  Users.findOne(
    { name: req.query.name, password: req.query.password },
    (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      } else {
        if (!user) {
          res.status(404).json({ error: "Invalid creds." });
          return;
        } else {
          res.json(user);
        }
      }
    }
  );
});

userroutes.route("/recipe").get((req,res)=>{
    Foods.find({genre:req.query.genre},(err,food)=>{
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        else {
            if(!food)
            {
                res.status(400).json({error:"no recipe found"})
                return;
            }

            else res.json(food)

        }
    })
})

userroutes.route("/findf/:id").get((req, res) => {
  let id = req.params.id;
  Foods.findById(id, (err, users) => {
    res.json(users);
  });
});

userroutes.route("/:id").get((req, res) => {
  let id = req.params.id;
  Users.findById(id, (err, users) => {
    res.json(users);
  });
});


userroutes.route("/findr").get((req, res) => {
  Foods.findOne(
    { title: req.query.title, genre: req.query.genre },
    (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      } else {
        if (!user) {
          res.status(404).json({ error: "Invalid creds." });
          return;
        } else {
          res.json(user);
        }
      }
    }
  );
});

userroutes.route("/update/:id").post((req, res) => {
  Users.findById(req.params.id, (err, user) => {
    if (!user) res.status(404).send("No user data found");
    else {
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      user.phone = req.body.phone;
      user.bio = req.body.bio;
      user.recipes = req.body.recipes;
      user.save()
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          res.status(400).send("Not Updated User...");
        });
    }
  });
});


userroutes.route("/edit/:id").post((req, res) => {
  Foods.findById(req.params.id, (err, food) => {
    if (!food) res.status(404).send("No recipe data found");
    else {
      food.title = req.body.title;
      food.prep = req.body.prep;
      food.ingr = req.body.ingr;
      food.steps = req.body.steps;
      food.genre = req.body.genre;
      food.save()
        .then(food => {
          res.json(food);
        })
        .catch((err) => {
          res.status(400).send("Not Updated Recipe...");
        });
    }
  });
});

userroutes.route("/delete/:id").delete((req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).send("User not Deleted...");
    });
})

userroutes.route("/deletef/:id").delete(
  (req, res) => {
    Foods.findByIdAndDelete(req.params.id)
      .then((food) => {
        res.json(food);
      })
      .catch((err) => {
        res.status(400).send("User not Deleted...");
      });
  }
);

userroutes.route("/add").post((req, res) => {
  let user = new Users(req.body);
  user
    .save()
    .then((user) => {
      res.status(200).json({ user: "user added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new user failed.");
    });
});

userroutes.route("/addr").post((req, res) => {
  let food = new Foods(req.body);
  food
    .save()
    .then((food) => {
      res.status(200).json(food);
    })
    .catch((err) => res.status(400).send("Add recipe failed.."));
});

app.use("/mydb", userroutes);

app.listen(port, () => {
  console.log("Server running at port:" + port);
});
