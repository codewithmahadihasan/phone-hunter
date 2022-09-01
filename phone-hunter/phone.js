

// Get Data in A API 


const getData = async (search, datalimite) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
    const data = await res.json()
    display(data.data, datalimite)
}
// Data MOdify And Show The Display 

const display = (datas, datalimite) => {
    const displayId = document.getElementById('display-result')
    displayId.innerHTML = ''
    const showMore = document.getElementById('show-more')
    if (datalimite && datas.length >= 9) {
        datas = datas.slice(0, 9)
        showMore.classList.remove('hidden')

    }
    else {

        showMore.classList.add('hidden')
    }

    // display None 
    const displayNone = document.getElementById('warning')
    if (datas.length === 0) {

        displayNone.classList.remove('hidden')
        loading(false)
    }
    else {
        displayNone.classList.add('hidden')
    }

    datas.forEach(data => {
        const aSingleDiv = document.createElement('div')
        aSingleDiv.innerHTML = `  
        <div class="card w-96 bg-base-100 glass shadow-xl">
            <figure class="px-10 pt-10">
            <img
                src="${data.image}"
                alt="Shoes"
                class="rounded-xl"
            />
            </figure>
             <div class="card-body items-center text-center">
                 <h2 class="card-title">${data.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                     <div class="card-actions">
                       <label onclick="getButtonDitails('${data.slug}')"  for="my-modal-4"  class="bg-gray-900 btn btn-sm px-6 py-1 rounded hover:bg-success-content text-white">Show Ditails</label>

                    </div>
             </div>
        </div>`

        displayId.appendChild(aSingleDiv)

        loading(false)
    });
}

// Common Case 
const common = (datalimite) => {
    loading(true)
    const inputFild = document.getElementById('input-field')
    const data = inputFild.value
    getData(`${data}`, datalimite)

}

// When I Click In A button 
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        common(20)
    }
});


document.getElementById('button').addEventListener('click', function () {
    common(20)
})

document.getElementById('btn-show-all').addEventListener('click', function () {
    common()
})



// Its Work when It Loading 

const loading = (isLoading) => {
    const loading = document.getElementById('processing')
    const showMore = document.getElementById('show-more')
    const displayId = document.getElementById('display-result')
    const noResult = document.getElementById('warning')
    if (isLoading) {
        loading.classList.remove('hidden')
        displayId.classList.add('hidden')
        showMore.classList.add('hidden')
        noResult.classList.add('hidden')
    }
    else {
        loading.classList.add('hidden')
        displayId.classList.remove('hidden')
    }
}



// Get Data Of A Button 


const getButtonDitails = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    modal(data.data)

}

const modal = (phone) => {
    console.log(phone)
    const display = document.getElementById('div-element')
    display.innerHTML = ''
    const aSingleDiv = document.createElement('div')

    aSingleDiv.innerHTML = `
    <h3 class="text-lg font-bold">${phone.name}</h3>
    <p class="py-4"> First Release : ${phone.releaseDate}</p>
    
    <p class="py-4"> Specification : ${phone?.mainFeatures.memory}</p>

   
   `

    display.appendChild(aSingleDiv)





}

getData('a')
