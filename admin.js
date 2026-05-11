const SITE='https://tsc1907.sharepoint.com/sites/Bosseln';
let teams=[];

async function initAdmin(){
  load();
  setInterval(load,5000);
}

async function load(){
  const r=await fetch(SITE+"/_api/web/lists/getbytitle('Teams')/items");
  teams=(await r.json()).d.results;

  render();
}

function render(){
  let sorted=[...teams].sort((a,b)=>a.Gesamtwürfe-b.Gesamtwürfe);
  ranking.innerHTML=sorted.map((x,i)=>i+1+'. '+x.Title+' ('+x.Gesamtwürfe+')').join('<br>');
}

async function create(){
  await fetch(SITE+"/_api/web/lists/getbytitle('Teams')/items",{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({Title:n.value,Passwort:p.value,Gesamtwürfe:0})
  });
  load();
}
