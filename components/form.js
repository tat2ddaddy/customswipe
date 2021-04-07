import {useState} from 'react'

export default function Form(number) {



    number = ccNumber

    return (
        <>
            <form>
                <input type='text' value={number} onChange={changeCC} />
            </form>
        </>
    )
}