
document.getElementById('requestForm').addEventListener('click', function(event) {
   

    let name = document.getElementById('name2');
    let email = document.getElementById('email2');
    let phone = document.getElementById('phone2');
    let subject = document.getElementById('services');
    let message = document.getElementById('message2');
    let package = document.getElementById('selectedPckage');
    let timeCall = document.getElementById('timeCall');
    
    // You can add logic here to send this data to the server or process it further
    console.log(package.innerText.toString());
    recieveRequestToServer(name.value.trim(),email.value.trim(),subject.value.trim(), message.value.trim(), phone.value.trim(), timeCall.value.trim(), package.innerText.toString());
});

function recieveRequestToServer(name,email,subject, message, phone, timeToCall, packageText) {

    const data = {
        name: name,
        email:email,
        message: message,
        phone: phone,
        package: packageText,
        subject:subject,
        call: timeToCall
    }
    fetch('/recieveRequest', {
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
   
}

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
}