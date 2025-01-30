console.log("this is a spotify clone");
let currentsong = new Audio()
let currfolder = "another";
let songnames;
// let songs;
////////////Seconds converter//////////////
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}
/////////get songs function //////////////

async function getsongs(folder) {
    currfolder = folder;
    let songs = [
        `https://k-mahesh-babu.github.io/Spotify-Clone/songs/${currfolder}/song1.mp3`,
        `https://k-mahesh-babu.github.io/Spotify-Clone/songs/${currfolder}/song2.mp3`,
        `https://k-mahesh-babu.github.io/Spotify-Clone/songs/${currfolder}/song3.mp3`,
        `https://k-mahesh-babu.github.io/Spotify-Clone/songs/${currfolder}/song4.mp3`
    ]; // Manually list songs here

    console.log("Songs found:", songs);
    currentsong.src = songs[0];

    // Populate the list
    let ul = document.querySelector(".list");
    ul.innerHTML = "";
    for (let i = 0; i < songs.length; i++) {
        let songname = songs[i].split(`${currfolder}/`)[1]
            .replaceAll("%20", " ")
            .replaceAll(".mp3", "");
        
        let li = document.createElement("li");
        li.className = "curser";
        li.innerText = songname;
        ul.append(li);
    }
    return songs;
}

/////////SETTING SONG NAMES//////////
function settingsongnames() {
    let song = currentsong.src
    let songname = song.split(`${currfolder}/`)[1].replaceAll("%20", " ").replaceAll(".mp3", "").split(" - ")[0]
    let rfsn = document.querySelector(".rfsn")
    let songdetails = document.querySelector(".details")
    rfsn.innerText = songname
    songdetails.innerHTML = `<div>${songname}</div>`
}
/////////setting play or pause icons//////////
async function playorpause(command) {
    let playbtn = document.querySelectorAll(".play")
    playbtn[0].innerHTML = `<img class="imgres curser " style="height: 40px; width: 30px;" src="images/${command}.svg"alt="">`
    playbtn[1].innerHTML = `<img class="imgres curser " style="height: 40px; width: 30px;" src="images/${command}.svg"alt="">`
}
async function displayAlbums() {
    let albumData = [
        { folder: "another", title: "Best Songs", description: "Popular hits", cover: "songs/another/cover.png" },
        { folder: "ncs", title: "Non copy right", description: "NoCopyrightSounds", cover: "songs/ncs/cover.png" },
        { folder: "cs", title: "Copy right", description: "Fresh releases", cover: "songs/cs/cover.png" },
        { folder: "new", title: "Best Ones", description: "Fresh releases", cover: "songs/new/cover.png" }
    ]; // Define albums manually

    let albumimg = document.querySelector(".albumsimg");
    albumimg.innerHTML = "";
    
    albumData.forEach(album => {
        albumimg.innerHTML += `
            <div data-folder="${album.folder}" class="card">
                <img src="${album.cover}" alt="">
                <div class="songname">${album.title}</div>
                <div class="description">${album.description}</div>
                <div class="circle"><div class="play-icon"></div></div>
            </div>
        `;
    });

    document.querySelectorAll(".card").forEach(e => {
        e.addEventListener("click", async item => {
            currfolder = item.currentTarget.dataset.folder;
            songs = await getsongs(currfolder);
            currentsong.play();
            playorpause("play");
            settingsongnames();
        });
    });
}

