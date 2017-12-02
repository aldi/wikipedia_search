$(document).ready(function() {

  //Function to check if the input search box isn't empty 
  function checkInput() {
    if ($('#before_url').val() == "") {
      alert('Please type a keyword to search');
      return false;
    } else {
      return true;
    }
  }

  //When the search button is clicked 
  $('#search').click(function() {
    if (checkInput()) {
      search();
    }
  });

  //When the user starts typing in...
  $(document).keyup(function(e) {
    if (e.which == 13) {
      if (checkInput()) {
        if ($('#searched_results_display').hasClass('hidden')) {
          search();
        } else {
          var keyword = $('#after_search').val();
          getresults(keyword);
        }

      }

    } else {
      if ($('.main_search').hasClass('hidden')) {

        var keyword = $('#after_search').val();
        getresults(keyword);
      }
    }
  });

  //Change view when search button is clicked
  function search() {

    var keyword = $('#before_url').val();
    $('#after_search').val(keyword);
    $('.main_search').addClass('hidden');
    $('#searched_results_display').removeClass('hidden');
    getresults(keyword);

  }

  //GET Function
  function getresults(keyword) {
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
      dataType: "jsonp",
      success: function(wikiResponse) {
        if (wikiResponse.query.searchinfo.totalhits == 0) {
          $('.wiki_results').html("");
          $('.wiki_results').append("<div class='error'><div>Your search - <b>" + keyword + "</b> - did not match any articles.</div>" + "<br>" + "<div>Suggestions:</div>" + "<ul><li>Make sure that all words are spelled correctly</li><li>Try different keywords</li><li>Try more general words</li><li>Try fewer keywords</li></ul></div></br>");
        } else {
          showResults(wikiResponse);
        }

      },
      error: function() {
        alert('Error retrieving results!');
      }
    });
  }

  //Display Results
  function showResults(wikiResponse) {
    $('.wiki_results').html("");

    for (var i = 0; i < 9; i++) {
      $('.wiki_results').append("<div class='wiki_title wiki_title_" + i + "'></div>" + "<div class='snpt wiki_snippet_" + i + "'></div>");
    }

    for (var j = 0; j < 9; j++) {
      var title = wikiResponse.query.search[j].title;
      var url = title.replace(/\s/g, "_");
      var snippet = wikiResponse.query.search[j].snippet;
      $(".wiki_title_" + j + "").html("<a href='https://en.wikipedia.org/wiki/" + url + "' target='_blank'>" + title + "</a>");
      $(".wiki_snippet_" + j + "").html(snippet);
    }

  }

  //Show results when clicking Search button
  $('.after_search_container span').click(function() {
    if ($('#after_search').val() == "") {
      alert('Please enter a keyword to search');
    } else {
      var keyword = $('#after_search').val();
      getresults(keyword);
    }
  });

});