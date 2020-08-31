//Stock news API = 7odsz0k5jiqtfw0onngjimmcovsocjagkoasakw0
//Stock news Endpoing = https://stocknewsapi.com/api/v1?tickers=FB&items=10&token=7odsz0k5jiqtfw0onngjimmcovsocjagkoasakw0
// FB is the ticker above to add into the url

const yahooURL = "https://yahoo-finance-free.p.rapidapi.com/v6/finance/quote?region=US&lang=en&symbols="
const apiKey = "a34d8976d7mshb593b216380e63dp1ef646jsn7d7b2bf5b066";
// header info:
// x-rapidapi-host: yahoo-finance-free.p.rapidapi.com
// x-rapidapi-key: a34d8976d7mshb593b216380e63dp1ef646jsn7d7b2bf5b066
'use strict';

function displayNews(responseJson){
    console.log(responseJson)
    console.log(responseJson.data[0].title)
    $('#results-list').empty();
    //loop throur news articles and show the title and description
    // provide title as a hyperlink
    for (let i = 0; i < responseJson.data.length; i++){
        $('#results').append(
            `<li>
                <h3><a href="${responseJson.data[i].news_url}">${responseJson.data[i].title}</a></h3>
                <img src="${responseJson.data[i].image_url}">
            </li>
         `
        )
    }

    $('#results').removeClass('hidden');
}

function getNews(ticker) {
    console.log('getNews is running');
    const urlTicker = ticker;
    console.log(urlTicker);
    const url = `https://stocknewsapi.com/api/v1?tickers=${urlTicker}&items=10&token=7odsz0k5jiqtfw0onngjimmcovsocjagkoasakw0`

    fetch(url)
        .then(response => response.json()
        .then(responseJson => displayNews(responseJson))
        );
}

function displayQuote(responseJson){
    console.log(responseJson);
    const currentStock = responseJson.quoteResponse.result[0];
    $('#quote').empty();
    $('#quote').html(
        `<h3>${currentStock.displayName}</h3>
            <p>Ticker: "${currentStock.symbol}"</p>
            <p>Current Price: ${currentStock.regularMarketPrice}</p>
        `
    )

    $('#quote').removeClass('hidden');

}

function getQuote(ticker) {
    console.log('Get quote is running')
    const queryURL = yahooURL + ticker;
    console.log(queryURL);

    const options = {
        headers: new Headers({
            "x-rapidapi-host": "yahoo-finance-free.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        })
    };

    fetch(queryURL, options)
        .then(response => response.json()
        .then(responseJson => displayQuote(responseJson))
        )

}

function watchForm() {
    console.log('watchForm is running');
    $('form').submit(event => {
      event.preventDefault();
      const ticker = $('#js-ticker').val();
      console.log(ticker);

      getNews(ticker);
      getQuote(ticker);
  
    });
  }
  
  $(watchForm);