import React from 'react'
import { BsClipboard, BsClipboardCheck } from "react-icons/bs"

function Clipboard({ privateCopy, setPrivateCopy }) {
    return (
        <div style={{ cursor: "pointer" }}>
            <span onClick={() => setPrivateCopy(!privateCopy)
            }>{!privateCopy ? <BsClipboard /> : <BsClipboardCheck />}</span>
        </div>
    )
}

export default Clipboard