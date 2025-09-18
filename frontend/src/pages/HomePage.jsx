import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import RateLimitUi from '../Components/RateLimitUi';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import NoteCard from '../Components/NoteCard.jsx';
import NotesNotFound from '../Components/NotesNotFound.jsx';
import { LoaderIcon } from 'lucide-react';

const HomePage = () => {
  const [isRateLimited,setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchNotes = async () => {
      try {
        const res= await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching data");
        console.log("error");
        if(error.response?.status === 429){
          setIsRateLimited(true);
        }
        else{
          toast.failure("Failed to load notes")
        }
      }finally{
        setLoading(false);
      }
    }
    fetchNotes();
  },[]);
  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimitUi/>}
      <div className='max-w-7xl mx-auto p-4 mt-6 bg-black'> 
        {loading && <div className='text-center text-green-600 py-10 flex items-center justify-center'><LoaderIcon className="animate-spin size-10"/></div>}
        {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound/>}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
             {notes.map((note) => (
                <NoteCard note={note} setNotes={setNotes}/>
             ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage