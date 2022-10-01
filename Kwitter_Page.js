const firebaseConfig = {
    apiKey: "AIzaSyB7Q8TNRL8jcGzap3yH1nd_cuIVfK2Y07w",
    authDomain: "redes-86329.firebaseapp.com",
    projectId: "redes-86329",
    storageBucket: "redes-86329.appspot.com",
    messagingSenderId: "805988102275",
    appId: "1:805988102275:web:0944f476d069b220beabb6"
  };
  
  
  const app = initializeApp(firebaseConfig);

  var user = localStorage.getItem("user")
var roomName = localStorage.getItem("chave")


function msg(){
envio1=document.getElementById("envio").value;
firebase.database().ref(roomName).push({
 name:user,
 mensage:envio1,
 like:0
})
envio1=document.getElementById("envio").value="";

}





function getData() { 
     firebase.database().ref("/"+roomName).on('value', function(snapshot) { 
        document.getElementById("saida").innerHTML = ""; 
            snapshot.forEach(function(childSnapshot) { 
            childKey  = childSnapshot.key; 
            childData = childSnapshot.val(); 
            if(childKey != "purpose") {
            firebaseMessageId = childKey;
            messageData = childData;
            //Início do código
              name=messageData['name'];
              mensage=messageData['mensage'];
              like=messageData['like'];
              nameWithTag="<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
              mensageWithTag="<h4 class='message_h4'> "+ mensage +"</h4>";
              likebutton="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";

              spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
              row=nameWithTag+mensageWithTag+likebutton+spanWithTag;
              document.getElementById("saida").innerHTML+=row; 
              


            //Fim do código
 } });  }); }
getData();
function updateLike(messageId){
  button_id=messageId;
  likes=document.getElementById(button_id).value;
  updateLikes=Number(likes)+1;
  firebase.database().ref(roomName).child(messageId).update({
    like:updateLikes
  })
}
function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
      window.location = "index.html";
  }