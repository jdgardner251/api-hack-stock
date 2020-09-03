//Stock news API = 7odsz0k5jiqtfw0onngjimmcovsocjagkoasakw0
//Stock news Endpoing = https://stocknewsapi.com/api/v1?tickers=FB&items=10&token=7odsz0k5jiqtfw0onngjimmcovsocjagkoasakw0

// FB is the ticker above to add into the url

const yahooURL = "https://yahoo-finance-free.p.rapidapi.com/v6/finance/quote?region=US&lang=en&symbols="
const apiKey = "a34d8976d7mshb593b216380e63dp1ef646jsn7d7b2bf5b066";
// header info:
// x-rapidapi-host: yahoo-finance-free.p.rapidapi.com
// x-rapidapi-key: a34d8976d7mshb593b216380e63dp1ef646jsn7d7b2bf5b066
'use strict';

// Take the object response from stockNews to reder the url, title, and image of articles
function displayNews(responseJson){
    console.log(responseJson)
    console.log(responseJson.data[0].title)
    $('#results-list').empty();
    $('#js-error-message').empty();
    //loop throur news articles and show the title and description
    // provide title as a hyperlink
    for (let i = 0; i < responseJson.data.length; i++){
        const currentItem = responseJson.data[i];
        
        $('#results-list').append(
            `<li>
                <h3><a href="${currentItem.news_url}">${currentItem.title}</a></h3>
                <img src="${currentItem.image_url}">
            </li>
            `
        )
    }

    $('#results').removeClass('hidden');
    
}
// use the url to take the user input and fetch data from stocknews API
function getNews(ticker) {
    const urlTicker = ticker;
    console.log(urlTicker);
    const url = `https://stocknewsapi.com/api/v1?tickers=${urlTicker}&items=4&token=7odsz0k5jiqtfw0onngjimmcovsocjagkoasakw0`

    fetch(url)
        .then(response => response.json()
        .then(responseJson => displayNews(responseJson))
        .catch(err => {
            $('#js-error-message').text(`something went wrong: ${err.message}`);
        }));
}

// take the response object to show the symbol, current price, and %Change from yesterday
function displayQuote(responseJson){
    console.log(responseJson);
    const currentStock = responseJson.quoteResponse.result[0];
    $('#quote').empty();
    $('#js-error-message').empty();
    $('#quote').html(
        `<h3 class="long-name">${currentStock.longName}</h3>
            <hr>
            <div class="group">
                <div class="item">Ticker: ${currentStock.symbol}</div>
                <div class="item">Current Price: ${currentStock.regularMarketPrice} </div>
                <div class="item">% Change: ${currentStock.regularMarketChangePercent.toFixed(2)}</div>
            </div>
           
            <hr>
        `
    )

    $('#quote').removeClass('hidden');

}
 // use yahoo finance API to take the user input combined with yahoo API url to request data
function getQuote(ticker) {
    console.log('Get quote is running')
    const queryURL = yahooURL + ticker;
    console.log(queryURL);
// this are the required headers to be passed in with the url to the fetch
    const options = {
        headers: new Headers({
            "x-rapidapi-host": "yahoo-finance-free.p.rapidapi.com",
            "x-rapidapi-key": apiKey
        })
    };

    fetch(queryURL, options)
        .then(response => response.json()
        .then(responseJson => displayQuote(responseJson))
        .catch(err => {
            $('#js-error-message').text(`something went wrong: ${err.message}`);
        }))

}

function watchForm() {
    //Listen for a submit on the button
    $('form').submit(event => {
      event.preventDefault();
      const ticker = $('#js-ticker').val();
      console.log(ticker);

      getNews(ticker);
      getQuote(ticker);
  
    });
  }

  $(watchForm);