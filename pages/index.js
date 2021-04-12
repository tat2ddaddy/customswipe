import {Suspense, useRef, useState} from 'react'
import {Canvas} from "react-three-fiber";
import Card from "../components/card";
import styles from '../styles/Home.module.css'
import Chip from "../components/chip";
import Text from "../components/text";

export default function Home() {

    const [ccNumber, setCCNumber] = useState('1234567890123456')
    const [name, setName] = useState('John Doe')
    const [exp, setExp] = useState('12/34')

    function changeCC(event) {
        event.preventDefault()
        const regex = /(\d{4})/g;
        const str = event.target.value;
        const subst = `$1 `;
        const result = str.replace(regex, subst);
        console.log(result)
        setCCNumber(result)
    }

    function changeName(event){
        event.preventDefault()
        setName(event.target.value)
    }

    function changeExp(event){
        event.preventDefault()
        const regex = /(\d{2})(\d{2})/g
        const str = event.target.value
        const subst = '$1' + '/' + '$2'
        const result = str.replace(regex, subst)
        console.log(result)
        setExp(result)
    }

    const ref = useRef()
    return (
        <div className={styles.container}>
            <Canvas>
                <ambientLight intensity={2}/>
                <pointLight position={[0, 0, 30]}/>
                <Suspense fallback={null}>
                    <group ref={ref}>
                        <Card position={[0, 0, 0]}/>
                        <Chip position={[-2.5, .5, 0]}/>
                        <Text size={2} hAlign='center' position={[-3.5, -1.5, 0]} children={ccNumber} />
                        <Text hAlign='center' position={[-3.4,-2.1,0]} children={name} />
                        <Text hAlign='center' position={[-1, -2.1 ,0]} children={exp} />
                    </group>
                </Suspense>
            </Canvas>
            <form className={styles.form}>
                <input onChange={changeCC} placeholder={ccNumber} maxLength='16' />
                <input onChange={changeName} placeholder={name} />
                <input onChange={changeExp} placeholder={exp} maxLength='4' />
            </form>
        </div>
    )
}
