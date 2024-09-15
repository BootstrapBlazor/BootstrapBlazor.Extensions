export async function AutoScrollTextarea(txb) {
    txb.scrollTop = txb.scrollHeight;
}
export async function AutoScrollTextareaByID(id) {
    var txb = document.getElementById(id);
    txb.scrollTop = txb.scrollHeight;
}
