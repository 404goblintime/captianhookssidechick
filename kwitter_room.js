var firebaseConfig = {
      apiKey: "AIzaSyBRA4vjMfVKCGtEEjl9DkZkTxqOdIqw4Mk",
      authDomain: "kwitter-1-3.firebaseapp.com",
      databaseURL: "https://kwitter-1-3-default-rtdb.firebaseio.com",
      projectId: "kwitter-1-3",
      storageBucket: "kwitter-1-3.appspot.com",
      messagingSenderId: "1078203578170",
      appId: "1:1078203578170:web:418af05a2dfec74aac4203"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
    user_name=localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML="Join us "+user_name+"!!";

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name-"+ Room_names); 
row = "<div class='room_name' id="+Room_names + "onclick='redirectToRoomName(this.id)'>#"+Room_names + "</div>";
document.getElementById("output").innerHTML+=row;
});});}

getData();

function logout(){
      localStorage.removeItem("user_name");
      localStorageremoveItem("room_name")
      window.location = "index.html";
}function addRoom() {
      room_name = document.getElementById("room_name").value ;
      firebase.database().ref("/").child(room_name).update({
            purpose:"adding room name"
      })
      localStorage.setItem("room_name", room_name);
      window.location = "chat.html";
  }
  function redirectToRoomName(name){
        console.log(name);
        localStorage.setItem("room_name", name);
        window.location="chat.html";y
  }
