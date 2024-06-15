// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { get } from "firebase/database"
import { Auth } from "./components/auth"
import { db, auth, storage } from './config/firebase'
import { getDocs, 
  collection,
   addDoc, 
   deleteDoc, 
   doc, 
   updateDoc
  } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { ref, uploadBytes } from 'firebase/storage'

function App() {
  // const [count, setCount] = useState(0)
  const [movieList, setMovieList] = useState([])

  // new movie states
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newMovieYear, setNewMovieYear] = useState(0)
  //UPDATE TITLE STATE
  const [updatedTitle, setUpdatedTitle] = useState('') 
  
  //FILE UPLOAD STATE
  const [fileUpload, setFileUpload] = useState(null)
  const moviesCollectionRef = collection(db, 'movies') 
  const getMovieList = async () => {
    //READ THE DATA
    //SET THE MOVIE LIST
    try{
    const data = await getDocs(moviesCollectionRef)
    //create list of objects with id
    const filteredData = data.docs.map(doc =>
       ({...doc.data(), id: doc.id}))
    console.log(filteredData);
    setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try{
    await addDoc(moviesCollectionRef, {
      title: newMovieTitle,
      year: newMovieYear,
      userId: auth?.currentUser?.uid
    })
    getMovieList();
  } catch (err) {
    console.error(err);
  }
  }

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc)
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await updateDoc(movieDoc, {title: updatedTitle})
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  const uploadFile = async () => {
      if (!fileUpload) return;
      const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
      try {
        await uploadBytes(filesFolderRef, fileUpload);
      } catch(err) {
        console.error(err);
      }
    }
  return (
    <div>
      <Auth />
      <div>
        <input placeholder="Movie title..." onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input placeholder="Movie year..." type="number" onChange={(e) => setNewMovieYear(Number(e.target.value))}/>
        <button onClick={onSubmitMovie}>Submit</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder="new title..." onChange={(e) => setUpdatedTitle(e.target.value)}/>
            <button onClick={() => {updateMovieTitle(movie.id)}}>Update Title</button>
          </div>
        ))
      }
      </div>
      <div>
        <input 
          type="file" 
          onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  )
}

export default App

    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>



    // RULES
    //is user signed in?
    // if request.auth != null
    
    //FULLY AUTH, ONLY CREATE IF WE CREATED THE DOCUMENT
    // if request.auth != null && request.auth.uid == request.resource.data.uid
    // create = write, update, delete
    //
