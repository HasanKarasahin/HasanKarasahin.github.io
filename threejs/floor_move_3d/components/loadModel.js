

function loadModelFromGLFT(props){

    THREE.Cache.enabled = true;

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

                let modelPath = props.isModelOutDir?props.source+'.gltf':props.source+'/scene.gltf';
                //
                // console.log(modelPath);
                //

                //debugger


    props.coordinates.forEach((values,index)=>{
        new THREE.GLTFLoader().load('model/'+modelPath,result=>{

            model = result.scene;

            model.position.x = values.x;
            model.position.y = values.y;
            model.position.z = values.z;

            if(values.rotation){
                model.rotation.x += values.rotation.x;
                model.rotation.y += values.rotation.y;
                model.rotation.z += values.rotation.z;
            }


            model.traverse(n =>{
                if(n.isMesh){
                    n.castShadow = true;
                    n.receiveShadow = true;
                    if(n.material.map) n.material.map.anisotropy = 16
                    n.material = n.material.clone();
                }
            });
            scene.add(model);
        });
    });

}
