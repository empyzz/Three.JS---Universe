import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import getStarfield from './starfield';

const stats = Stats();
document.body.appendChild(stats.dom);

const w = window.innerWidth;
const h = window.innerHeight;
const aspect = w / h;
const fov = 75;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera( fov, aspect, near, far);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( w, h);
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const controls = new OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 1, 5, 5 );
controls.update();

const terra_grupo = new THREE.Group()
terra_grupo.rotation.z = -23.4 * Math.PI / 180

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12)
const material = new THREE.MeshStandardMaterial( {
     map: loader.load("/8k_earth_daymap.jpg"),     
    } );
const terra = new THREE.Mesh( geometry, material );
scene.add( terra );

const dirlight = new THREE.DirectionalLight(0xffffff);
scene.add(dirlight);
dirlight.position.set(-2, 0.5, 1.5);

const stars = getStarfield({numstars: 5000});
scene.add(stars)

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    terra.rotation.y += 0.002;
	renderer.render( scene, camera );
    stats.update();
}
animate()