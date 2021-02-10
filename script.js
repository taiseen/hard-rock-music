// 08 - Feb - 2021 
// Milestone - 5 || Module 25

const userClick = document.getElementById('userClick');
const songContainerDiv = document.getElementById('song-container');

// user occur an event 
userClick.addEventListener('click', () => {
    // Read DOM element
    const userInputArea = document.getElementById('userInputArea').value;

    // request come from UI  / HTML / User
    loadDataFromServer(userInputArea);
})


const loadDataFromServer = async (input) => {

    // api ===>          static 80% + dynamic 20% 
    const url = `https://api.lyrics.ovh/suggest/:${input}`;

    const res = await fetch(url);
    const jsonData = await res.json();

    displayJsonDataToHTML(jsonData.data);

    // jsonData ===> return an Object (Full Data Ready Here)
    // & now its your responsibility What & How you show it....
    // jsonData.data ===> return an Array
}


const displayJsonDataToHTML = songs => {
    // 1. Loop into JSON Data
    // 2. DOM Create
    // 3. JSON to HTML Conversion
    // 4. DOM Update

    songContainerDiv.innerHTML = null;

    //1. Loop into JSON Data ####################################################
    songs.forEach(song => {

        //2. DOM Create #########################################################
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';

        //3. JSON to HTML Conversion || create every single element (dynamically)
        //#######################################################################
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by :- <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" 
            class="btn btn-success">Get Lyrics</button>
        </div> `;

        //4. DOM Update #########################################################
        songContainerDiv.appendChild(songDiv);
    });
}

const getLyric = async (artist, title) => {
    
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    } catch (error) {
        //displayError(error);
        const sms = "Please try again later..."
        displayError(sms);
    }
}

// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayLyrics(data.lyrics))
//         .catch(error => displayError("Something going wrong... Please try again later..."))
// }

const displayLyrics = lyrics => {
    
    // DOM Read 
    const lyricsDiv = document.getElementById('displayLyrics');
    
    // DOM Update
    lyricsDiv.innerText = lyrics;
}
//#############################################################
const displayError = error => {

    // DOM Read 
    const errorTag = document.getElementById('errorInfo');
    
    // DOM Update
    errorTag.innerText = error;
}

