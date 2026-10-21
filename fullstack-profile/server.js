const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve CSS and JavaScript from public folder
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {

    const profile = {
        name: "Sumedha T S",
        pronouns: "She/Her",
        title: "Student of R V University Bangalore",
        location: "Bengaluru, Karnataka",
        connections: 44,
        university: "RV University"
    };

    res.render("index", {
        profile: profile
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
