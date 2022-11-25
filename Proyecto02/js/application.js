



var options;
var t=document.querySelector(".form-select");
var img=document.getElementById('div-img');
var i=1;

window.onload=function () {
  init();
}

async function init() {

  let apiURL = "https://api.jikan.moe/v4/anime";
  var labels=[];
var scores=[];
 t.innerHTML = "<option selected>Open this select menu</option>";
  animes  =  await get(apiURL);
    
    for(let anime of animes.data){
        labels.push(anime.title);
        scores.push(anime.score);
        // labels.forEach(l=>{
          options=options + 
          '<option value="'+anime.mal_id+'">'+anime.title+'</option>' ;
          i++;
      // })
         console.log(anime)
    }

 cargarGrafico(labels,scores);   
  t=t.innerHTML = options;

  if (img.style.display === "block") {
    img.style.display = "none";
}
}

  


function cargarGrafico(labels,scores) {
  const ctx = document.getElementById('myChart').getContext('2d');
 const  ctx1 = document.getElementById('myChart1').getContext('2d');
  let chartStatus = Chart.getChart("myChart");
  let chartStatus1 = Chart.getChart("myChart1");

 let colores=generarNuevoColor(labels.length);

  console.log(colores);
if (chartStatus != undefined) {
    chartStatus.destroy();
}
  const dataG = {
    labels: labels,
    datasets: [{
      label: 'Data',
      data: scores,
      backgroundColor: colores,
      borderColor: colores,
      borderWidth: 1
    }]
  };


  new Chart(ctx, {
    type: 'bar',
    data:dataG,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  if (chartStatus1 != undefined) {
    chartStatus1.destroy();
}

    new Chart(ctx1, {
type: 'doughnut',
data:dataG,
options: {
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
});   
}

async function cargar() {
  var cod = document.getElementById("anime").value;
  apiURL="https://api.jikan.moe/v4/anime/"+cod+"/full";
  anime=await get(apiURL);
  console.log(anime.data);
  labels=["episodes","popularity","rank","score"];
  data=[anime.data.episodes,anime.data.popularity,anime.data.rank,anime.data.score];
  cargarGrafico(labels,data);
  document.getElementById("img-anime").src=anime.data.images.jpg.image_url;
  img.style.display = "block";
}


async function get( apiURL) {
  return new Promise((resolve, reject) => {
    fetch(apiURL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        reject(
          "No hemos podido recuperar ese json. El código de respuesta del servidor es: " +
            response.status
        );
      })
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}


function generarNuevoColor(cantidad){
	var simbolos, color;
	simbolos = "0123456789ABCDEF";
  colores=[];

  for (let index = 0; index < cantidad; index++) { 
    color = "#";
   for(var i = 0; i < 6; i++){
      color = color + simbolos[Math.floor(Math.random() * 16)];
    }
    colores.push(color);
  }

return colores;
	
}








  