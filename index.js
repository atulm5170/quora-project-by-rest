// const express = require("express");
// const app = express();
// const path = require("path");

// const port = 8080;

// app.use(express.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use(express.static(path.join(__dirname, "public")));

// let posts = [
//       {
//             id: "1",
//             username: "apnaCollege",
//             content: "coding mtlb apna college!"
//       },
//       {
//             id: "2",
//             username: "atul mishra",
//             content: "high Iq man in coding,reasoning,math!"
//       },
//       {
//             id: "3",
//             username: "sumit",
//             content: "hey! i got internship form HCL company!"
//       }
// ];

// //show all posts
// app.get("/posts", (req, res) => {
//       res.render("index.ejs", { posts });
// });

// //create New post page
// app.get("/posts/new", (req, res) => {
//       res.render("new.ejs");
// });

// //Add new Post
// app.post("/posts", (req, res) => {
//       let { id, username, content } = req.body;
//       posts.push({ id, username, content });
//       res.redirect("/posts");
// });

// // open edit page
// app.get("/posts/:id", (req, res) => {
//       let { id } = req.params;

//       let post = posts.find((p) => p.id == id);

//       res.render("edit.ejs", { post });
// });

// // update post
// app.post("/posts/:id", (req, res) => {
//       let { id } = req.params;
//       let { username, content } = req.body;

//       let post = posts.find((p) => p.id == id);

//       post.username = username;
//       post.content = content;

//       res.redirect("/posts");
// });


// // app.delete("/posts/:id", (req, res) => {
// //       res.render("index.ejs");
// // });

// app.listen(port, () => {
//       console.log(`server is on port ${port}`);
// });


const express = require("express");
const app = express();
const path = require("path");

const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
// uuidv4();
const port = 8080;
// app.use(express.json());

// const cors = require("cors");

// app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

//data
let posts = [
      {
            id: uuidv4(),
            username: "apnaCollege",
            content: "coding mtlb apna college"
      },
      {
            id: uuidv4(),
            username: "atul mishra",
            content: "hey! my Iq is very high in math, reasoning and coding"
      },
      {
            id: uuidv4(),
            username: "sumit",
            content: "hey! i got internship in HCL company!"
      }
];

// show all posts
app.get("/posts", (req, res) => {
      res.render("index.ejs", { posts });
});

// create new form
app.get("/posts/new", (req, res) => {
      res.render("new.ejs");
});

// add new post
app.post("/posts", (req, res) => {
      let { username, content } = req.body;
      let id = uuidv4();
      posts.push({ id, username, content });
      res.redirect("/posts");
});

// edit form
app.get("/posts/:id/edit", (req, res) => {
      let { id } = req.params;
      let post = posts.find((p) => id === p.id);
      res.render("edit.ejs", { post });
});

// update post
app.patch("/posts/:id", (req, res) => {
      let { id } = req.params;
      let { username, content } = req.body;

      let post = posts.find((p) => id === p.id);
      post.username = username;
      post.content = content;

      res.redirect("/posts");
});


// //method:1 to delete + undo post

// let deletedPost = null; //backup variable

// // delete post
// app.delete("/posts/:id", (req, res) => {
//       let { id } = req.params;

//       deletedPost = posts.find((p) => p.id === id);
//       posts = posts.filter((p) => p.id !== id);

//       res.redirect("/posts");
// });


// // undo post
// app.post("/posts/undo", (req, res) => {
//       if (deletedPost) {
//             posts.push(deletedPost);
//             deletedPost = null;
//       }
//       res.redirect("/posts");
// });


//method:2 to delete + undo post

let lastDeleted = null; //backup variable

// delete post
app.delete("/posts/:id", (req, res) => {
      let { id } = req.params;

      let index = posts.findIndex((p) => p.id === id);

      lastDeleted = {
            post: posts[index],
            index: index
      };

      posts.splice(index, 1);

      res.redirect("/posts");
});

//undo post
app.post("/posts/undo", (req, res) => {
      if (lastDeleted) {
            posts.splice(lastDeleted.index, 0, lastDeleted.post);
            lastDeleted = null;
      }

      res.redirect("/posts");
});


// show single post (ALWAYS LAST)
app.get("/posts/:id", (req, res) => {
      let { id } = req.params;
      let post = posts.find((p) => id === p.id);
      res.render("show.ejs", { post });
});

app.listen(port, () => {
      console.log(`server is working on port: ${port}`);
});