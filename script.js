// Array of song objects, each with name, cover image, file path, and duration
songs = [
  {
    name: "Warriyo - Mortals",
    cover: "covers/1.jpg",
    filePath: "songs/1.mp3",
    duration: "03:50",
  },
  {
    name: "Cielo - Huma-Huma",
    cover: "covers/2.jpg",
    filePath: "songs/2.mp3",
    duration: "02:33",
  },
  {
    name: "DEAF KEV - Invincible",
    cover: "covers/3.jpg",
    filePath: "songs/3.mp3",
    duration: "04:33",
  },
  {
    name: "Different Heaven & EH!DE",
    cover: "covers/4.jpg",
    filePath: "songs/4.mp3",
    duration: "04:27",
  },
  {
    name: "Janji - Heroes Tonight",
    cover: "covers/5.jpg",
    filePath: "songs/5.mp3",
    duration: "03:28",
  },
  {
    name: "Lost Sky - Fearless",
    cover: "covers/6.jpg",
    filePath: "songs/6.mp3",
    duration: "03:14",
  },
  {
    name: "Spektrem - Shine",
    cover: "covers/7.jpg",
    filePath: "songs/7.mp3",
    duration: "04:18",
  },
  {
    name: "Tobu - Hope",
    cover: "covers/8.jpg",
    filePath: "songs/8.mp3",
    duration: "04:45",
  },
  {
    name: "Electro-Light - Symbolism",
    cover: "covers/9.jpg",
    filePath: "songs/9.mp3",
    duration: "04:51",
  },
  {
    name: "Alan Walker - Faded",
    cover: "covers/10.jpg",
    filePath: "songs/10.mp3",
    duration: "03:32",
  },
];

// Select the song list container and populate it with song items
document.querySelector(".songList").innerHTML = ""; // Clear existing content
// Iterate over the songs array to create and insert song elements into the DOM
songs.forEach((song) => {
  let songList = document.querySelector(".songList");
  songList.innerHTML += `
            <div class="song">
                <img src="${song.cover}" alt="${song.name}">
                <span>${song.name}</span>
                <div class="songControls">
                    <span>${song.duration}</span>
                    <i class="fa-solid fa-play"></i>
                </div>
            </div>`;
});

// When the user click on the play icon on the song in the song list that song will play
// Get all song items from the list
let songItems = document.querySelectorAll(".song");
// Create an Audio object to handle music playback
let audioElement = new Audio();
// Keep track of the currently playing song index
let currentPlayingIndex = -1;
// Get DOM elements for master controls
let masterPlay = document.getElementById("masterPlay");
let songSlider = document.querySelector(".songSlider");
let restartBtn = document.getElementById("restart");
let previousBtn = document.getElementById("previous");
let backwardBtn = document.getElementById("backward");
let forwardBtn = document.getElementById("forward");
let nextBtn = document.getElementById("next");
let loopBtn = document.getElementById("loop");
let masterSongName = document.getElementById("masterSongName");
let playingGif = document.getElementById("playingGif");

// Function to reset all play icons in the song list to 'play'
const makeAllPlays = () => {
  songItems.forEach((item) => {
    item.querySelector("i").classList.remove("fa-pause");
    item.querySelector("i").classList.add("fa-play");
  });
};

// Function to play a song by its index
const playSong = (index) => {
  makeAllPlays(); // Reset all other play icons
  currentPlayingIndex = index; // Update the current playing index
  audioElement.src = songs[index].filePath; // Set the audio source
  masterSongName.innerText = songs[index].name; // Update the master song name display
  audioElement.play(); // Play the audio
  playingGif.style.opacity = 1; // Show the gif
  // Update master play icon to 'pause'
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  // Update the song item's icon to 'pause'
  songItems[index].querySelector("i").classList.remove("fa-play");
  songItems[index].querySelector("i").classList.add("fa-pause");
};

// Add click event listeners to each song item
songItems.forEach((item, index) => {
  const playIcon = item.querySelector("i");
  playIcon.addEventListener("click", () => {
    // If the clicked song is already playing, pause it
    if (currentPlayingIndex === index && !audioElement.paused) {
      audioElement.pause();
      playingGif.style.opacity = 0; // Hide the gif
      // Change icons back to 'play'
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
      masterPlay.classList.remove("fa-pause");
      masterPlay.classList.add("fa-play");
    } else {
      // Otherwise, play the new song
      playSong(index);
    }
  });
});

// Add click event listener to the master play/pause button
masterPlay.addEventListener("click", () => {
  // If audio is paused or not started
  if (audioElement.paused || audioElement.currentTime <= 0) {
    // If a song has been selected
    if (currentPlayingIndex !== -1) {
      audioElement.play();
      playingGif.style.opacity = 1; // Show the gif
      // Update icons to 'pause' state
      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
      songItems[currentPlayingIndex]
        .querySelector("i")
        .classList.remove("fa-play");
      songItems[currentPlayingIndex]
        .querySelector("i")
        .classList.add("fa-pause");
    }
  } else {
    // If audio is playing, pause it
    audioElement.pause();
    playingGif.style.opacity = 0; // Hide the gif
    // Update icons to 'play' state
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    if (currentPlayingIndex !== -1) {
      songItems[currentPlayingIndex]
        .querySelector("i")
        .classList.remove("fa-pause");
      songItems[currentPlayingIndex]
        .querySelector("i")
        .classList.add("fa-play");
    }
  }
});

// Listen for time updates on the audio element to move the progress bar
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  // Calculate progress percentage
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  // Update the slider value if it's a valid number
  if (!isNaN(progress)) {
    songSlider.value = progress;
  }
});

// Add event listener to the song slider to seek within the song
songSlider.addEventListener("change", () => {
  audioElement.currentTime = (songSlider.value * audioElement.duration) / 100;
});

// Handle what happens when a song finishes playing
audioElement.addEventListener("ended", () => {
  // When the song ends, reset the icons
  masterPlay.classList.remove("fa-pause");
  masterPlay.classList.add("fa-play");
  playingGif.style.opacity = 0; // Hide the gif
  if (currentPlayingIndex !== -1) {
    songItems[currentPlayingIndex]
      .querySelector("i")
      .classList.remove("fa-pause");
    songItems[currentPlayingIndex].querySelector("i").classList.add("fa-play");
  }
  // Optional: play next song if loop is not active
  if (!audioElement.loop) {
    nextBtn.click(); // Simulate a click on the next button
  }
});

// Control button listeners
// Restart the current song
restartBtn.addEventListener("click", () => {
  audioElement.currentTime = 0;
});

// Go backward 10 seconds
backwardBtn.addEventListener("click", () => {
  audioElement.currentTime -= 10;
});

// Go forward 10 seconds
forwardBtn.addEventListener("click", () => {
  audioElement.currentTime += 10;
});

// Play the previous song
previousBtn.addEventListener("click", () => {
  if (currentPlayingIndex <= 0) {
    currentPlayingIndex = songs.length - 1; // Wrap around to the last song
  } else {
    currentPlayingIndex -= 1;
  }
  playSong(currentPlayingIndex);
});

// Play the next song
nextBtn.addEventListener("click", () => {
  if (currentPlayingIndex >= songs.length - 1) {
    currentPlayingIndex = 0; // Wrap around to the first song
  } else {
    currentPlayingIndex += 1;
  }
  playSong(currentPlayingIndex);
});

// Toggle loop for the current song
loopBtn.addEventListener("click", () => {
  audioElement.loop = !audioElement.loop; // Toggle the loop property
  loopBtn.classList.toggle("active", audioElement.loop); // Toggle 'active' class for visual feedback
});
