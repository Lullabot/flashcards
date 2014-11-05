$(document).ready(function(){
    $.ajax({
        url: 'https://www.lullabot.com/user-feed?callback=users',
        dataType: 'jsonp',
        success: function(result){
            intialize(result);
        }
    });
})

var userindex = 0;
var userlength = 0;
var users;
var metaShown = false;

function intialize(result){
  users = shuffle(result.users);
  userlength = users.length;
  //console.log(userlength);
  loadNextUser();
  $("#meta").hide();
  metaShown = false;
  
  // advance
  $("html").click(function(){
    if (metaShown) {
      $("#meta").hide();
      metaShown = false;
      loadNextUser();
    }
    else {
      $("#meta").show(0, function(){
        metaShown = true;
      });
    }
    
  });
  
  // stop link clicks from bubbling up the DOM and triggering advance
  $("a").click(function(event){
    event.stopPropagation();
  });
  
  // this has funny performance issues on slower connections:
  // preload(users);
  
}

function loadNextUser(){
  var thisUser = users[userindex].user;
  if (thisUser.field_bio_name == ""){
    nextUser();
    loadNextUser();
    //console.log('empty one!');
  }
  //console.log(thisUser);
  // @todo get bigger cropped images... or use full-size (field_bio_image) and resize
  $('#photo').html('<img src="'+ thisUser.field_bio_image_2 +'" height="300" />');
  $('#name').html('<a href="'+ thisUser.profile_link +'" target="X">'+ thisUser.field_bio_name + '</a>');
  $('#title').html(thisUser.field_bio_title);
  $('#location').html(thisUser.field_location);
  $('#since').html("'bot since: " + thisUser["Bot since"]);
  nextUser();
}

function nextUser(){
  userindex++;
  if (userindex == userlength) {
    userindex = 0;
  }
  // cache the next image
  (new Image()).src = users[userindex].user.field_bio_image_2;
}

function preload(users) {
  $(users).each(function(){
    (new Image()).src = this.user.field_bio_image_2;
    console.log(this.user.field_bio_image_2);
    // Alternatively you could use:
    // (new Image()).src = this;
  });
}

/**
 * Randomize an array
 */
function shuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};




/*
User object from lullabot.com: 

[Log] Object (main.js, line 31)
Bot since: "October 1, 2010"
Timezone: "America/New_York"
field_bio_image: "https://www.lullabot.com/sites/default/files/images/entry/MattKleve.jpg"
field_bio_image_1: "https://www.lullabot.com/sites/default/files/styles/200x200_crop_center/public/images/entry/MattKleve.jpg?itok=T8R_GbYQ"
field_bio_title: "Senior Developer"
field_location: "Gulf Breeze FL"
name: "mattk"
profile_link: "http://lullabot.com/user/29"
__proto__: Object
*/