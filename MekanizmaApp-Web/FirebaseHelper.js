var firebaseConfig = {
    apiKey: "AIzaSyBY08nzwcZlQ47b6JnWByFe1Q3PAim4kkA",
    authDomain: "mekanizmaapp.firebaseapp.com",
    databaseURL: "https://mekanizmaapp.firebaseio.com",
    projectId: "mekanizmaapp",
    storageBucket: "",
    messagingSenderId: "579842797161",
    appId: "1:579842797161:web:92040041c344b219a4fcf8",
    measurementId: "G-M6JVLG02DL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

db = firebase.database();

function veriSil(key){
	db.ref("items/"+key).set(null);
}

function veriEkle(){
  
	var key = db.ref().child("items").push().key;

	var veri={
		"key":key,
		"videoUrl":document.getElementsByName("frm_videourl")[0].value,
		"videoTitle":document.getElementsByName("frm_videotitle")[0].value,
		"videoCategory":document.getElementsByName("videoCategory")[0].value,
		"videoDetails":document.getElementsByName("frm_videodetail")[0].value,
		"videoLabel":document.getElementsByName("frm_videolabel")[0].value
	};
    
    db.ref("items/"+key).set(veri);

}

function veriGuncelle(key) {
	var veri={
		"key":key,
		"videoUrl":document.getElementsByName("frm_videourl")[0].value,
		"videoTitle":document.getElementsByName("frm_videotitle")[0].value,
		"videoCategory":document.getElementsByName("videoCategory")[0].value,
		"videoDetails":document.getElementsByName("frm_videodetail")[0].value,
		"videoLabel":document.getElementsByName("frm_videolabel")[0].value
	};

	db.ref("items/"+key).set(veri);
}

var tbl=document.getElementById("myTable");

function Listener(){

var ref = db.ref("items");

ref.on('value',gotData,errData) 

	function gotData(data){
		
		tbl.innerHTML="";
		var sayac=1;
		data.forEach(element => {
			addRow(element,sayac++);
		});
	}

	function errData(err){
		console.log(err);
	}

}

function addRow(element,sayac){

		var tr = tbl.insertRow();

        var tdSira=tr.insertCell();
        var tdVideo=tr.insertCell();
        var tdVideoUrl=tr.insertCell();
		var tdVideoTitle=tr.insertCell();
		var tdVideoCategory=tr.insertCell();
		var tdVideoDetail=tr.insertCell();
		var tdVideoLabel=tr.insertCell();
		var tdConfig=tr.insertCell();
        
        tdSira.appendChild(document.createTextNode(sayac));
		tdVideo.innerHTML='<img src="img/iconfinder_youtube_64.png" alt="..." class="img-thumbnail" style="cursor: pointer;" data-toggle="modal" data-target="#playVideoModal">';
        tdVideoUrl.appendChild(document.createTextNode(element.val().videoUrl));
        tdVideoTitle.appendChild(document.createTextNode(element.val().videoTitle));
        tdVideoCategory.appendChild(document.createTextNode(element.val().videoCategory));
        tdVideoDetail.appendChild(document.createTextNode(element.val().videoDetails));
        tdVideoLabel.appendChild(document.createTextNode(element.val().videoLabel));
        //tdConfig.innerHTML='<button type="button" class="btn btn-danger">Danger</button>';
        tdConfig.innerHTML=
			'<button type="button" id="btnDel" class="btn btn-danger" onclick="veriSil(\''+element.val().key+'\')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>' +
			'<button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-btntitle="Update" data-title="Update Video" ' +
			'data-key=\''+element.val().key+'\' ' +
			'data-videourl=\''+element.val().videoUrl+'\' ' +
			'data-videotitle=\''+element.val().videoTitle+'\' ' +
			'data-videocategory=\''+element.val().videoCategory+'\' ' +
			'data-videolabel=\''+element.val().videoLabel+'\' ' +
			'data-videodetails=\''+element.val().videoDetails+'\'></button>';

        tr.appendChild(tdSira);
        tr.appendChild(tdVideo);
        tr.appendChild(tdVideoUrl);
		tr.appendChild(tdVideoTitle);
		tr.appendChild(tdVideoCategory);
		tr.appendChild(tdVideoDetail);
		tr.appendChild(tdVideoLabel);
		tr.appendChild(tdConfig);

		tbl.appendChild(tr);
}
