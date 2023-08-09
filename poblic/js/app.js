const wetherForm = document.querySelector('form')
const search = document.querySelector('input')
const weather = document.getElementById('weather')
const erorr = document.getElementById('erorr')

wetherForm.addEventListener('submit',(e) => {
   e.preventDefault()
   
   const location = search.value

   weather.innerHTML = ' <img  class="loading" src="/img/loading.gif" alt="">'

   fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if(data.location === undefined){
            weather.textContent = 'eroor'
        }
        else{
            weather.innerHTML = ''
             weather.innerHTML = `
             <h2>${data.country} country</h2>
             <h2>location  ${data.location} </h2>
             <h4>date&time ${data.localtime} </h4>
             <div style="display: flex; marging-">
                 <img src="${data.weather_icons}" alt="">
                 <h2 style="  margin-left:16px ;"> ${data.temperature}◦</h2>
             </div>
             <p>it is ${data.weather_descriptions}</p>
             <p>it's feels like ${data.feelslike}</p>
         </p>`
            
        }
    })
})
})
