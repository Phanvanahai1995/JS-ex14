"use strict";

const karaokeContainer = document.querySelector(".karaoke");
const audio = document.querySelector("audio");

lyrics = JSON.parse(lyrics).data.sentences;

lyrics.forEach((lyric, index) => {
  const spanEl = document.createElement("span");
  const html = lyric.words.map((word) => word.data).join(" ");
  spanEl.innerText = html;
  spanEl.setAttribute("data-time", index);
  karaokeContainer.append(spanEl);
});

const spanEls = document.querySelectorAll("span");
const spanEndTop = spanEls[spanEls.length - 1].getBoundingClientRect().top;

audio.addEventListener("timeupdate", function () {
  lyrics.forEach((lyric, i) => {
    if (
      audio.currentTime >= lyric.words[0].startTime / 1000 &&
      audio.currentTime <= lyric.words[lyric.words.length - 1].endTime / 1000
    ) {
      spanEls[i].className = "active";

      setTimeout(function () {
        spanEls[i].style.display = "none";
      }, lyric.words[lyric.words.length - 1].endTime / 10);
    } else {
      spanEls[i].className = "";
    }
  });

  if (audio.currentTime === audio.duration) {
    spanEls.forEach((span) => (span.style.display = "block"));
  }
});
