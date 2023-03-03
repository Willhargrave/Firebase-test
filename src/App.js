import React, {useRef, useState} from 'react'
import './App\.css';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/analytics'
import {initializeApp} from 'firebase/compat/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyAuTDAWfci0-ZXRdjaMBcnFOccy7IG_l9c",
  authDomain: "chat-app-ed82f.firebaseapp.com",
  projectId: "chat-app-ed82f",
  storageBucket: "chat-app-ed82f.appspot.com",
  messagingSenderId: "99289459921",
  appId: "1:99289459921:web:227f3a94217b62a748a9f0",
  measurementId: "G-WCKRCVNVKK"
})

const auth = firebase.auth()
const firestore = firebase.firestore();
// const analytics = firebase.analytics();
function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
      <section >
        {user ? <ChatRoom/> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return ( 
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}
  function SignOut() {
    return auth.currentUser && (
      <button onClick={() => auth.signOut()}>Sign Out</button>
    )
  }
 


function ChatRoom() {

  const dummy = useRef()
  const messagesRef = firestore.collection('mesages');
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})
  const [formValue, setFormValue] = useState('')
  const timestamp = serverTimestamp();
  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: timestamp,
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <>
    <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      <div ref={dummy}></div>
    </main>
    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) =>(e.target.value)}/>
      <button type="submit">Go</button>
    </form>
    </>
  )
} 
function ChatMessage(props) {
  const {text, uid, photoURL} = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'receieved';
  return  (
  <div className={`message ${messageClass}`}>
  <img src={photoURL}/>
  <p>{text}</p>
  </div>
  )
}
export default App;
