import Note from "../models/note.js";

export async function getAllNotes (req,res){
    try{
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
    }catch(error){
    console.error("Error in getAllNotes controller",error);
    res.status(500).json({message: "Internal server error"});
    }
}


export async function getNoteById (req,res){
    try{
    const notes = await Note.findById(req.params.id);
    if (!notes) return res.status(404).json({message: "note not found!"});
    res.status(200).json(notes);
    }catch(error){
    console.error("Error in getNote controller",error);
    res.status(500).json({message: "Internal server error"});
    }
}



export async function CreateNote (req,res){
    try{
        const {title,content} = req.body
        const newNote = new Note({title,content});
        const savedNote = await newNote.save();   
        res.status(201).json(savedNote);
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
    
}

export async function UpdateNote (req,res){
    try{
        const {title,content} = req.body
        const UpdatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},
                    {
                     new: true,
                    })
        if(!UpdatedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).send(UpdatedNote);
    }catch(error){
        res.status(500).json({message: "Error updating note"})
    }
    
}

export async function DeleteNote (req,res){
     try{
        const {title,content} = req.body
        const DeletedNote = await Note.findByIdAndDelete(req.params.id,{title,content},
                    {
                     new: true,
                    })
        if(!DeletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).send(DeletedNote);
    }catch(error){
        res.status(500).json({message: "Error Deleting note"})
    }
}
