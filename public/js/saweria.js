import { request, HTTP_GET, HTTP_PATCH, HTTP_PUT } from "./request.js";

import { storage } from "./storage.js";
export const saweria = (() => {
  const session = storage("session");
  const renderLoading = () => {
    document.getElementById("saweria-leaderboard").innerHTML = `
        <div class="card-body bg-theme-${theme.isDarkMode(
          "dark",
          "light"
        )} shadow p-3 mx-0 mt-0 mb-3 rounded-4">
            <div class="d-flex flex-wrap justify-content-between align-items-center placeholder-wave">
                <span class="placeholder bg-secondary col-4 rounded-3"></span>
                <span class="placeholder bg-secondary col-2 rounded-3"></span>
            </div>
            <hr class="text-${theme.isDarkMode("light", "dark")} my-1">
            <p class="card-text placeholder-wave">
                <span class="placeholder bg-secondary col-6 rounded-3"></span>
                <span class="placeholder bg-secondary col-5 rounded-3"></span>
                <span class="placeholder bg-secondary col-12 rounded-3"></span>
            </p>
        </div>`.repeat(pagination.getPer());
  };
  const leaderboard = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Stream-Key", "fd39b673a80ad1be9d51d0394ccdd5a5");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let url = document.querySelector("body").getAttribute("data-url");
    return {
      then(...params) {
        return fetch(url + "/api/saweria/leaderboard?range=all", requestOptions)
          .then(...params)
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      },
    };
  };

  const renderLeaderboard = async () => {
    renderLoading();
    await await request(
      HTTP_GET,
      `/api/saweria/leaderboard?range=all`
    )
      .token(session.get("token"))
      .then((res) => {
        console.log(res);
      });
  };

  return {
    leaderboard,
    renderLeaderboard,
  };
})();
