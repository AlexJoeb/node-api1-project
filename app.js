// * Import BCryptJS
const bcryptjs = require("bcryptjs");

// * Body Parse JSON
const parse = require('body-parser');

// * Import CORS
const cors = require('cors');

// * Importing the Express Package & Initalizing Server Variable
const server = require("express")();

// * Handle request to the root of the API.
server.get('/', (req, res) => {
    res.send("Hello from the server.");
});

server.use(parse.urlencoded({
    extended: true,
}))

server.use(parse.json());

server.use(cors());

let users = [
    {
        username: "Alex",
        bio: "Some Bio",
        id: 1
    },
    {
        username: "Shannan",
        bio: "Some Bio",
        id: 2
    },
    {
        username: "Robert",
        bio: "Some Bio",
        id: 3
    }
];

// * User Routes
    // * -- GET - Retrieve all users.
    server.get('/api/users', (req, res) => {
        res.json(users);
    });

    // * -- GET - Fetch a user by ID.
    server.get('/api/users/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const user = users.find(user => user.id === id);
        if (!user) return res.status(404).json({ errorMessage: "User not found by given ID." });
        return user ? res.json(user) : res.send("That user was not found.");
    });
    
    // * -- POST - Add a user.
    server.post('/api/users', (req, res) => {
        const { body } = req;
        const { username, bio } = body;

        if (!username || !bio) {
            res.status(400).json({ errorMessage: "Please provide a username and bio for the user." });
            return;
        }
        const nextId = users.length <= 0 ? 1 : users[users.length - 1].id + 1;
        users = [
            ...users,
            {
                username,
                bio,
                id: nextId
            }
        ]

        res.status(201).json(users);
    });

    // * -- DELETE - Remove a user by ID.
    server.delete("/api/users/:id", (req, res) => {
        const id = parseInt(req.params.id);
        users = users.filter(user => user.id !== id);
        res.status(200).json({
            message: `Successfully deleted ID: ${id}`,
            users: users,
        })
    });

    // * -- PATCH - Update a user by ID.
    server.patch("/api/users/:id", (req, res) => {
        const id = parseInt(req.params.id);
        
        // * Find old instance of user and it's index for future reference.
        const user = users.find(user => user.id === id);
        const index = users.findIndex(user => user.id === id);

        // * Extract old instance of user.
        users = users.filter(user => user.id !== id);

        // * Put in the new user instance at old index.
        users.splice(index, 0, {
            ...user,
            ...req.body
        })

        res.status(200).json({
            message: `Successfully updated ID: ${id}`,
            users: users,
        })
    });

// * -- End User Routes --

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is now running on port: ${port}`);
})