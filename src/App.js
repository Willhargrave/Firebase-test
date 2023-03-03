import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'

import {useAuthState} from 'react-firebase-hooks'
import {useCollectionData} from 'react-firebase-hooks'

firebase.initializeApp({
  apiKey: "AIzaSyAuTDAWfci0-ZXRdjaMBcnFOccy7IG_l9c",
  authDomain: "chat-app-ed82f.firebaseapp.com",
  projectId: "chat-app-ed82f",
  storageBucket: "chat-app-ed82f.appspot.com",
  messagingSenderId: "99289459921",
  appId: "1:99289459921:web:227f3a94217b62a748a9f0",
  measurementId: "G-WCKRCVNVKK"
})

const [user] = useAuthState(auth);
function App() {
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
      <section >

      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  function SignOut() {
    return auth.currentUser && (
      <button onClick={() => auth.signOut()}>Sign Out</button>
    )
  }
  return ( 
    <button onclick={signInWithGoogle}>Sign in with Google</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('mesages');
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})
  const [form]
  return (
    <>
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

    </div>
    <form>
      <input />
      <button type="submit">Go</button>
    </form>
    </>
  )
} 
function ChatMessage(props) {
  const {text, uid} = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'receieved';
  return  (
  <div className={`message ${messageClass}`}>
  <img src={photoURL}/>
  <p>{text}</p>
  </div>
  )
}
export default App;
