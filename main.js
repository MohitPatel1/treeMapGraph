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
    const data = await getData(dataToLoad.fetch_url);
    document.getElementById("title").innerText = dataToLoad.title;
    document.getElementById("description").innerText = dataToLoad.description;
    
    let width = 0.9 * window.innerWidth;
    let height = 0.8 * window.innerHeight;
    let padding = 40;
    // console.log({data})
    

    const graph = d3.select("h2")
    .append('svg')
    .attr('height',height)
    .attr('width',width)
    .attr('fill','serie')

    const tooltip = document.getElementById("tooltip")

    const treemap = d3.treemap().size([width,height]).padding(0.5)
    const root = d3.hierarchy(data).sum((d)=>d.value)
    console.log(d3.hierarchy(data))
    console.log(root)

    treemap(root);

    const color = d3.scaleOrdinal(
        [
          '#1f77b4',
          '#aec7e8',
          '#ff7f0e',
          '#ffbb78',
          '#2ca02c',
          '#98df8a',
          '#d62728',
          '#ff9896',
          '#9467bd',
          '#c5b0d5',
          '#8c564b',
          '#c49c94',
          '#e377c2',
          '#f7b6d2',
          '#7f7f7f',
          '#c7c7c7',
          '#bcbd22',
          '#dbdb8d',
          '#17becf',
          '#9edae5'
        ]);

    const cell = graph.selectAll('g')
    .data(root.leaves())
    .enter()
    .append('g')
    .attr('transform',(d)=>`translate(${d.x0},${d.y0})`)

    let tile = cell.append("rect")
    .attr('class','tile')
    // .attr('data-catagory',d=>console.log(d.data.name.split(/(?=[A-Z][^A-Z])/)))
    .attr('data-catagory',d=>d.data.category)
    .attr('data-name',d=>d.data.name)
    .attr('data-value',d=>d.data.value)
    .attr('id',d=>d.data.id)
    .attr('width',d=>(d.x1 - d.x0))
    .attr('height',d=>(d.y1 - d.y0))
    .attr('fill',d => `${color(d.data.category)}`)
    .on("mouseover",(i,d)=>{
        tooltip.classList.add("show")
        tooltip.style.left=(i.pageX+10)+"px";
        tooltip.style.top=(i.pageY+10)+"px";
        tooltip.setAttribute('data-date',d[0]);
        tooltip.innerHTML = (`Name${d.data.name}<br>Category:${d.data.category}<br>Value:${d.data.value}`)
    })

    .on("mouseout",()=>{
        tooltip.classList.remove("show")
    })


    cell.append("text")
    .selectAll("tspan")
    // .data(d=>d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .data(d=>d.data.name.split(/(?=[A-Z][^A-Z])/)) // split from capital letters in which next letter is not capital, World War II => II will not be devided
    .enter()
    .append("tspan")
    .style("font-size",12)
    .attr('x',5)
    .attr('y',(d,i)=>12+i*10)
    .text(d=>d)

    

}
    window.addEventListener('DOMContentLoaded', fillContent)