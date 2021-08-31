import nProgress from "nprogress";

export default function fetchData(url, postData, func) {
  nProgress.start();
  fetch("/" + url, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      func(json);
      nProgress.done();
    });
}
