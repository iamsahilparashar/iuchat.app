import React from 'react'
import reactEmoji from 'react-emoji'
import './Message.css'

const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }
    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="message pr-10"> <strong>{trimmedName} : </strong>{reactEmoji.emojify(text)}</p>
                </div>
            ) :
            (
                <div className="messageContainer justifyStart">
                    <p className="message pr-10"> <strong>{user} : </strong>{reactEmoji.emojify(text)}</p>
                </div>
            )
    )
}

export default Message;
