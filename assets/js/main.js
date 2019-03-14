var root = document.querySelector(".root");
var input = document.querySelector(".main-input");
var info = document.querySelector(".followers-section");

var obj;
function view(data){
	console.log(data);
	info.innerHTML = "";
	obj = data;
	var dom = `
		<div class="img-container">
			<img class="user-image" src="${data.avatar_url}" alt="user image">
		</div>
		<div class="basic-info">
			<h2 class="userName">Username: ${data.login}</h2>
			<p class="bio">Bio: ${data.bio || "This user have no bio!"}</p>
		</div>
		<div class="view-followers">
			<button class="followers">Followers</button>
			<button class="following">Following</button>
			<button class="repo">Repos</button>
		</div>
	`;
	root.innerHTML = dom;
}

var userName;
function request(e){
	if(e.keyCode == 13){
		userName = e.target.value;
		var xhr = new XMLHttpRequest;
		xhr.addEventListener("load", () => view(JSON.parse(xhr.response)));
		xhr.open('GET', `https://api.github.com/users/${userName}`);
		xhr.send();
		e.target.value = "";
	}
}

function displayFollower(data){
	var html;
	data.forEach(v => {html =
		`<figure>
		  <img class="img" src="${v.avatar_url}" style="width:300px">
		  <figcaption class="followers-name">${v.login}</figcaption>
		</figure>`;
		info.innerHTML += html;
	})
}

function displayFollowerFollowig(data){
	info.innerHTML = "";
	var html;
	data.forEach(v => { html =
		`<figure>
		  <img class="img" src="${v.avatar_url}" style="width:200px">
		  <figcaption class="followers-name">${v.login}</figcaption>
		</figure>`;
		info.innerHTML += html;
	})
}

function followers(e){
	if(e.target.className == "followers"){
		var xhr2 = new XMLHttpRequest;
		xhr2.addEventListener("load", () => displayFollower(JSON.parse(xhr2.response)));
		xhr2.open('GET', obj.followers_url);
		xhr2.send();
	}
}

function following(e){
	if(e.target.className == "following"){
		var addr = obj.following_url.split("{")[0]
		var xhr3 = new XMLHttpRequest;
		xhr3.addEventListener("load", () => displayFollowerFollowig(JSON.parse(xhr3.response)));
		xhr3.open('GET', addr);
		xhr3.send();
	}
}

function showRepo(data){
	info.innerHTML = "";
	var html;
	data.forEach((v, i) => {
		html = `
			<p class="repo-name"><span class="repo-count">${i+1}.</span>${v.name}</p>
		`;
		info.innerHTML += html;
	})
}

function repos(e) {
	if(e.target.className == "repo"){
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", () => showRepo(JSON.parse(xhr.response)));
		xhr.open("GET", obj.repos_url);
		xhr.send();
	}
}

input.addEventListener("keyup", request);
window.addEventListener("click", followers);
window.addEventListener("click", following);
window.addEventListener("click", repos);
