window.onload = () => {
    newMeme();
}

function newMeme() {
    fetch('https://meme-api.herokuapp.com/gimme')
        .then(api => api.json())
        .then(response => {
            let img = document.getElementById("meme");
            let title = document.getElementById("title");
            img.src = response.url;
            title.innerText = response.title;
        });
}