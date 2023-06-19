const videos = [
    ["https://www.youtube.com/embed/QmrQkQsM9FU", "Extra-Terrestrial"],
    ["https://www.youtube.com/embed/nCPpgt0s70U", "Pac-Man"],
    ["https://www.youtube.com/embed/7YxKf8D7w8U", "Keystone Kapers"],
    ["https://www.youtube.com/embed/l_lJ-ONcMEs", "Pitfall!"],
    ["https://www.youtube.com/embed/uJijGLGHRTE", "Missile Command"],
    ["https://www.youtube.com/embed/jvli9CXSqP4", "Enduro"],
    ["https://www.youtube.com/embed/43rLg3mRX8g", "Commando"],
    ["https://www.youtube.com/embed/rMm4rQQ-O-M", "Popeye"],
    ["https://www.youtube.com/embed/rSfWuN0sZqs", "Moon Patrol"],
    ["https://www.youtube.com/embed/AkUWX5I4GKw", "Krull"]
];

let player = document.getElementById("yt-player");
let title = document.getElementById("title");
let currIndex = 0;

player.src = videos[currIndex][0];
title.textContent = videos[currIndex][1];

function changeVideo(next) {
    if (next === true) {
        if (currIndex + 1 === videos.length)
            currIndex = 0;
        else
            currIndex += 1;
    } else {
        if (currIndex - 1 === -1)
            currIndex = videos.length - 1;
        else
            currIndex -= 1;
    }

    player.src = videos[currIndex][0];
    title.textContent = videos[currIndex][1];
}