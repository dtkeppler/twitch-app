$(document).ready( function() {

    // var $submit = $("#submit");
    var $results = $('.results');
    var $all = $('#all');
    var $online = $('#online');
    var $offline = $('#offline');
    var userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "Pooch3255"];
    var $allDivs = [];
    var $window = $(window);
     
     userNames.forEach(function(user) {
              
      $.getJSON('https://wind-bow.gomix.me/twitch-api/users/' + user + '?callback=?', function(data) {

           if (data.logo != null) {
             var $userLogo = $('<img src="' + data.logo + '" alt="logo" class="user-logo" />');
           } else {
             var $userLogo = $('<img src="http://www.premiersystemsinc.com/wp-content/uploads/2014/01/no-logo-available.gif" alt="logo" class="user-logo" />');
           }
        
        $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?', function(data) {
         
         var $userDiv = $('<div class="col-lg-12 user-div"></div>');
          // ISSUE: $userData is getting the username here
         var $userData = $('<div class="user-data"></div>')
         $userDiv.append($userLogo).append($userData)
         
         // console.log(data);
          
         var $userStatus = ('<p class="user-status"></p>');
     
         if (data.stream) {  
           
           var $statusFull = data.stream.channel.status;
           // truncate status length for narrower windows
           var $statusShort = $.trim($statusFull).substring(0, 25).split(" ").slice(0, -1).join(" ") + "...";            

           function checkWidth() {
             var $windowSize = $window.width();
             // console.log($windowSize);
             
             if ($windowSize > 800) {
               $userData.html('<a href="https://www.twitch.tv/' + user + '" target="_blank"><h3 class="user-name">' + user + '</h3></a><p class="user-status">' + $statusFull + '</p>');
             } else {
               $userData.html('<p>' + $statusShort + '</p>');
             } // end if/else width

           } // end checkWidth()
           
           $userDiv.addClass("online");
           $results.prepend($userDiv);
           
           checkWidth()
           $(window).resize(checkWidth)
        
          } else {
   
            var $userStatus = $('<a href="https://www.twitch.tv/' + user + '" target="_blank"><h3 class="user-name">' + user + '</h3></a><p class="user-status">Offline</p>')
            $userDiv.addClass("offline");
            $userData.append($userStatus);
            $results.append($userDiv);
            
          } // end if-else
          
          $allDivs.push($userDiv);
          
       });  // end get-streams
      });  // end get-users
       

     }); // end forEach user

   // buttons
  
    $online.click(function() {
      $results.empty();
      $.each($allDivs, function(index, div) {
        if (div.hasClass("online")) {
          $results.append(div);
        }
      });
    });
  
    $offline.click(function() {
      $results.empty();
      $.each($allDivs, function(index, div) {
        if (div.hasClass("offline")) {
          $results.append(div);
        }
      });
    });
  
    $all.click(function() {
      $results.empty();
      $.each($allDivs, function(index, div) {
        console.log(div);
        if (div.hasClass('online')) {
          $results.prepend(div);
        } else {
          $results.append(div);
        }
        // $results.append(div);
      });
    });
  
});  // end doc ready