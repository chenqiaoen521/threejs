var Colors = {
  red: 0xf25346,
  white:0xd8d0d1,
  brown:0x59332e,
  pink:0xF5986E,
  brownDark:0x23190f,
  blue:0x68c3c0
}

window.addEventListener('load', init, false);

function init() {
  createScene();
  // add the lights
  createLights();
   // add the objects
  //createPlane();
  createSea();
  //createSky();
  // start a loop that will update the objects' positions 
  // and render the scene on each frame
  loop();
}

var scene,
        camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
        renderer, container;
function createScene() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  
  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 100;
  
  
  renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true 
  })
  
  renderer.setSize(WIDTH, HEIGHT);
  
  renderer.shadowMap.enabled = true;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  window.addEventListener('resize', handleWindowResize, false);
}


function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

var hemisphereLight, shadowLight;
 
function createLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;
  scene.add(hemisphereLight);  
  scene.add(shadowLight);
}

Sea = function(){
     
    // create the geometry (shape) of the cylinder;
    // the parameters are: 
    // radius top, radius bottom, height, number of segments on the radius, number of segments vertically
    var geom = new THREE.CylinderGeometry(600,600,800,40,10);
     
    // rotate the geometry on the x axis
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
     
    // create the material 
    var mat = new THREE.MeshPhongMaterial({
        color:Colors.blue,
        transparent:true,
        opacity:.6,
        shading:THREE.FlatShading,
    });
 
    // To create an object in Three.js, we have to create a mesh 
    // which is a combination of a geometry and some material
    this.mesh = new THREE.Mesh(geom, mat);
 
    // Allow the sea to receive shadows
    this.mesh.receiveShadow = true; 
}
 
// Instantiate the sea and add it to the scene:
 
var sea;
 
function createSea(){
    sea = new Sea();
 
    // push it a little bit at the bottom of the scene
    sea.mesh.position.y = -600;
 
    // add the mesh of the sea to the scene
    scene.add(sea.mesh);
    
    
}

function loop () {
  renderer.render(scene, camera);
  sea.mesh.rotation.z += .005;
  requestAnimationFrame(loop);
}
