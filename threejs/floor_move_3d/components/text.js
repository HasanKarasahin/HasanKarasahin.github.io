function add2dText(props){
	THREE.Cache.enabled = true;
    	/////// draw text on canvas /////////

	// create a canvas element
	var canvas1 = document.createElement('canvas');
	var context1 = canvas1.getContext('2d');
	context1.font = "Bold 30px Arial";
	context1.fillStyle = "rgba(255,0,0,0.95)";
    context1.fillText(props.text, 0, 70);

	// canvas contents will be used for a texture
	var texture1 = new THREE.Texture(canvas1)
	texture1.needsUpdate = true;

    var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
    material1.transparent = true;

    var mesh1 = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas1.width, canvas1.height),
        material1
      );
	mesh1.position.set(0,60,20);
	mesh1.rotation.set(0,20,0);
	scene.add( mesh1 );

	/////// draw image on canvas /////////
}
