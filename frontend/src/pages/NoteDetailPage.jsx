import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams} from "react-router";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios.js"
import toast from 'react-hot-toast';
const NoteDetailPage = () => {
  const [note,setNote] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const handleDeleteNote = async () =>{
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    try {
       await api.delete(`/notes/${id}`);
       toast.success("Note Deleted Successfully");
       navigate("/");
    }catch(error){
       console.log("error deleting note",error);
       toast.error("failed to delete note");
       if(error.response.status === 429){
         toast.error("Slow down!! You're trying to delete very fast!",{
          duration:4000,
         });
       };
    }
  }

  const handleSave = async () =>{
      if(!note.title.trim() || !note.content.trim()){
        toast.error("All fields are required")
        return;
      }
      setSaving(true);
      try{
         await api.put(`/notes/${id}`,note)
         toast.success("Note Updated Successfully");
      }catch(error){
         console.log("error updating note",error);
         if(error.response.status === 429){
         toast.error("Slow down your updating many notes!!",{
          duration:2000,
         });
       };
      }finally{
        setSaving(false);
        navigate("/");
      }
  }

  useEffect(()=>{
    const fetchNote = async ()=>{
      try {
        const res= await api.put(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note",error);
        toast.error("Failed to fetch the note")
      }finally{
        setLoading(false);
      }
    }
    fetchNote();
  },[id]);

  console.log({note});
  if(loading){
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center" data-theme="forest">
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    )
  }
  return (
   <div className="min-h-screen bg-base-200" data-theme="forest">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
        <Link to="/" className="btn btn-ghost"><ArrowLeftIcon className="h-5 w-5"/>Back to Notes</Link>
        <button onClick={handleDeleteNote} className="btn btn-error btn-outline">
          <Trash2Icon className="h-5 w-5"/>Delete Note
        </button>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
             <div className="form-control mb-4">
               <label className="label">
                 <span className="label-text">Title</span>
               </label>
               <input type="text"
                      placeholder="Note title"
                      className="input input-bordered w-full"
                      value={note.title}
                      onChange={(e) => setNote({...note,title: e.target.value})}
               />
          
             </div>

              <div className="form-control mb-4">
               <label className="label">
                 <span className="label-text">Content</span>
               </label>
               <input type="text"
                      placeholder="Note Content"
                      className="input input-bordered w-full"
                      value={note.content}
                      onChange={(e) => setNote({...note,content: e.target.value})}
               />
          
             </div>

             <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving? "Saving..." : "Save Changes"}
                </button>
             </div>
          </div>
        </div>
        </div>
      </div>
   </div>
  )
}

export default NoteDetailPage