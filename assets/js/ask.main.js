"use strict";
/******************** ASK TAB  ********************/
let askWrapper = document.querySelectorAll(".ask__wrapper");
askWrapper.forEach((tab) => {
  const allQuestion = tab.querySelector(".ask__tab__questions");
  const tabButton = tab.querySelectorAll(".ask__tab__question");
  const contents = tab.querySelectorAll(".ask__tab__content");

  if (allQuestion !== null) {
    allQuestion.onclick = (e) => {
      const id = e.target.dataset.id;
      if (id) {
        tabButton.forEach((question) => {
          question.classList.remove("ask-active");
        });
        e.target.classList.add("ask-active");

        contents.forEach((content) => {
          content.classList.remove("ask-active");
        });
        const element = document.getElementById(id);
        element.classList.add("ask-active");
      }
    };
  }

  /******************** QUESTION SEARCH  ********************/
  let input = tab.querySelector(".tab-search-input");
  if (input !== null) {
    input.addEventListener("input", function () {
      let searchKeyword, i, txtValue, displayed;
      let filter = input.value.toLowerCase();
      let container = tab.querySelector(".ask__tab__questions");
      let noQuestionText = container.querySelector(".no-question-found");
      let question = tab.getElementsByClassName("ask__tab__question");
      displayed = false;
      for (i = 0; i < question.length; i++) {
        searchKeyword = question[i].getElementsByClassName(
          "ask__tab__question--text"
        )[0];
        txtValue = searchKeyword.textContent || searchKeyword.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          question[i].style.display = "";
          displayed = true;
        } else {
          question[i].style.display = "none";
        }
      }
      if (!displayed) {
        if (!noQuestionText) {
          noQuestionText = document.createElement("p");
          noQuestionText.textContent = "No question found";
          noQuestionText.className = "no-question-found";
          container.appendChild(noQuestionText);
        }
      } else {
        if (noQuestionText) {
          container.removeChild(noQuestionText);
        }
      }
    });
    input.addEventListener("change", function () {
      let container = tab.querySelector(".ask__tab__questions");
      let noQuestionText = container.querySelector(".no-question-found");
      if (input.value === "" && noQuestionText) {
        container.removeChild(noQuestionText);
      }
    });
  }
});

/******************** AUDIO PLAYER  ********************/
let audioPlayers = document.querySelectorAll(".audio-player");
audioPlayers.forEach((player) => {
  let playPause_btn = player.querySelector(".playpause-track");
  let seek_slider = player.querySelector(".seek_slider");
  let volume_slider = player.querySelector(".volume_slider");
  let curr_time = player.querySelector(".current-time");
  let total_duration = player.querySelector(".total-duration");
  let curr_track = player.querySelector(".audio-play");
  let loader = player.querySelector(".loader");

  let isPlaying = false;
  let updateTimer;

  loadTrack();

  function loadTrack() {
    clearInterval(updateTimer);
    reset();
    curr_track.load();
    updateTimer = setInterval(setUpdate, 1000);
  }
  function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }
  function playPauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
  }
  function playTrack() {
    curr_track.play();
    isPlaying = true;
    playPause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    loader.classList.remove("animatedPlay");
  }
  function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playPause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    loader.classList.add("animatedPlay");
  }
  function seekTo() {
    let seek = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seek;
  }
  function setVolume() {
    curr_track.volume = volume_slider.value / 100;
  }
  playPause_btn.addEventListener("click", playPauseTrack);
  seek_slider.addEventListener("click", seekTo);
  volume_slider.addEventListener("change", setVolume);

  function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;

      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(
        curr_track.currentTime - currentMinutes * 60
      );
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(
        curr_track.duration - durationMinutes * 60
      );
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  /******************** AUDIO VIDEO PAUSE  ********************/
  let audioVideoPlayer = document.querySelectorAll("video, audio");
  let acc = document.querySelectorAll(".ask-faq");
  // Pause media when button is clicked
  function handleButtonClick() {
    audioVideoPlayer.forEach(function (element) {
      element.pause();
      isPlaying = false;
      playPause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
      loader.classList.add("animatedPlay");
    });
  }
  // Add event listeners to accordion
  acc.forEach(function (singleAcc) {
    singleAcc.addEventListener("click", handleButtonClick, false);
  });
});

