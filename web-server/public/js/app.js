console.log('JS Loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const degree = document.querySelector('#degree')
const description = document.querySelector('#description')

console.log("/second app")
// message1.textContent= 'From JS'



weatherForm.addEventListener('submit',(event) =>{
    event.preventDefault()
    const location = search.value
    console.log("/second app")

    message1.textContent="Loading..."
    message2.textContent=""
    degree.textContent = ""
    icon.src = ""
    description.textContent = ""


    fetch('/weather?address='+ location).then((response) =>{
    response.json().then((data)=>{
        if (data.error){
            console.log(data.error)
            message1.textContent=data.error
        }else{


            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var months = ['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December']
            var d = new Date(data.date);
            var dayName = days[d.getDay()] + ", " + months[d.getMonth()]+ " "+ d.getDate();



            message1.textContent= data.location
            message2.textContent= dayName + " "
            degree.textContent = data.degree + "°C"
            description.textContent = " \"" + data.description + "\""

            

            icon.src=data.icon
            
        }
    })
})
})
