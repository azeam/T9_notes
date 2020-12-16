const { db } = require("../admin/admin");

// get all notes by user
exports.getAllNotes = (request, response) => {
	db
		.collection("notes")
        .where("username", "==", request.user.username)
		.orderBy("timestamp", "desc")
		.get()
		.then((data) => {
			let notes = [];
			data.forEach((doc) => {
				notes.push({
                    noteId: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    category: doc.data().category,
					timestamp: doc.data().timestamp,
				});
			});
			return response.json(notes);
		})
		.catch((err) => {
			return response.status(500).json({ error: err.message });
		});
};

// get a note
exports.getSingleNote = (request, response) => {
	db
        .doc(`/notes/${request.params.noteId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json({ error: "Note not found" });
            }
            if (doc.data().username !== request.user.username) {
                return response.status(403).json({ error: "Unauthorized to read this note" })
            }
			NoteData = doc.data();
			NoteData.noteId = doc.id;
			return response.json(NoteData);
		})
		.catch((err) => {
			return response.status(500).json({ error: error.message });
		});
};

// save note
exports.saveNewNote = (request, response) => {
	if (request.body.body.trim() === "") {
		return response.status(400).json({ body: "Note must not be empty" });
    }
    
    if (request.body.title.trim() === "") {
        return response.status(400).json({ title: "Title must not be empty" });
    }
    
    const newNote = {
        title: request.body.title,
        body: request.body.body,
        category: request.body.category,
		username: request.user.username,
        timestamp: new Date().toISOString()
    }
    db
        .collection("notes")
        .add(newNote)
        .then((doc) => {
            response.json({ message: "Successfully saved" });
        })
        .catch((err) => {
			response.status(500).json({ error: err.message });
		});
};

// delete note
exports.deleteNote = (request, response) => {
    const document = db.doc(`/notes/${request.params.noteId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: "Note not found" });
            }
            if (doc.data().username !== request.user.username) {
              return response.status(403).json({ error: "Unauthorized to delete this note" });
            }
            if (document.delete()) {
                response.json({ message: "Successfully deleted" });
            }
        })
        .catch((err) => {
            response.status(500).json({ error: err.message });
        });
};

// edit note
exports.editNote = (request, response) => { 
    // disallow edit of id and date
    if (request.body.noteId || request.body.timestamp) {
        return response.status(403).json({ message: "Not allowed to edit" });
    }
    // update note with id noteId
    let document = db.collection("notes").doc(`${request.params.noteId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: "Note not found" });
            }
            if (doc.data().username !== request.user.username) { // only allow editing of users own notes
                return response.status(403).json({ error: "Unauthorized to edit this note" });
            }
            if (document.update(request.body)) {
                response.json({ message: "Successfully updated" });
            }
        })
        .catch((err) => {
            response.status(500).json({ error: err.message });
        });
};
