const functions = require("firebase-functions");
const app = require("express")();
const auth = require('./admin/auth');

// enable cross domain access
const cors = require('cors')({origin: true});
app.use(cors); 

// notes
const {
    getAllNotes,
    saveNewNote,
    deleteNote,
    editNote,
    getSingleNote
} = require("./API/notes")

// user
const { 
    loginUser,
    signUpUser
} = require("./API/users")

// notes
app.post("/notes", auth, saveNewNote);
app.get("/notes", auth, getAllNotes);
app.delete("/notes/:noteId", auth, deleteNote);
app.put("/notes/:noteId", auth, editNote);
app.get('/notes/:noteId', auth, getSingleNote);

// user
app.post("/login", loginUser);
app.post("/signup", signUpUser);

exports.api = functions.https.onRequest(app);