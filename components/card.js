import {useFrame} from "react-three-fiber";
import {useRef} from "react";

export default function Card(props) {
    const mesh = useRef()
    useFrame(() => mesh.current.rotation.x += 0)

    return (
        <mesh
            {...props}
            ref={mesh}>
            <planeBufferGeometry attach='geometry' args={[9.5, 5.4]} />
            <meshStandardMaterial attach='material' color='black' />
        </mesh>
    )
}
