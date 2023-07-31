import Peer from 'peerjs';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

const [peerID, setPeerID]= useState('')
const [remotePeerIdValue,setRemotePeerIdValue] = useState('')
const peer = new Peer()
const remoteVideoRef = useRef(null)
const currentVideoRef = useRef(null)


useEffect(() =>{

  peer.on('open' , id =>{
    console.log('peer id ' ,id);
    setPeerID(id)
  })


  peer.on('call' , (call)=>{
    let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  getUserMedia({video: true, audio: false}, (stream) => {
    currentVideoRef.current.srcObject = stream

    call.on('stream', function(remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
      // remoteVideoRef.current.play()
    });

    call.answer(stream)
    })
    
  })
},[])


const call = (remotePeerID) =>{
  let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  getUserMedia({video: true, audio: false}, function(stream) {

    currentVideoRef.current.srcObject = stream
    
    let call = peer.call(remotePeerID, stream);

    call.on('stream', function(remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    });
    }
    
  );
}



  return (
    <div className="App">
      <input style={{width : '400px'}} type="text" /*value={peerID}*/ onChange={e => setRemotePeerIdValue(e.target.value)} />
      <button type="button" onClick={() => call(remotePeerIdValue)}>call</button>
      <div><video ref={remoteVideoRef} autoPlay></video></div>
      <div><video ref={currentVideoRef} autoPlay></video></div>
    </div>
  );
}

export default App;
