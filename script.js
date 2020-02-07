document.addEventListener("click", function() {
  var newVideo = document.getElementById("videobackground");
  newVideo.play();
  init();
});

let scene, camera, renderer, cube;

var headlines = document.getElementById("headlines");
var links = headlines.getElementsByTagName("a");
var pics = document.getElementsByClassName("pic");
var buttons = document.getElementsByClassName("circlebutton");
var current = 0;
var currentlyTransitioning;
var anim;
var timer;

var left = headlines.offsetLeft;

moveHeadLines();
function moveHeadLines() {
  left--;
  if (left <= -links[0].offsetWidth) {
    left += links[0].offsetWidth;
    headlines.appendChild(links[0]);
  }
  headlines.style.left = left + "px";
  anim = requestAnimationFrame(moveHeadLines);
}
headlines.addEventListener("mouseenter", function() {
  cancelAnimationFrame(anim);
});

headlines.addEventListener("mouseleave", function() {
  moveHeadLines();
});

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  let size = 1;
  let size2 = 10;
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const geometry = new THREE.SphereGeometry(5, 100, 10);

  // const textureLoader = new THREE.TextureLoader();
  // textureLoader.crossOrigin = "Anonymous";
  // const texture = textureLoader.load(
  //   "https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg"
  // );

  var video = document.getElementById("videotexture");

  var texture = new THREE.VideoTexture(video);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;
  const material = new THREE.MeshBasicMaterial({ map: texture });
  cube = new THREE.Mesh(geometry, material);
  cube.position.y = 0;
  scene.add(cube);

  camera.position.z = 10;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);
