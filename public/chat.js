const socket = io.connect("http://localhost:3000");

const sender = document.getElementById("sender");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

socket.emit("user", 17);

submitBtn.addEventListener("click", () => {

    socket.emit("chat", {
        id: 16,
        message: message.value,
        sender: sender.value
    })
    message.value = "";

});

socket.on("chat", data=> {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>'+ data.sender+": </strong>"+data.message+"</p>";
    message.value = "";

});

message.addEventListener("keypress", ()=>{
    console.log(sender.value);
    socket.emit("typing",  sender.value)
})

document.getElementById("new-message").addEventListener("click", function() {
    socket.emit("send_message", {
        message: "",
        sender: ""
    });
});

socket.on("typing", data=> {
    console.log("reply: "+data)
    feedback.innerHTML = "<p>"+data+" Yazir... </p>"; 
})