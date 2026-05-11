const SITE='https://tsc1907.sharepoint.com/sites/Bosseln';

async function login(){
  const n=document.getElementById('name').value;
  const p=document.getElementById('pass').value;

  const r=await fetch(SITE+"/_api/web/lists/getbytitle('Teams')/items");
  const d=await r.json();

  const team=d.d.results.find(x=>x.Title===n && x.Passwort===p);

  if(!team){alert('Login falsch');return;}

  localStorage.setItem('team',JSON.stringify(team));
  location='team.html';
}