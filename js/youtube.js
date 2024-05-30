let apiServers = [
  "https://pipedapi.kavin.rocks/",
  "https://pipedapi.leptons.xyz/",
  "https://pipedapi.r4fo.com/",
  "https://pipedapi.darkness.services/",
];
const keywords = ["lyric", "audio", "official", "mv", "music video", "live", "가사"];

// https://codepen.io/brownsugar/pen/oNPzxKo
// https://cdpn.io/pen/debug/oNPzxKo?v=VIDEO_ID
function createAndLoadIframe(videoId) {
  let iframe = document.createElement("iframe");

  iframe.width = "640";
  iframe.height = "360";
  iframe.src = `https://cdpn.io/pen/debug/oNPzxKo?v=${videoId}&autoplay=1`;
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  );
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("frameborder", "0");

  let playerDiv = document.getElementById("youtubePlayer");
  playerDiv.innerHTML = "";
  playerDiv.appendChild(iframe);
}

function loadVideo(singerName, songName) {
  let apiIndex = Math.floor(Math.random() * apiServers.length);
  $.ajax({
    url: apiServers[apiIndex] + "search",
    data: {
      q: `${singerName} ${songName}`, // 쌍따옴표 사용 유무에 따른 정확도 검증 필요
      filter: "videos",
    },
    type: "GET",
    success: function (response) {
      if (response.items && response.items.length > 0) {
        let found = false;
        for (let item of response.items) {
          let duration = item.duration;
          let title = item.title.toLowerCase();

          if (
            duration < 600 &&
            keywords.some((keyword) => title.includes(keyword))
          ) {
            found = true;
            let videoUrl = item.url;
            let videoId = videoUrl.split("v=")[1];
            createAndLoadIframe(videoId);
            break;
          }
        }
        // 노래를 찾지 못한 경우, 첫 번째 항목으로 재생
        if (!found) {
          let videoUrl = response.items[0].url;
          let videoId = videoUrl.split("v=")[1];
          createAndLoadIframe(videoId);
        }
      }
    },
    error: function (response) {
      console.error("Error: ", response);
    },
  });
}