async function main() {
    
    songs = await getsongs(currfolder)
    currentsong.src = songs[0]
    settingsongnames()
    // await songsnames()
    
    displayAlbums()
    currentsong.addEventListener("timeupdate",()=>{
        songnames = document.querySelector('.list').getElementsByTagName("li")
        for (let i = 0; i < songnames.length; i++) {
            const element = songnames[i];
            element.addEventListener("click",() => {
                currentsong.src = songs[i]
                currentsong.play()
                playorpause("play")
                settingsongnames()
    
            })
    
        }
    })

    let playbtn = document.querySelectorAll(".play")
    for (let i = 0; i < playbtn.length; i++) {
        const element = playbtn[i];
        element.addEventListener("click", () => {
            if (currentsong.paused) {
                playorpause("play")
                currentsong.play()
            }
            else {
                playorpause("pause")
                currentsong.pause()
            }
        })
    }
    // let song = await getsongs("songs/cs")
    let sideicons = document.querySelectorAll(".sideicon")
    sideicons[0].addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src)
        if (index == 0) {
            currentsong.src = songs[songs.length - 1]
        } else {
            currentsong.src = songs[index - 1]

        }
        settingsongnames()
        playorpause("play")
        currentsong.play()

    })
    sideicons[1].addEventListener("click", () => {

        let index = songs.indexOf(currentsong.src)
        if (index == songs.length - 1) {
            currentsong.src = songs[0]
        } else {
            currentsong.src = songs[index + 1]

        }
        settingsongnames()
        playorpause("play")
        currentsong.play()
    })
    let rfd = document.querySelector(".rfd")
    let dot = document.querySelector(".dot")
    let line = document.querySelector(".line")
    currentsong.addEventListener("timeupdate",async () => {
        let cards = document.getElementsByClassName("card")
        for (let i = 0; i < cards.length; i++) {
            const e = cards[i];
            if (e.dataset.folder == currfolder) {
                e.style.backgroundColor = "#353535"
            } else {
                e.style.backgroundColor = "#202020"

            }


        }
        for (let i = 0; i < songs.length; i++) {
            const element = songs[i];
            let listsong = document.querySelector(".list").getElementsByTagName("li")
            if (element == currentsong.src) {
                listsong[i].style.backgroundColor = "#313131"
            }
            else {
                listsong[i].style.backgroundColor = "#121212"
            }

        }

        let cc = currentsong.currentTime
        let cd = currentsong.duration
        let p = (cc / cd) * 100
        rfd.innerHTML = `${secondsToMinutesSeconds(cc)}/${secondsToMinutesSeconds(cd)}`
        dot.style.left = `calc(${p}% - 4px)`
        if (currentsong.currentTime == currentsong.duration) {
            let index = songs.indexOf(currentsong.src)
            if (index == songs.length - 1) {
                currentsong.src = songs[0]
            } else {
                currentsong.src = songs[index + 1]
    
            }
            settingsongnames()
            playorpause("play")
            currentsong.play()
        }

    })
    line.addEventListener("click", (e) => {
        let p = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        dot.style.left = `calc(${p}% - 4px)`
        currentsong.currentTime = (p * currentsong.duration) / 100
    })
    let containervisible = false
    let leftvisible = false
    let songbtn = document.querySelector(".songs")
    let left = document.querySelector(".left")
    let barsbtn = document.querySelector(".bars")
    let container = document.querySelector(".container")
    songbtn.addEventListener("click", () => {
        if (leftvisible) {
            left.style.right = "150%"

        } else {
            if (containervisible) {
                container.style.right = "150%"
                containervisible = !containervisible

            }

            left.style.right = "0"
        }
        leftvisible = !leftvisible
        left.style.width = "90vw"
    })
    barsbtn.addEventListener("click", () => {
        if (containervisible) {
            container.style.right = "150%"

        } else {
            if (leftvisible) {
                left.style.right = "150%"
                leftvisible = !leftvisible

            }
            container.style.right = "0%"
        }
        containervisible = !containervisible
    })
    let range = document.querySelector(".range")
    let img = document.querySelector(".volbtncls")
    img.addEventListener("click", () => {
        if (range.style.right === "-150px") {
            range.style.right = "13px"
        }
        else if (range.style.right === "13px") {
            range.style.right = "-150px"

        }
        else {
            range.style.right = "13px"
        }
    })
    range.getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100
        if (currentsong.volume == 0) {
            img.innerHTML = `<img class="imgres volbtn" src="images/novolume.svg" alt="">`

        } else if (currentsong.volume >= 0 && currentsong.volume < 0.6) {
            img.innerHTML = `<img class="imgres volbtn" src="images/lowvolume.svg" alt="">`

        } else {
            img.innerHTML = `<img class="imgres volbtn" src="images/highvolume.svg" alt="">`
        }
    })







}
main()
