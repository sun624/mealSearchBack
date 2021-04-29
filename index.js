const express = require("express");
const cors = require("cors");
const { getRecipe } = require("./Services");
// if (!process.env.PORT) {
//   require("./Secrets");
// }
const MongoClient = require("mongodb").MongoClient;



const connectionString =
  "mongodb+srv://sun624:19900624@cluster0.yrtr8.mongodb.net/recipes?retryWrites=true&w=majority";
MongoClient.connect(
  connectionString,
  {
    useUnifiedTopology: true,
  },
  (err, client) => {
    const app = express();
    app.use(cors());
    app.use(express.json()); //data from json
    app.use(express.urlencoded({ extended: true })); //data from form
    app.use(express.static("public"));

    const path = require("path");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}.`);
    });

    console.log("connect to Database");

    const recipeColletion = client.db("recipes").collection("recipes-favs");

    
    //GET / 
    app.get("/", (req, res) => {
      console.log("Inside Get");
      const { email } = req.body;
      recipeColletion
        .find({ email: email })
        .toArray()
        .then((result) => {
          res.send(result);
        });
    });

    //POST /
    app.post("/", async (req, res) => {
      console.log(req.body);
      const { email, mealId } = req.body;

           // if (!email || !recipe) {
      //   return res.status(400).json({ error: "email and recipe are required" });
      // }

      const newRecipe = {
        email,
        mealId:mealId,
        recipe:await getRecipe(mealId),
      };
      recipeColletion.insertOne(newRecipe);

      res.send("Successfully Added to your favourates");
    });

    //PUT / :UPDATE operation
    app.put("/", async (req, res) => {
      console.log("Inside PUT");
      const { email, uid, recipe } = req.body;

      if (email || uid || recipe) {
        recipeColletion
          .findOneAndUpdate(
            { uid: uid, email: email },
            {
              $set: {
                email: email,
                uid: uid,
                recipe: recipe,
              },
            },
            { returnOriginal: false }
          )
          .then(() =>
            recipeColletion
              .find({ email: email })
              .toArray()
              .then((result) => {
                res.send(result);
              })
          );
      }
    });

    //DELETE
    app.delete("/", (req, res) => {
      console.log("INside DElete");
      const { email, uid } = req.body;

      recipeColletion.deleteOne({ email:email,uid: uid }).then(() =>
        recipeColletion
          .find({ email: email })
          .toArray()
          .then((result) => res.send(result))
      );
    });
  }
);
