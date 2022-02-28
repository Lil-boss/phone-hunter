const getApi = async () => {
    debugger
  
    const searchText = document.getElementById('search-text').value;
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(URL);
    const data = await res.json();
    const result = data.data
    getItem(result)
}

const getItem = (data) => {
    
}
getItem()
