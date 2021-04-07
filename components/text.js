import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useLoader, useUpdate } from 'react-three-fiber'

export default function Text({ children, vAlign = 'center', hAlign = 'center', size = 1, color = 'white', ...props }) {
    const font = useLoader(THREE.FontLoader, '/CreditCard.json')
    const config = useMemo(
        () => ({ font, size: 2.5, height: 0, curveSegments: 1, bevelEnabled: false}),
        [font]
    )
    const mesh = useUpdate(
        (self) => {
            const size = new THREE.Vector3()
            self.geometry.computeBoundingBox()
            self.geometry.boundingBox.getSize(size)
            self.position.x = hAlign === 'center'
            self.position.y = vAlign === 'center'
        },
        [children]
    )
    return (
        <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
            <mesh ref={mesh}>
                <textBufferGeometry args={[children, config]} />
                <meshStandardMaterial />
            </mesh>
        </group>
    )
}
