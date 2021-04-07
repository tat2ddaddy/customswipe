import {useFrame} from "react-three-fiber";
import {useRef} from "react";

export default function Chip(props) {
    const mesh = useRef()
    useFrame(() => mesh.current)

    return (
        <mesh
            {...props}
            ref={mesh}>
            <planeBufferGeometry attach='geometry' args={[1, .66]} />
            <meshStandardMaterial attach='material' color={0x8b7900} />
        </mesh>
    )
}