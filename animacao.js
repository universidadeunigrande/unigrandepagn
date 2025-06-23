// Função para carregar e renderizar um modelo 3D em um container com iluminação personalizada
function loadModel(containerId, modelPath, lightConfig) {
    const container = document.getElementById(containerId);

    // Configuração básica da cena Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

    // Adicionando o fundo transparente ao renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement); // Anexa o renderer ao container
    

    // Configurando luz ambiente com parâmetros personalizados
    const ambientLight = new THREE.AmbientLight(lightConfig.ambientColor, lightConfig.ambientIntensity); // Luz ambiente personalizada
    scene.add(ambientLight);

    // Luz direcional personalizada
    const directionalLight = new THREE.DirectionalLight(lightConfig.directionalColor, lightConfig.directionalIntensity);
    directionalLight.position.set(...lightConfig.directionalPosition); // Posição da luz direcional personalizada
    scene.add(directionalLight);

    // Carregar o modelo 3D (GLTF format)
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function (gltf) {
        const model = gltf.scene;

        model.position.set(0, -0.5, 0);  // Centralizar o modelo
        model.scale.set(1.5, 1.5, 1.5);  // Ajustar a escala do modelo, se necessário
        model.rotation.y = Math.PI;  // Rotaciona o modelo 180 graus no eixo Y para que fique de frente para a câmera
        scene.add(model);
        

        // Função de animação
        function animate() {
            requestAnimationFrame(animate);
            model.rotation.y += 0.01; // Rotaciona lentamente o modelo
            renderer.render(scene, camera);
        }
        animate(); // Chama a função de animação
    }, undefined, function (error) {
        console.error('Erro ao carregar o modelo:', error);
    });

    // Posicionando a câmera
    camera.position.set(0, 1, 2);  // Posição inicial da câmera (mais perto do modelo)
    camera.lookAt(0, -0.5, 0);     // Direcionar a câmera para o centro do modelo

    // Configurando os controles de órbita
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;  // Ativar o zoom
    controls.minDistance = 1;    // Distância mínima do zoom
    controls.maxDistance = 10;   // Distância máxima do zoom

    // Ajuste da tela quando a janela é redimensionada
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

// Configuração de iluminação para o Ectomorfo
const ectoLightConfig = {
    ambientColor: 0xffffff, 
    ambientIntensity: 0.6,
    directionalColor: 0xffffff, 
    directionalIntensity: 1,
    directionalPosition: [5, 10, 7.5]
};

// Configuração de iluminação para o Mesomorfo (mais intensa, por exemplo)
const mesoLightConfig = {
    ambientColor: 0xffffff,      // Luz ambiente branca
    ambientIntensity: 0.9,       // Reduzindo a intensidade da luz ambiente para dar mais destaque à luz direcional
    directionalColor: 0xffffff,  // Luz direcional com tom amarelado suave (mais quente)
    directionalIntensity: 1,   // Aumentando a intensidade da luz direcional para iluminar mais o modelo
    directionalPosition: [0, 10, 10]  // Ajustando a posição da luz para iluminar de cima e da frente
};



// Configuração de iluminação para o Endomorfo
const endoLightConfig = {
    ambientColor: 0xffffff, 
    ambientIntensity: 0.6,
    directionalColor: 0xffffff, 
    directionalIntensity: 1,
    directionalPosition: [5, 10, 7.5]
};

// Carregar e renderizar o modelo Ectomorfo com sua iluminação
loadModel('ecto-container', 'ecto.glb', ectoLightConfig);

// Carregar e renderizar o modelo Mesomorfo com iluminação personalizada
loadModel('meso-container', 'meso.glb', mesoLightConfig);

// Carregar e renderizar o modelo Endomorfo com sua iluminação
loadModel('endomorfo-container', 'endomorfo1.glb', endoLightConfig);
