

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

    var manager = new THREE.LoadingManager();
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

    };

    manager.onLoad = function ( ) {

        console.log( 'Loading complete!');



    };


    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

    };

    manager.onError = function ( url ) {

        console.log( 'There was an error loading ' + url );

    };

            var loader = new THREE.GLTFLoader(manager);
            loader.load( 'model/'+props.source+'/scene.gltf',
                function ( gltf ) {
                    model = gltf.scene.children[0];
                    model.position.x = props.coordinates.x;
                    model.position.y = props.coordinates.y;
                    model.position.z = props.coordinates.z;

                    if(props.rotations){
                        model.rotation.x += props.rotations.x;
                        model.rotation.y += props.rotations.y;
                        model.rotation.z += props.rotations.z;
                    }

                    model.traverse(n =>{
                            if(n.isMesh){
                                n.castShadow = true;
                                n.receiveShadow = true;
                                if(n.material.map) n.material.map.anisotropy = 16
                            }
                        });
                    scene.add(model);
                    animate();
                }, (xhr) => xhr, ( err ) => console.error( err ));


}
