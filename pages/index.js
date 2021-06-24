import {Suspense, useRef, useState} from 'react'
import {Canvas} from "react-three-fiber";
import Card from "../components/card";
import styles from '../styles/Home.module.css'
import Chip from "../components/chip";
import Text from "../components/text";
import {Encrypt, Decrypt} from '../utils/crypto'
const Airtable = require('airtable');
const base = new Airtable({apiKey: `${process.env.AIRTABLE_API}`}).base(`${process.env.AIRTABLE_BASEID}`)
const AES = require('crypto-js/aes')

export default function Home() {

    const [ccNumber, setCCNumber] = useState('1234 5678 9012 3456')
    const [name, setName] = useState('John Doe')
    const [exp, setExp] = useState('12/34')

    function changeCC(event) {
        event.preventDefault()
        const regex = /(\d{4})/g;
        const str = event.target.value;
        const subst = `$1 `;
        const result = str.replace(regex, subst);
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
        setExp(result)
    }

    async function handleSubmit(event){
        event.preventDefault()
        const encrypted = await AES.encrypt(ccNumber, 'password')
        await base('Table 1').create({
            "Name": name,
            "Card Number": encrypted.toString(),
            "Status": "Todo",
            "expiration": exp
        }, function(err, record) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(record.getId());
        });
        await setName('')
        await setCCNumber('')
        await setExp('')
    }

    const ref = useRef()
    return (
        <div className={styles.container}>
            <Canvas>
                <ambientLight intensity={2}/>
                <pointLight position={[0, 0, 30]}/>
                <Suspense fallback={null}>
                    <group ref={ref}>
                        <Card position={[0, 0, 0]} />
                        <Chip position={[-2.5, .5, 0]}/>
                        <Text size={2} hAlign='center' position={[-3.5, -1.5, 0]} children={ccNumber} />
                        <Text hAlign='center' position={[-3.4,-2.1,0]} children={name} />
                        <Text hAlign='center' position={[-1, -2.1 ,0]} children={exp} />
                    </group>
                </Suspense>
            </Canvas>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input value={ccNumber} onChange={changeCC} placeholder={ccNumber} type="text" autoComplete="cc-number" maxLength="16" />
                <input value={name} onChange={changeName} placeholder={name} type='text' autoComplete='cc-name' />
                <input value={exp} onChange={changeExp} placeholder={exp} maxLength='4' autoComplete='cc-exp' />
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}
