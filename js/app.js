import * as THREE from 'three';
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'
// import imagesLoaded from 'imagesLoaded';
// import FontFaceObserver from 'fontfaceobserver';
// import Scroll from './scroll';
// import fragment from "./shader/fragment.glsl";
// import vertex from "./shader/vertex.glsl";

import NormalMap from '../static/NormalMap.png'
import ON from '../img/ON.jpg'
// import pink from '../img/pink.png'
// import pyramidSAmerica from '../img/pyramidSAmerica.jpg'

// Texture Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('../static/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneGeometry( 2, 55, 55, 2);


// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.8
material.roughness =1
material.normalMap = normalTexture

material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.86, 1, -1, -1.65)
pointLight2.intensity = 10
scene.add(pointLight2)

const light1 = gui.addFolder('Light 1')
light1.add(pointLight2.position, 'x').min(-6).max(5).step(0.01)
light1.add(pointLight2.position, 'y').min(-5).max(5).step(0.01)
light1.add(pointLight2.position, 'z').min(-5).max(5).step(0.01)
light1.add(pointLight2, 'intensity').min(-5).max(5).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

// Light 3
const light3 = gui.addFolder('Light 3')
const pointLight3 = new THREE.PointLight(0xe1ff, 2)
pointLight3.position.set(-1.86, 1, -1, -1.65)
pointLight3.intensity = 10
scene.add(pointLight3)

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper3)

const light3Color = {
  color: 0xff0000
}

light3.addColor(light3Color, 'color').onChange(() => {
  pointLight3.color.set(light3Color.color)
})

light3.add(pointLight3.position, 'x').min(-6).max(5).step(0.01)
light3.add(pointLight3.position, 'y').min(-5).max(5).step(0.01)
light3.add(pointLight3.position, 'z').min(-5).max(5).step(0.01)
light3.add(pointLight3, 'intensity').min(-5).max(5).step(0.01)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)


// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowX)
  mouseY = (event.clientY - windowY)
}

const updateSphere = (event) => {
  sphere.position.y = window.scrollY * .001
}
window.addEventListener('scroll', updateSphere)



const clock = new THREE.Clock()
const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .05 * (targetX - sphere.rotation.y)
    
    // sphere.position.z += -.002 * (targetY - sphere.position.y)
    
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()