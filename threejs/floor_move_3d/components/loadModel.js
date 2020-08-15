

function loadModelFromGLFT(props){

    if(!hemiLight){
        hemiLight = new THREE.HemisphereLight(0xffeeb1, 0xCC0000, 4);
        scene.add(hemiLight);
    }

    if(!spotLight){
        spotLight = new THREE.SpotLight(0xffa95c,4);
        spotLight.castShadow = true;
        spotLight.shadow.bias = -0.0001;
        spotLight.shadow.mapSize.width = 1024*4;
        spotLight.shadow.mapSize.height = 1024*4;
        scene.add(spotLight);
    }

    if(!renderer){
        scene.add(new THREE.AxesHelper(500));

        renderer = new THREE.WebGLRenderer();
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 2.3;

        renderer.shadowMap.enabled = true;
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
    }

                let modelPath = !(props.isModelInDir)?'model/'+props.source+'/scene.gltf':props.source+'.gltf';
                //
                // console.log(modelPath);
                //


				new THREE.GLTFLoader().load(modelPath,result=>{
                    model = result.scene.children[0];
                    model.position.x = props.coordinates.x;
                    model.position.y = props.coordinates.y;
                    model.position.z = props.coordinates.z;
                    //model.setSize(90,90);
					model.traverse(n =>{
						if(n.isMesh){
							n.castShadow = true;
							n.receiveShadow = true;
							if(n.material.map) n.material.map.anisotropy = 16
						}
					});
					scene.add(model);
					//animate();
				});
}
