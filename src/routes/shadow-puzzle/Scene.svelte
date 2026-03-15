<script lang="ts">
	import { T } from "@threlte/core";
	import { TransformControls } from "@threlte/extras";
</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
/>

<T.DirectionalLight position={[30, -10, 10]} castShadow />
<TransformControls position.z={1} position.x={2} mode="rotate">
	<T.Mesh castShadow>
		<T.BoxGeometry args={[1, 2, 1]} />
		<T.MeshStandardMaterial color="hotpink" />
	</T.Mesh>
</TransformControls>
<T.Mesh receiveShadow>
	<T.CircleGeometry args={[4, 40]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh>
