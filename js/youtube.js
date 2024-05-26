let apiServers = [
  //   "https://pipedapi.kavin.rocks/", very slow
  "https://pipedapi.leptons.xyz/",
  "https://pipedapi.r4fo.com/",
  "https://pipedapi.darkness.services/",
];
let apiIndex = Math.floor(Math.random() * apiServers.length);
const keywords = ["lyric", "audio", "official", "mv", "music video", "live"];

// https://codepen.io/brownsugar/pen/oNPzxKo
// https://cdpn.io/pen/debug/oNPzxKo?v=VIDEO_ID
function loadVideo(singerName, songName) {
  $.ajax({
    url: apiServers[apiIndex] + "search",
    data: {
      q: `"${singerName} ${songName}"`,
      filter: "videos",
    },
    type: "GET",
    success: function (response) {
      if (response.items && response.items.length > 0) {
        for (let item of response.items) {
          let duration = item.duration;
          let title = item.title.toLowerCase();

          if (
            duration < 600 &&
            keywords.some((keyword) => title.includes(keyword))
          ) {
            let videoUrl = item.url;
            let videoId = videoUrl.split("v=")[1];
            console.log("Video ID: ", videoId);
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
            break;
          }
        }
      }
    },
    error: function (response) {
      console.error("Error: ", response);
    },
  });
}
