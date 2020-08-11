let colors = [
  "#931DA5",
  "#DB1989",
  "#FF4F6A",
  "#FF8A52",
  "#FFC34E",
  "#00B2A9",
  "#00A3CF",
  "#0091E8",
  "#A67CA9",
];

let quotesObject, quote, author;

function getQuotes() {
  return $.ajax({
    method: "GET",
    url:
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
    success: function (data) {
      quotesObject = JSON.parse(data);
      console.log(quotesObject);
    },
  });
}

function randomNumber(len) {
  return Math.floor(Math.random() * len);
}

function getQuote() {
  let num = randomNumber(quotesObject.quotes.length);
  let random = quotesObject.quotes[num];

  quote = random.quote;
  author = random.author;

  $(".quote-text").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#text").text(quote);
  });

  $(".quote-author").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#author").html(author);
  });

  $("#tweet-quote").attr(
    "href",
    `https://twitter.com/intent/tweet?hashtags=quotegenerator&text="${quote}" - ${author}`
  );

  let index = randomNumber(colors.length);
  let color = colors[index];

  $("html body").css({
    backgroundColor: color,
    color: color,
  });
  $(".btn-color").css({
    backgroundColor: color,
  });
  $(".tweet-quote").css({
    backgroundColor: color,
  });
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $("#new-quote").on("click", getQuote);
});
