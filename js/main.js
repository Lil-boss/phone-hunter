const getApi = async () => {
    document.getElementById('card-container').innerHTML = "";
    const searchText = document.getElementById('search-text');
    const search = searchText.value;

    const URL = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    searchText.value = ""
    const res = await fetch(URL);
    const data = await res.json();

    console.log(data);
    const result = data.data;
    console.log(result.slice(0, 20));
    if (result) {
        const value = result.slice(0, 20);
        getItem(value);
    }

}

const getItem = (result) => {

    for (let data of result) {

        // console.log(data);
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
                                    <button onclick="details('${data.slug}')" type="button"
                                        class="inline-block px-6 py-2.5 bg-cyan-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-600 hover:shadow-lg focus:bg-cyan-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out" data-toggle="modal"
                                        data-target="#exampleModal">
                                        specification
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
    `;
        cardContainer.appendChild(div);

    }


}

const details = async (info) => {
    console.log(info)
    const URL = `https://openapi.programming-hero.com/api/phone/${info}`
    const res = await fetch(URL);
    const data = await res.json();
    const result = data.data
    console.log(result)

    const cardContainer = document.getElementById('card-container');
    const div = document.createElement('div');
    div.innerHTML = `
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                             aria-labelledby="exampleModalLabel" aria-hidden="false">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                
                 <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${result.name}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Brand:${result.brand}</p>
                                <p>Display:${result.mainFeatures.displaySize}</p>
                                <p>Memory:${result.mainFeatures.memory}</p>
                                <p>Storage:${result.mainFeatures.storage}</p>
                                <p>chip-Set:${result.mainFeatures.chipSet}</p>
                                <p>sensors:${result.mainFeatures.sensors.map(d => d)}</p>
                                <p>others:</p>
                                <p>Release-Date:</p>
                            </div>
                
                 <div class="modal-footer">
                                <button type="button" class="btn bg-cyan-800 text-white hover:bg-cyan-600"
                                    data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div> 
    `;

    cardContainer.appendChild(div)
}
