console.log("hello")
const url = window.location.href


fetch(`${url}data`, {
    method: 'GET'
})
.then(response => response.json())
.then(data => {
    const quizBox = document.getElementById('quiz-box');

    if (Array.isArray(data.data)) {
        console.log("first")

        data.data.forEach(el => {
            console.log("second")

            for (const [question, answers] of Object.entries(el)) {
                console.log(question)
                console.log(answers)
                
                quizBox.innerHTML += `
                    <hr>
                    <div class="mb-2">
                        <b class="question">${question}</b>
                    </div>
                `;

                answers.forEach(answer => {
                    console.log("first")
                    quizBox.innerHTML += `
                        <div class="mb-2 answer">
                            <input type="radio" class="ans" id="${question}-${answer}" name="${question}" value="${answer}">
                            <label for="${question}-${answer}">${answer}</label>
                        </div>
                    `;
                });
            }
        });
    } else {
        quizBox.innerHTML = '<p>No quiz data available.</p>';
    }
})
.catch(error => {
    console.error('Error fetching quiz data:', error);
    document.getElementById('quizBox').innerHTML = '<p>Error loading quiz. Please try again later.</p>';
});


const quizForm = document.getElementById('quiz-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

const sendData = () => {
    const elements = [...document.getElementsByClassName('ans')]
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value,
    elements.forEach(el => {
        if(el.checked) {
           data[elements.name] = el.value
        }else{
            if(!data[el.name]) {
                data[el.name] = null
            }
        }
    });

    fetch(`${url}save/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf[0].value,
        },
        body: JSON.stringify(data) 
    })
    .then(response => response.json()) 
    .then(responseData => {
        console.log(responseData); 
    })
    .catch(error => {
        console.error('Error:', error); 
    });
    

}

quizForm.addEventListener('submit', e => {
    e.preventDefault()

    sendData()
})




























// const quizBox = document.getElementById('quiz-box')

// fetch(`${url}data`, {
//     method: 'GET'
// })
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// })
// .then(response => {
//     console.log(response)
//     const data = response.data; 
//     console.log(data)  
    
//     data.data.forEach(el => {
//         console.log(typeof el)
//         for (const [question, answers] of Object.entries(el)) {
//             console.log('Question:', question);  
//             console.log('Answers:', answers); 
//             console.log("first")

//             quizBox.innerHTML += `
//                 <hr> 
//                 <div class="mb-2">
//                     <b>${question}</b>
//                 </div>
//             `;

//             answers.forEach(answer => {
//                 quizBox.innerHTML += `
//                     <div class="mb-2">
//                         <input type="radio" class="ans" id="${question}-${answer}" name="${question}" value="${answer}">
//                         <label for="${question}-${answer}">${answer}</label> 
//                     </div>
//                 `;
//             });
//         }
//     });
// })
// .catch(error => {
//     console.error('Error:', error);
// });






