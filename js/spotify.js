function getClientCred(client_id, client_secret) {
  return btoa(client_id + ":" + client_secret);
}

function getAccessToken(callback) {
  let client_id = localStorage.getItem("CLIENT_ID");
  let client_secret = localStorage.getItem("CLIENT_SECRET");

  if (client_id == "" || client_secret == "") {
    alert("Please set the values for 'CLIENT ID' and 'CLIENT SECRET'");
    return;
  }

  $.ajax({
    url: "https://accounts.spotify.com/api/token",
    type: "POST",
    headers: {
      Authorization: "Basic " + getClientCred(client_id, client_secret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      grant_type: "client_credentials",
    },
    success: function (response) {
      callback(response.access_token);
    },
    error: function (response) {
      console.error("Error: ", response);
    },
  });
}

function spotifyAPI(url, callback) {
  getAccessToken(function (token) {
    $.ajax({
      url: url,
      headers: {
        Authorization: "Bearer " + token,
      },
      success: callback,
      error: function (response) {
        console.error("Error: ", response);
      },
    });
  });
}

function search(query, type, callback) {
  if (query == null) return;
  let encodedQuery = encodeURIComponent(query);
  spotifyAPI(
    `https://api.spotify.com/v1/search?q=${encodedQuery}&type=${type}`,
    callback
  );
}

function searchTrack(query, callback) {
  search(query, "track", callback);
}

function searchArtist(query, callback) {
  search(query, "artist", callback);
}

function searchAlbum(query, callback) {
  search(query, "album", callback);
}

function searchPlaylist(query, callback) {
  search(query, "playlist", callback);
}

function searchAlbumInTrack(id, callback) {
  spotifyAPI(`https://api.spotify.com/v1/albums/${id}`, callback);
}

function searchPlaylistInTrack(id, callback) {
  spotifyAPI(`https://api.spotify.com/v1/playlists/${id}`, callback);
}

function searchArtistInTrack(id, callback) {
  spotifyAPI(`https://api.spotify.com/v1/artists/${id}/top-tracks`, callback);
}

function getFeaturedPlaylists(callback) {
  spotifyAPI(`https://api.spotify.com/v1/browse/featured-playlists`, callback);
}
