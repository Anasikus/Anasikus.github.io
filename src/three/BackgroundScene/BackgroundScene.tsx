import { Canvas } from "@react-three/fiber";

const BackgroundScene = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}
    >
      <ambientLight intensity={0.5} />

      <mesh>
        <sphereGeometry args={[1, 32, 32]} />

        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
};

export default BackgroundScene;