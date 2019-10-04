function valid() {
  var veri = ["frm_videourl", "frm_videotitle", "videoCategory", "frm_videodetail", "frm_videolabel"];
  var control = true;

  veri.forEach(function (element) {
    if (isEmpty(getDocumentToValue(element))) {
      alert("Boş alanlar mevcut!!");
      control = false;
      return;
    }
  });

  if (control) {

    if(window.key){
      veriGuncelle(window.key);
      //window.key=null;
    }else{
      veriEkle();
    }
  }
}

function isEmpty(str){
  return !str.replace(/\s+/, '').length;
}

function getDocumentToValue(name) {
  return document.getElementsByName(name)[0].value;
}

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var title = button.data('title') // Extract info from data-* attributes
  var btntitle = button.data('btntitle');

  var modal = $(this);

  if(button.data('videourl')){
    modal.find('#validationCustom01').val(button.data('videourl'));
    modal.find('#validationCustom02').val(button.data('videotitle'));
    modal.find('#validationCustom03').val(button.data('videocategory'));
    modal.find('#validationCustom04').val(button.data('videodetails'));
    modal.find('#validationCustom05').val(button.data('videolabel'));

    window.key = button.data('key');
  }else{
    window.key = null;
  }

  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

  modal.find('.modal-title').text(title);
  modal.find('#btntitle').text(btntitle);
  //modal.find('.modal-body input').val(recipient)
});


$('#playVideoModal').on('show.bs.modal', function (event) {
  document.getElementById("video").innerHTML = "<div id='player'></div>";

  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    //setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}