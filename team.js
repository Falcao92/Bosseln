const SITE='https://tsc1907.sharepoint.com/sites/Bosseln';
let team;
let map;
let markers=[];

function init(){
  team=JSON.parse(localStorage.getItem('team'));
  document.getElementById('t').innerText=team.Title;

  map=L.map('map').setView([52.4,9.74],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  loadTeams();
  setInterval(loadTeams,5000);
}

async function addThrow(){
  const v=team.Gesamtwürfe+1;

  await fetch(SITE+"/_api/web/lists/getbytitle('Teams')/items("+team.Id+")",{
    method:'POST',
    headers:{
      'X-HTTP-Method':'MERGE',
      'If-Match':'*',
      'Content-Type':'application/json'
    },
    body:JSON.stringify({Gesamtwürfe:v})
  });

  team.Gesamtwürfe=v;
}

function track(){
  navigator.geolocation.watchPosition(async p=>{
    await fetch(SITE+"/_api/web/lists/getbytitle('Teams')/items("+team.Id+")",{
      method:'POST',
      headers:{
        'X-HTTP-Method':'MERGE',
        'If-Match':'*',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        LetztePositionLat:p.coords.latitude,
        LetztePositionLng:p.coords.longitude
      })
    });
  });
}

async function loadTeams(){
  markers.forEach(m=>map.removeLayer(m));
  markers=[];

  const r=await fetch(SITE+"/_api/web/lists/getbytitle('Teams')/items");
  const d=await r.json();

  d.d.results.forEach(x=>{
    if(x.LetztePositionLat){
      const m=L.circleMarker([x.LetztePositionLat,x.LetztePositionLng]).addTo(map).bindPopup(x.Title);
      markers.push(m);
    }
  });
}
