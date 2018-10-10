window.addEventListener("DOMContentLoaded" , initMainJs);

var database = firebase.database();


var messages = database.ref("chat");

messages.on("value",function(data){

        console.table(data.val());
        let myData = data.val();
        _cl("chatMessages")[0].innerHTML ="";
        for(let key in myData)
        {
            console.log(myData[key].message);

            let template = `<div>
            <h5>name: ${myData[key].name} </h5>
            <p>messages: ${myData[key].message}</p>
            </div>
            `;
         
            _cl("chatMessages")[0].innerHTML += template;
        }


       
        //chatMessages
});



function initMainJs(){

    _id("chatForm").addEventListener("submit", sendMessage );

}

function sendMessage(e){

    e.preventDefault();
    console.log("form submitted");
    let timestamp = Date.now();
    let name = _id("name").value;
    let message = _id("message").value;

    console.log(name,message,timestamp);

    database.ref("chat").push({
        timestamp: timestamp,
        name: name,
        message : message
      });
}



// helpers

function _cl(cName){
    return Array.from(document.getElementsByClassName(cName));
}

function _id(id)
{
    return document.getElementById(id);
}
