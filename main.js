const urlParams = new URLSearchParams(window.location.search)
console.log(urlParams.get("data"))
const dataParams = {
    movies :{
        fetch_url: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json',
        title: "top 100 movies",
        description: "good movies"
    },
    kickstart : {
        fetch_url : 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json',
        title: "top 100 kickstars",
        description: "good kickstarts"
    },
    videogames : {
        fetch_url : 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json',
        title: "top 100 videogames",
        description: "good videogames"
    }
}

const defaultData = "videogames";
const dataToLoad = dataParams[urlParams.get("data")||defaultData]


const getData = async (dataUrl) => {
    const dataPromise = await fetch(dataUrl)
    const dataObject = await dataPromise.json();
    return dataObject;
}   


const fillContent = async () => {
    console.log(dataToLoad['fetch_url'])
    const data = await getData(dataToLoad.fetch_url);
    document.getElementById("title").innerText = dataToLoad.title;
    document.getElementById("description").innerText = dataToLoad.description;
    
    let width = 0.9 * window.innerWidth;
    let height = 0.8 * window.innerHeight;
    let padding = 40;
    console.log({data})
    

    const graph = d3.select("h2")
    .append('svg')
    .attr('height',height)
    .attr('width',width)
    .attr('fill','green')


}
    window.addEventListener('DOMContentLoaded', fillContent)