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
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      chat = document.getElementById("chat").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: chat,
            like: 0
      });
      document.getElementById("chat").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log("firebase_message_id");
                        console.log("message_data");
                        name = message_data['name'];
                        message = message_data['message'];
                        likes = message_data['likes'];
                        name_width_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'> </h4> ";
                        message_width_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value" + like + "onclick='updateLike(this.id)'>";
                        span_width_tag = "<span class='glyphicon glyphicon-thumbs-up'> like:" + like + "</span> </button> <hr>";
                        row = name_width_tag + message_width_tag + like_button + span_width_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}