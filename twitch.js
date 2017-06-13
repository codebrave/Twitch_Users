

$(document).ready(function(){
// https://wind-bow.gomix.me/twitch-api is
// used for bypassing Twitch's API from
// Free Code Camp without the use of client
// IDs.
  var ul="https://wind-bow.gomix.me/twitch-api/streams/freecodecamp/?callback=?";
// usr, and logo are used for storing user
// names and logo links.
  var usr= [];
  var logo=[];
// This is for adding more Twitch user names.
  var adusr=["ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb"];
// This is for adding user names that have
// been deleted or not found.
  var dusr=["mbrunofin","comster404"];
// This is for adding picture logo links 
// to each respective user names.
  var adlg={"ESL_SC2":
            "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_image-d6db9488cec97125-300x300.jpeg",
            "OgamingSC2":
            "https://static-cdn.jtvnw.net/jtv_user_pictures/ogamingsc2-profile_image-9021dccf9399929e-300x300.jpeg",
            "cretetion":
            "https://static-cdn.jtvnw.net/jtv_user_pictures/cretetion-profile_image-12bae34d9765f222-300x300.jpeg",
            "storbeck":
            "https://static-cdn.jtvnw.net/jtv_user_pictures/storbeck-profile_image-7ab13c2f781b601d-300x300.jpeg",
            "habathcx":
            "https://static-cdn.jtvnw.net/jtv_user_pictures/habathcx-profile_image-d75385dbe4f42a66-300x300.jpeg",
            "RobotCaleb":
            "https://static-cdn.jtvnw.net/jtv_user_pictures/robotcaleb-profile_image-9422645f2f0f093c-300x300.png",
  };
/* This function will basically get the
   JSON data and tell if Free Code Camp
   is online or offline linking to their
   Twitch stream website.
*/  
  $.getJSON(ul).done(function(d){
    if(d.stream===null) {
      $("#fstatus").html("<a href='https://www.twitch.tv/freecodecamp' target='_blank'>Free Code Camp OFFLINE</a>")
    } // end of if
    
    else {
      $("fstatus").html("<a href='https://www.twitch.tv/freecodecamp' target='_blank'>Free Code Camp is ONLINE</a>")
    } // end of else
    
  }); // end of $.getJSON

/* This function will get the user names that
   Free Code Camp follows and the logo links
   and user names will be pushed into the
   array memory.
*/  
  ul="https://wind-bow.gomix.me/twitch-api/users/freecodecamp/follows/channels/?callback=?";

  $.getJSON(ul,function(d){
    console.log(ul);
    // Push the user name and linked logo to
    // the memory in a for loop.
    for(var i=0;i<d.follows.length;i++) {

      var dn=d.follows[i].channel.display_name;
      var l=d.follows[i].channel.logo;
      usr.push(dn);
      logo.push(l);
    
    } // end of for loop
    
    // Push the added user name and logo
    // link into memory in a for loop.
    for (var i=0;i<adusr.length;i++){
      usr.push(adusr[i]);
      logo.push(adlg[adusr[i]]);
    } // end of for loop
    
    // For the online status.
    var s;
   
    // .forEach is equivalent to a for loop
    // but with using usr's array. Each user
    // name from the array will be sent and
    // output JSON data of the online status.
    usr.forEach(function(usrd){
      var lk='https://wind-bow.gomix.me/twitch-api/streams/'+usrd+'/?callback=?';
      console.log(usrd);
      var j=usr.indexOf(usrd);
 /*$.when converts the .getJSON into a
   Deferred object and this function will
   display the text box of each user name
   with their logos and online status.
 */     
      $.when($.getJSON(lk)).done(function(da){
        console.log(j);

        // If da.stream is null, the Twitch
        // user name is offline.
        if(da.stream===null){
          s="Offline";
        }
        // Otherwise, that user name is 
        // online.
        else{
          s=da.stream.channel.status;

        } 
        // If the Twitch user name has no
        // logo, then the logo will not be
        // displayed with the online status
        // and user name.
        if(logo[j]===null){
          $("#info").append("<div class='row us'>"
          +"<div class='col-xs-4'><h3>No " 
          +"Logo</h3></div><div class='col-xs-4'>"
          +"<h3>"+usrd+"</h3></div><div class='col-xs-4'>"
          +"<h3>"+s+"</h3></div></div>");

        } // end of if
        
        // Otherwise, the logo will be 
        // displayed with the online status
        // and user name.
        else {
          $("#info").append("<div class='row us'>"
          +"<div class='col-xs-4'><img src='"
          +logo[j]+"'class='pic'></div><div class='col-xs-4 lts'>"
          +"<h3>"+usrd+"</h3></div><div class='col-xs-4 lts'>"
          +"<h3>"+s+"</h3></div></div>");
        } // end of else
        
     }); // end of $.when
   }); // end of forEach
    
   /* This function will get the JSON data
      and check if the user name's account
      got closed or is not found.
   */ 
   dusr.forEach(function(dur){
     var lk='https://wind-bow.gomix.me/twitch-api/channels/'+dur+'/?callback=?'; 
     $.when($.getJSON(lk)).then(function(dl){
       // If there is an error, then the 
       // user name is not found or the account
       // is closed.
       if(dl.error){
         $("#info").append("<div class='row us'>"
         +"<div class='col-xs-4'><h3>No Logo"
         +"</h3></div><div class='col-xs-4'>"
         +"<h3>"+dur+"</h3></div><div class='col-xs-4'>"
         +"<h3>Not Found</h3></div></div>");

      } // end of if
    }); //end of $.when
     
   }); // end of .forEach
  }); // end of $.getJSON
 
}); //end of $(document).ready

