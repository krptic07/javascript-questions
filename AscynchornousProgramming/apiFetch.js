fetch("https://api.binance.com/api/v3/ticker/price") // Replace with your API URL
  .then((response) => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // console.log(response);
    return response.json(); // Parse JSON from response
  })
  .then((data) => {
    // console.log(typeof data);
    const USDC_PAIRS = data.filter((dat) => dat.symbol.includes("USDC"));
    console.log(USDC_PAIRS);
    console.log(data); // Handle the data from the API
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error); // Handle any errors
  });