/******************** ACCORDION  ********************/
let accordionWrapper = document.querySelectorAll(".ask-accordion");
accordionWrapper.forEach((accordion) => {
  function createAccordions() {
    let acc = accordion.getElementsByClassName("ask__accordion");
    if (acc.length !== 0) {
      let i;
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          let current = this;
          for (i = 0; i < acc.length; i++) {
            if (
              acc[i] !== current &&
              acc[i].classList.contains("ask__active")
            ) {
              acc[i].classList.remove("ask__active");
              acc[i].nextElementSibling.style.maxHeight = null;
            }
          }
          current.classList.toggle("ask__active");

          let panel = current.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
      window.addEventListener("load", function () {
        acc[0].click();
      });
    }
  }
  createAccordions();
  /******************** SEARCH FUNCTIONALITY  ********************/
  let searchInput = accordion.querySelector(".accordion-search-input");

  if (searchInput !== null) {
    searchInput.addEventListener("input", function () {
      let searchKeyword, i, txtValue, displayed;
      let searchText = this.value.toLowerCase();
      let sections = accordion.getElementsByClassName("ask__single__accordion");
      let container = accordion.querySelector(".ask__accordion__wrapper");
      let noSectionText = container.querySelector(".no-question-found");
      displayed = false;
      for (i = 0; i < sections.length; i++) {
        searchKeyword = sections[i].getElementsByClassName("title")[0];
        txtValue = searchKeyword.textContent || searchKeyword.innerText;
        if (txtValue.toLowerCase().indexOf(searchText) > -1) {
          sections[i].style.display = "";
          displayed = true;
        } else {
          sections[i].style.display = "none";
        }
      }
      if (!displayed) {
        if (!noSectionText) {
          noSectionText = document.createElement("p");
          noSectionText.textContent = "No question found";
          noSectionText.className = "no-question-found";
          container.appendChild(noSectionText);
        }
      } else {
        if (noSectionText) {
          container.removeChild(noSectionText);
        }
      }
    });
    searchInput.addEventListener("change", function () {
      let container = accordion.querySelector(".ask__accordion__wrapper");
      let noSectionText = container.querySelector(".no-question-found");
      if (searchInput.value === "" && noSectionText) {
        container.removeChild(noSectionText);
      }
    });
  }
});

/******************** ASK QUESTION POPUP  ********************/
const askAnythings = document.querySelectorAll(".ask__anything");
askAnythings.forEach((askAnything) => {
  const button = askAnything.querySelector(".ask__question");
  const popup = askAnything.querySelector(".ask__anything__popup");
  const close = popup.querySelector(".popup-content__body--close");
  const emptyContent = askAnything.querySelector(".empty-content");

  button.addEventListener("click", () => {
    popup.classList.add("popup-show");
  });

  close.addEventListener("click", () => {
    popup.classList.remove("popup-show");
  });

  emptyContent.addEventListener("click", () => {
    popup.classList.remove("popup-show");
  });

  /******************** ASK QUESTION FORM  ********************/
  const form = askAnything.querySelector(".form");

  form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    let object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    let json = JSON.stringify(object);
    const para = document.createElement("p");
    para.innerHTML = "Please wait...";
    para.classList.add("result");
    form.appendChild(para);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          para.innerHTML = json.message;
        } else {
          para.innerHTML = json.message;
        }
      })
      .catch((error) => {
        console.log(error);
        para.innerHTML = "Something went wrong!";
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          para.style.display = "none";
        }, 5000);
      });
  });
});
