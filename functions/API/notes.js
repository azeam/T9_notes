const { db } = require("../admin/admin");

exports.getAllNotes = (request, response) => {
	db
		.collection("notes")
		.where('username', '==', request.user.username)
		.orderBy("createdAt", "desc")
		.get()
		.then((data) => {
			let notes = [];
			data.forEach((doc) => {
				notes.push({
                    noteId: doc.id,
                    title: doc.data().title,
					body: doc.data().body,
					createdAt: doc.data().createdAt,
				});
			});
			return response.json(notes);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.getSingleNote = (request, response) => {
	db
        .doc(`/notes/${request.params.noteId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json(
                    { 
                        error: 'Note not found' 
                    });
            }
            if(doc.data().username !== request.user.username){
                return response.status(403).json({error:"UnAuthorized"})
            }
			NoteData = doc.data();
			NoteData.noteId = doc.id;
			return response.json(NoteData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: error.code });
		});
};

exports.saveNewNote = (request, response) => {
	if (request.body.body.trim() === "") {
		return response.status(400).json({ body: "Must not be empty" });
    }
    
    if (request.body.title.trim() === "") {
        return response.status(400).json({ title: "Must not be empty" });
    }
    
    const newNote = {
        title: request.body.title,
		body: request.body.body,
		username: request.user.username,
        createdAt: new Date().toISOString()
    }
    db
        .collection("notes")
        .add(newNote)
        .then((doc)=>{
            const responseNote = newNote;
            responseNote.id = doc.id;
            return response.json(responseNote);
        })
        .catch((err) => {
			response.status(500).json({ error: "Something went wrong" });
			console.error(err);
		});
};

exports.deleteNote = (request, response) => {
    const document = db.doc(`/notes/${request.params.noteId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: "Note not found" })
			}
			if(doc.data().username !== request.user.username){
				return response.status(403).json({error:"UnAuthorized"})
		   	}
            return document.delete();
        })
        .then(() => {
            response.json({ message: "Successfully deleted" });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.editNote = (request, response) => { 
    if (request.body.noteId || request.body.createdAt){
        response.status(403).json({message: "Not allowed to edit"});
	}
	
    let document = db.collection("notes").doc(`${request.params.noteId}`);
    document.update(request.body)
    .then(()=> {
        response.json({ message: "Successfully updated"});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ 
                error: err.code 
        });
    });
};

