import { Grid, GridItem } from '@chakra-ui/react';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { useEffect } from 'react';
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import BackgroundImage from '../../assets/images/background_main.webp';

import { ConentBox } from '../CommonItem';

export default function App() {
  //const matches = useMediaQuery('(min-width:1060px)');
  useEffect(() => {
    // レンダラーの設定
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    //document.body.appendChild(renderer.domElement);
    console.log(document.getElementById('canvas')); //.appendChild(renderer.domElement);

    document.getElementById('canvas')?.appendChild(renderer.domElement);

    // カメラの設定
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.1, 3);

    /*
    // カメラコントーロールの設定
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0.85, 0)
    controls.screenSpacePanning = true
    controls.update()
*/

    // シーンの設定
    const scene = new THREE.Scene();

    // ライトの設定
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // グリッドを表示

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    gridHelper.visible = true;

    // 座標軸を表示
    /*
    const axesHelper = new THREE.AxesHelper(0.5)
    scene.add(axesHelper)
*/

    function loadVRM(modelUrl: any) {
      // モデルを読み込む処理
      const loader = new GLTFLoader(); // GLTFを読み込むLoader

      loader.register((parser) => new VRMLoaderPlugin(parser)); // GLTFLoaderにVRMLoaderPluginをインストール

      return loader.loadAsync(modelUrl).then((gltf) => {
        const vrm = gltf.userData.vrm; // VRMを制御するためのクラス `VRM` が `gltf.userData.vrm` に入っています
        //vrm.scene.rotation.y = Math.PI;
        //const boneNode = vrm.humanoid.getBoneNode(vrm.humanoid.getNormalizedBoneNode)
        VRMUtils.rotateVRM0(vrm);
        return vrm;
      });
    }

    let currentVRM: any = undefined; // 現在使用中のvrm、update内で使えるようにするため
    let currentMixer: any = undefined; // 現在使用中のAnimationMixer、update内で使えるようにするため
    const animationUrl =
      'https://cdn.glitch.me/16b81be8-1f14-4a44-b78f-c3f6da842ee7%2FGangnam%20Style.fbx?v=1636708670740'; // MixamoのアニメーションのURL
    const modelUrl =
      'https://cdn.glitch.me/c4e5cfb3-513e-4d82-a37f-62836378466b%2Fthree-vrm-girl-1.0-beta.vrm?v=1636610288920';
    //const animationUrl = '/animation/Capoeira.fbx';
    //const animationUrl = '/animation/Defeated.fbx';
    //const animationUrl = '/animation/Walking.fbx';

    loadVRM(modelUrl).then((vrm) => {
      // vrmを読み込む
      //'/Alicia_VRM/Alicia/VRM/AliciaSolid.vrm').then( ( vrm ) => { // vrmを読み込む
      //'/Alicia_VRM/Alicia/VRM/AliciaSolid_mixamo.vrm').then( ( vrm ) => { // vrmを読み込む
      currentVRM = vrm; // currentGLTFにvrmを代入

      const head = vrm.humanoid.getNormalizedBoneNode('head'); // vrmの頭を参照する

      const HIPS = vrm.humanoid.getNormalizedBoneNode('hips'); // vrmの頭を参照する

      scene.add(vrm.scene); // モデルをsceneに追加し、表示できるようにする
      //console.log("HIPS");
      console.log(HIPS);
      //HIPS.rotateZ(Math.PI);

      camera.position.set(
        0.0,
        head.getWorldPosition(new THREE.Vector3()).y,
        6.0
      ); // カメラを頭が中心に来るように動かす

      currentMixer = new THREE.AnimationMixer(vrm.scene); // vrmのAnimationMixerを作る
      currentMixer.timeScale = 1;

      loadMixamoAnimation(animationUrl, vrm).then((clip) => {
        // アニメーションを読み込む
        currentMixer.clipAction(clip).play(); // アニメーションをMixerに適用してplay
      });
    });
    const mixamoVRMRigMap: any = {
      mixamorigHips: 'hips', //ok
      mixamorigSpine: 'spine', //ok
      mixamorigSpine1: 'chest', //ok
      mixamorigSpine2: 'upperChest', //ok
      mixamorigNeck: 'neck', //ok
      mixamorigHead: 'head', //ok
      mixamorigLeftShoulder: 'leftShoulder', //ok
      mixamorigLeftArm: 'leftUpperArm', //ok
      mixamorigLeftForeArm: 'leftLowerArm', //ok
      mixamorigLeftHand: 'leftHand',
      mixamorigLeftHandThumb1: 'leftThumbProximal',
      mixamorigLeftHandThumb2: 'leftThumbIntermediate',
      mixamorigLeftHandThumb3: 'leftThumbDistal',
      mixamorigLeftHandIndex1: 'leftIndexProximal',
      mixamorigLeftHandIndex2: 'leftIndexIntermediate',
      mixamorigLeftHandIndex3: 'leftIndexDistal',
      mixamorigLeftHandMiddle1: 'leftMiddleProximal',
      mixamorigLeftHandMiddle2: 'leftMiddleIntermediate',
      mixamorigLeftHandMiddle3: 'leftMiddleDistal',
      mixamorigLeftHandRing1: 'leftRingProximal',
      mixamorigLeftHandRing2: 'leftRingIntermediate',
      mixamorigLeftHandRing3: 'leftRingDistal',
      mixamorigLeftHandPinky1: 'leftLittleProximal',
      mixamorigLeftHandPinky2: 'leftLittleIntermediate',
      mixamorigLeftHandPinky3: 'leftLittleDistal',
      mixamorigRightShoulder: 'rightShoulder', //ok
      mixamorigRightArm: 'rightUpperArm', //ok
      mixamorigRightForeArm: 'rightLowerArm', //ok
      mixamorigRightHand: 'rightHand', //ok
      mixamorigRightHandPinky1: 'rightLittleProximal',
      mixamorigRightHandPinky2: 'rightLittleIntermediate',
      mixamorigRightHandPinky3: 'rightLittleDistal',
      mixamorigRightHandRing1: 'rightRingProximal',
      mixamorigRightHandRing2: 'rightRingIntermediate',
      mixamorigRightHandRing3: 'rightRingDistal',
      mixamorigRightHandMiddle1: 'rightMiddleProximal',
      mixamorigRightHandMiddle2: 'rightMiddleIntermediate',
      mixamorigRightHandMiddle3: 'rightMiddleDistal',
      mixamorigRightHandIndex1: 'rightIndexProximal', //ok
      mixamorigRightHandIndex2: 'rightIndexIntermediate', //ok
      mixamorigRightHandIndex3: 'rightIndexDistal',
      mixamorigRightHandThumb1: 'rightThumbProximal',
      mixamorigRightHandThumb2: 'rightThumbIntermediate',
      mixamorigRightHandThumb3: 'rightThumbDistal',
      mixamorigLeftUpLeg: 'leftUpperLeg',
      mixamorigLeftLeg: 'leftLowerLeg',
      mixamorigLeftFoot: 'leftFoot',
      mixamorigLeftToeBase: 'leftToes',
      mixamorigRightUpLeg: 'rightUpperLeg',
      mixamorigRightLeg: 'rightLowerLeg',
      mixamorigRightFoot: 'rightFoot',
      mixamorigRightToeBase: 'rightToes',
    };

    function loadMixamoAnimation(url: any, vrm: any) {
      const loader = new FBXLoader(); // FBXを読み込むLoader
      return loader.loadAsync(url).then((asset) => {
        const clip = THREE.AnimationClip.findByName(
          asset.animations,
          'mixamo.com'
        ); // AnimationClipを抽出する

        const tracks: any = []; // VRM用のKeyframeTrackをこの配列に格納する

        const restRotationInverse = new THREE.Quaternion();
        const parentRestWorldRotation = new THREE.Quaternion();
        const _quatA = new THREE.Quaternion();

        clip.tracks.forEach((track) => {
          // Convert each tracks for VRM use, and push to `tracks`
          const trackSplitted = track.name.split('.');
          const mixamoRigName = trackSplitted[0];
          const vrmBoneName = mixamoVRMRigMap[mixamoRigName];
          const vrmNodeName =
            vrm.humanoid?.getNormalizedBoneNode(vrmBoneName)?.name;
          const mixamoRigNode: any = asset.getObjectByName(mixamoRigName);

          if (vrmNodeName != null) {
            const propertyName = trackSplitted[1];

            // Store rotations of rest-pose.
            mixamoRigNode.getWorldQuaternion(restRotationInverse).invert();
            mixamoRigNode.parent.getWorldQuaternion(parentRestWorldRotation);

            if (track instanceof THREE.QuaternionKeyframeTrack) {
              // Retarget rotation of mixamoRig to NormalizedBone.
              for (let i = 0; i < track.values.length; i += 4) {
                const flatQuaternion = track.values.slice(i, i + 4);

                _quatA.fromArray(flatQuaternion);

                // 親のレスト時ワールド回転 * トラックの回転 * レスト時ワールド回転の逆
                _quatA
                  .premultiply(parentRestWorldRotation)
                  .multiply(restRotationInverse);

                _quatA.toArray(flatQuaternion);

                flatQuaternion.forEach((v, index) => {
                  track.values[index + i] = v;
                });
              }

              tracks.push(
                new THREE.KeyframeTrack(
                  `${vrmNodeName}.${propertyName}`,
                  track.times,
                  track.values.map((v, i) =>
                    vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v
                  )
                )
              );
            } else if (track instanceof THREE.VectorKeyframeTrack) {
              const nodeName = vrmNodeName;
              const value = track.values.map(
                (v, i) =>
                  (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) * 0.01
              );

              tracks.push(
                new THREE.KeyframeTrack(
                  `${nodeName}.${propertyName}`,
                  track.times,
                  value
                )
              );
            }
          }
        });

        return new THREE.AnimationClip('vrmAnimation', clip.duration, tracks);
      });
    }

    const clock = new THREE.Clock();
    clock.start();
    function update() {
      requestAnimationFrame(update);

      const delta = clock.getDelta(); // 前フレームとの差分時間を取得

      if (currentMixer) {
        // アニメーションが読み込まれていれば
        currentMixer.update(delta); // アニメーションをアップデート
      }

      if (currentVRM) {
        // VRMが読み込まれていれば
        currentVRM.update(delta); // VRMの各コンポーネントを更新
      }

      renderer.render(scene, camera); // 描画
    }
    update();
  });

  return (
    <>
      <ConentBox></ConentBox>
      <ConentBox>
        <Grid
          templateColumns="repeat(10, 1fr)"
          gap={8}
          style={{ maxWidth: '1280px', maxHeight: '400px', margin: 'auto' }}
        >
          <GridItem
            colSpan={10}
            style={{
              backgroundColor: `url(${BackgroundImage})`,
            }}
            id="canvas"
          ></GridItem>
        </Grid>
      </ConentBox>
    </>
  );
}
