
var firebaseConfig = {
    apiKey: "AIzaSyDR_qs-_XEatcwe_B-Felmi6QZUOp00_-0",
    authDomain: "fuar-projesi.firebaseapp.com",
    databaseURL: "https://fuar-projesi.firebaseio.com",
    projectId: "fuar-projesi",
    storageBucket: "",
    messagingSenderId: "6046664841",
    appId: "1:6046664841:web:87fd4a5f6d46ce8b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

db = firebase.database();

function excelYukle(){
	
	Upload();	
}

function veriEkle(veri){
    
	var key = db.ref().child("veri").push().key;
    db.ref("veri/"+key).set(veri);	
    

    db.ref("veri/"+key+"/StandName").set(document.getElementById("frm_standname").value);
}

var tbl=document.getElementById("myTable");

function ogrenciListener(){

    var ref = db.ref("veri");
    ref.on('value',gotData,errData) 

    function gotData(data){
        
        tbl.innerHTML="";
		var sayac=1;
        data.forEach(element => {
            console.log(element.val());
            addRow(element,sayac++);
        });
    }

    function errData(err){
        console.log(err);
    }

}

function addRow(element,sayac){

	element.forEach(function(element1) {

		var tr = tbl.insertRow();

		var tdSira=tr.insertCell();
		var tdStandName=tr.insertCell();
        var tdKitapAdi=tr.insertCell();
        var tdYazarAdi=tr.insertCell();
        var tdYayinEvi=tr.insertCell();
        var tdFiyat=tr.insertCell();
		

		tdSira.appendChild(document.createTextNode(sayac));
        tdStandName.appendChild(document.createTextNode(element.val().StandName));
        tdKitapAdi.appendChild(document.createTextNode(element1.val().KitapAdi));
        tdYazarAdi.appendChild(document.createTextNode(element1.val().YazarAdi));
        tdYayinEvi.appendChild(document.createTextNode(element1.val().YayinEvi));
        tdFiyat.appendChild(document.createTextNode(element1.val().Fiyat));

		tr.appendChild(tdSira);
		tr.appendChild(tdStandName);
        tr.appendChild(tdKitapAdi);
        tr.appendChild(tdYazarAdi);
        tr.appendChild(tdYayinEvi);
        tr.appendChild(tdFiyat);

		tbl.appendChild(tr);
	});
}

 function Upload() {
        //Reference the FileUpload element.
        var fileUpload = document.getElementById("fileUpload");
 
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
			
				
                var reader = new FileReader();
 
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
					
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
						
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    };
    
	
	function ProcessExcel(data) {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
 
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];
 
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
		
		veriEkle(excelRows);

    };
