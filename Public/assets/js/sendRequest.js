document.getElementById('requestForm').addEventListener('click', function(event) {

    const name = document.getElementById('name2').value.trim();
    const email = document.getElementById('email2').value.trim();
    const phone = document.getElementById('phone2').value.trim();
    const subject = document.getElementById('services').value.trim();
    const message = document.getElementById('message2').value.trim();
    const packageText = document.getElementById('selectedPackage').value;
    const timeToCall = document.getElementById('timeCall').value;

    // Basic validation check
    if (!name || !email || !phone || !subject || !message) {
        console.error("All fields are required.");
        return;
    }

    // Sending the form data
    sendRequestToServer({
        name,
        email,
        phone,
        subject,
        message,
        package: packageText,
        callTime: timeToCall
    });
});

function sendRequestToServer(data) {
    const urls = ['/receiveRequest', '/send'];

    urls.forEach(url => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            // Check if the response is JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error('Expected JSON response');
            }
        })
        .then(data => {
            console.log(`Success on ${url}:`, data);
        })
        .catch(error => {
            console.error(`Error on ${url}:`, error);
        });
    });
}
