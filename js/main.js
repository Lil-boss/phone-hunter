const getApi = async () => {
    
  
    const searchText = document.getElementById('search-text').value;
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(URL);
    const data = await res.json();
    const result = data.data
    getItem(result)
}

const getItem = (result) => {
    
    for (let data of result) {
        console.log(data);
        const cardContainer = document.getElementById('card-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex justify-center">
                        <div class="rounded-lg shadow-lg bg-white md:w-80">
                            <div class="mt-6  flex justify-center items-center">
                            <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                <img class="rounded-t-lg" src="${data.image}"
                                    alt="" />
                            </a>
                            </div>
                            <div class="p-6">
                                <h5 class="text-gray-900 text-xl font-medium mb-2">${data.phone_name}</h5>
                                <p class="text-gray-700 text-base mb-4">${data.brand}</p>
                                
                                <div class="flex justify-center items-center">
                                <button type="button"
                                    class=" inline-block px-6 py-2.5 bg-cyan-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-600 hover:shadow-lg focus:bg-cyan-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out">specification</button>
                                </div>
                            </div>
                        </div>
                    </div>
    `;

    cardContainer.appendChild(div);
   }

    
}



