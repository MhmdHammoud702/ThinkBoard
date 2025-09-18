import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React, { useState } from 'react'
import {Link} from "react-router";
import { formatDate } from '../lib/util.js';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

const NoteCard = ({note,setNotes}) => {
  const [loading,setLoading] = useState(false);

  const handleDeleteNote = async (e,id) =>{
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    try {
       await api.delete(`/notes/${id}`);
       setLoading(true);
       setNotes((prev)=>prev.filter(note=>note._id !== id));
       toast.success("Note Deleted Successfully");
    }catch(error){
       console.log("error deleting note",error);
       if(error.response.status === 429){
         toast.error("Slow down!! You're deleting Notes very fast!",{
          duration:4000,
         });
       };
    }finally{
        setLoading(false);
    }
  }
  return (
    <Link to={`/note/${note._id}`} data-theme="forest" className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
    <div className='card-body' >
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
           <span className='text-sm text-base-content/60'>
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4'/>
            <button className='btn bg-base-100 border-base-100 text-red-600' onClick={(e) => handleDeleteNote(e,note._id)} disabled={loading}>
                <Trash2Icon className='size-4'/>
            </button>
          </div>
        </div>
    </div>
    </Link>
  )
}

export default NoteCard