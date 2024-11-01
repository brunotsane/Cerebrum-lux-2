
document.getElementById('submit').addEventListener('click', function(event) {
   
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let subject = document.getElementById('subject');
    let message = document.getElementById('message');
    
    // You can add logic here to send this data to the server or process it further
    sendEmailToServer(name.value.trim(),email.value.trim(),subject.value.trim(), message.value.trim(), phone.value.trim());
});


function sendEmailToServer(name,email,subject, message, phone) {

    const data = {
        name: name,
        email:email,
        message: message,
        phone: phone,
        subject:subject,
    }
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
    });
    recieveEmail(data);
   
function recieveEmail(data){
    fetch('/recieve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
    });
}}
