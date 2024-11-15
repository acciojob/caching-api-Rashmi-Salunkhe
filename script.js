const fetchButton = document.getElementById("fetch-button");
const resultsDiv = document.getElementById("results");
const cache = new Map();
const cacheDuration = 60000; // 1 minute in milliseconds

const fetchData = async () => {
  const cacheKey = "apiData";
  const cachedData = cache.get(cacheKey);
  const currentTime = Date.now();

  // Check if data is cached and still valid
  if (cachedData && currentTime - cachedData.timestamp < cacheDuration) {
    console.log("Serving data from cache");
    return cachedData.data;
  }

  // If no valid cache, make API call
  console.log("Making API call");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c3a9a6b376msh528c0d78a1c317ap1759efjsn28df182c8b4f",
      "X-RapidAPI-Host": "financialmarketdata.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      "https://financialmarketdata.p.rapidapi.com/api/v3/stock/list",
      options
    );
    const data = await response.json();

    // Store the response in cache with the current timestamp
    cache.set(cacheKey, {
      timestamp: currentTime,
      data: data,
    });

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displayData = (data) => {
  // Display the first 5 stocks in the results div
  const stocks = data.slice(0, 5);
  resultsDiv.innerHTML = stocks
    .map((stock) => `<p>${stock.symbol}: ${stock.name}</p>`)
    .join("");
};

fetchButton.addEventListener("click", async () => {
  const data = await fetchData();
  if (data) {
    displayData(data);
  }
});