<script lang="ts">
	import { T } from "@threlte/core";
	import { TransformControls } from "@threlte/extras";
	import { Shape } from "three";

	const x = 0,
		y = 0;
	const extrudeSettings = {
		depth: 0.1,
		bevelEnabled: true,
		bevelSegments: 2,
		steps: 2,
		bevelSize: 0.1,
		bevelThickness: 0.1
	};
	const fishShape = new Shape()
		.moveTo(x, y)
		.quadraticCurveTo(x + 0.5, y - 0.8, x + 0.9, y - 0.1)
		.quadraticCurveTo(x + 1, y - 0.1, x + 1.15, y - 0.4)
		.quadraticCurveTo(x + 1.15, y, x + 1.15, y + 0.4)
		.quadraticCurveTo(x + 1, y + 0.1, x + 0.9, y + 0.1)
		.quadraticCurveTo(x + 0.5, y + 0.8, x, y);
</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
/>

<T.SpotLight
	decay={0}
	angle={Math.PI / 8}
	penumbra={1}
	color="#fff"
	position={[5, -2, 4]}
	castShadow
	intensity={3}
/>
<TransformControls position.z={1} position.x={1} mode="rotate">
	<T.Mesh castShadow rotation={[1, 1, 1]}>
		<!-- <T.BoxGeometry args={[1, 2, 1]} /> -->
		<T.ExtrudeGeometry args={[fishShape, extrudeSettings]} />

		<T.MeshStandardMaterial color="hotpink" />
	</T.Mesh>
</TransformControls>
<T.Mesh receiveShadow position.y={1.5}>
	<T.CircleGeometry args={[40, 40]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh>
