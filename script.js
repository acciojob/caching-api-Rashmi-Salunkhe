// complete the js code
const fetchButton = document.getElementById("fetch-button");
const resultsDiv = document.getElementById("results");

const cache = new Map();

const fetchData = async () => {
  // implement the caching here and store data in cache variable

  console.log("Making API call");
  const response = await fetch("https://opentdb.com/api.php?amount=3");
  const data = await response.json();

  cache.set(cacheKey, {
    timestamp: Date.now(),
    data: data,
  });

  return data;
};

const displayData = (data) => {
  const question = data.results[0].question;
  resultsDiv.textContent = question;
};

fetchButton.addEventListener("click", async () => {
  const data = await fetchData();
  displayData(data);
});
