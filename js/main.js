const getApi = async () => {

    document.getElementById('card-container').innerHTML = "";

    const searchText = document.getElementById('search-text');
    const search = searchText.value;

    if (search === "") {
        alert("Null value is not Allowed");

    } else {
        document.getElementById('alert-box').style.display = "none";
        const URL = `https://openapi.programming-hero.com/api/phones?search=${search}`;
        searchText.value = ""
        const res = await fetch(URL);
        if (!res) {
            document.getElementById('spinner').style.display = "block"
        } else {
            const data = await res.json();
            const result = data.data;

            if (result.length === 0) {
                alert("No Data Found")
            } else {
                if (result) {
                    const value = result.slice(0, 20);
                    getItem(value);
                }
            }

        }

    }

}

const getItem = (result) => {
    for (let data of result) {

        const cardContainer = document.getElementById('card-container');
        const div = document.createElement('div');

        div.innerHTML = `

                        <div
                            class="mt-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div class="mt-4 flex justify-center items-center">
                                <a href="#">
                                <img class="rounded-t-lg" src="${data.image}" alt="" />
                                </a>
                            </div>
                            <div class="p-5">
                                <a href="#">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-cyan-800 dark:text-white">${data.phone_name}</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-2xl">${data.brand}</p>
                                <div class="flex justify-center items-center">
                                    <button onclick="details('${data.slug}')" type="button"
                                        class="inline-block px-6 py-2.5 bg-cyan-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-cyan-600 hover:shadow-lg focus:bg-cyan-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out" data-toggle="modal"
                                        data-target="#exampleModal">specification
                                    </button>
                                </div>
                            </div>
                        </div>
                    
    `;
        cardContainer.appendChild(div);
    }

}

const details = async (info) => {
    const URL = `https://openapi.programming-hero.com/api/phone/${info}`
    const res = await fetch(URL)
    const data = await res.json()
    getDetails(data.data)
}


const getDetails = (id) => {

    const otherObj = id.others;

    document.getElementById('name').innerText = id.name;
    document.getElementById('releaseDate').innerText = id.releaseDate ? id.releaseDate : "comming soon...";
    document.getElementById('img').src = id.image;
    document.getElementById('brand').innerText = id.brand;
    document.getElementById('displaySize').innerText = id.mainFeatures.displaySize;
    document.getElementById('chipSet').innerText = id.mainFeatures.chipSet;
    document.getElementById('memory').innerText = id.mainFeatures.memory;
    document.getElementById('storage').innerText = id.mainFeatures.storage;
    document.getElementById('sensors').innerText = id.mainFeatures.sensors.map(e => e);
    document.getElementById('others').innerText = Object.entries(otherObj).map(([key, value]) => (key, value));

}


//error alert
const alert = (message) => {
    document.getElementById('alert-box').style.display = "block";
    document.getElementById('alert-msg').innerText = message;
}