function rot13(message) {
    return message.replace(/[a-z]/gi, letter => String.fromCharCode(letter.charCodeAt(0) + (letter.toLowerCase() <= 'm' ? 13 : -13)));
}

function onClick() {
    window.location.href = rot13("uggcf://hf02jro.mbbz.hf/w/83552737281?cjq=Cqiu2bxmR5zzPbdAiI6WkZs7w6CESJ.1");
}
