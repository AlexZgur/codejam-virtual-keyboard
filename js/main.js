let lat = true;
let caps = false;
let keys = [];

function newElement(eTag, eClass, eParent) {
    let element = document.createElement(eTag);
    if (eClass) element.className = eClass;
    if (eParent) eParent.appendChild(element);
    return element;
}

const keysLayout = {
    'Backquote': ["`", "~", "ё", "Ё"],
    'Digit1': ["1", "!"],
    'Digit2': ["2", "", "2", ""],
    'Digit3': ["3", "", "3", ""],
    'Digit4': ["4", "", "4", ""],
    'Digit5': ["5", ""],
    'Digit6': ["6", "", "6", ""],
    'Digit7': ["7", "", "7", ""],
    'Digit8': ["8", ""],
    'Digit9': ["9", ""],
    'Digit0': ["0", ""],
    'Minus': ["-", ""],
    'Equal': ["=", ""],
    'Backspace': [],
    'Tab': [],
    'KeyQ': ["q", , ""],
    'KeyW': ["w", "", "", ""],
    'KeyE': ["e", "", "", ""],
    'KeyR': ["r", "", "", ""],
    'KeyT': ["t", "", "", ""],
    'KeyY': ["y", "", "", ""],
    'KeyU': ["u", "", "", ""],
    'KeyI': ["i", "", "", ""],
    'KeyO': ["o", "", "", ""],
    'KeyP': ["p", "", "", ""],
    'BracketLeft': ["[", "", "", ""],
    'BracketRight': ["]", "", "", ""],
    'Backslash': ["\\", "", "", ""],
    'CapsLock': [],
    'KeyA': ["a", "", "", ""],
    'KeyS': ["s", "", "", ""],
    'KeyD': ["d", "", "", ""],
    'KeyF': ["f", "", "", ""],
    'KeyG': ["g", "", "", ""],
    'KeyH': ["h", "", "", ""],
    'KeyJ': ["j", "", "", ""],
    'KeyK': ["k", "", "", ""],
    'KeyL': ["l", "", "", ""],
    'Semicolon': [";", "", "", ""],
    'Quote': ["\'", "", "", ""],
    'Enter': [],
    'ShiftLeft': ["Shift"],
    'KeyZ': ["z", "", "", ""],
    'KeyX': ["x", "", "", ""],
    'KeyC': ["c", "", "", ""],
    'KeyV': ["v", "", "", ""],
    'KeyB': ["b", "", "", ""],
    'KeyN': ["n", "", "", ""],
    'KeyM': ["m", "", "", ""],
    'Comma': [",", "", "", ""],
    'Period': [".", "", "", ""],
    'Slash': ["/", "", "", ""],
    'ShiftRight': ["Shift"],
    'ControlLeft': ["Control"],
    'MetaLeft': ["Win"],
    'AltLeft': ["Alt"],
    'Space': [],
    'AltRight': ["Alt"],
    'ControlRight': ["Control"],
    'ArrowLeft': ["◄"],
    'ArrowUp': ["▲"],
    'ArrowDown': ["▼"],
    'ArrowRight': ["►"]
};

let wrapper = newElement('div', 'wrapper', document.body);
let memo = newElement('textarea', 'result', wrapper);
memo.cols = 100;
memo.rows = 10;
let keyboard = newElement('div', 'keyboard', wrapper);

for (const [key, value] of Object.entries(keysLayout)) {
    let keyElement = newElement('div', 'key ' + key, keyboard);
    if (['Backspace', 'CapsLock', 'Tab', 'Enter', 'ShiftRight', 'ShiftLeft'].includes(key)) keyElement.classList.add('key--wide');
    if (key == 'Space') keyElement.classList.add('key--xwide');
    keyElement.textContent = value.length > 0 ? value[0] : key;
    if (['Backspace', 'Backslash', 'Enter', 'ShiftRight'].includes(key)) newElement('br', null, keyboard);
}

document.body.onkeydown = document.body.onkeyup = document.body.onkeypress = handle;

function handle(e) {

    let text = e.key;
    // let text = e.type +
    //     ' key=' + e.key +
    //     ' code=' + e.code +
    //     (e.shiftKey ? ' shiftKey' : '') +
    //     (e.ctrlKey ? ' ctrlKey' : '') +
    //     (e.altKey ? ' altKey' : '') +
    //     (e.metaKey ? ' metaKey' : '') +
    //     (e.repeat ? ' (repeat)' : '') +
    //     "\n";

    if (e.type == 'keydown' &&
        !['Backspace', 'CapsLock', 'Alt', 'Tab', 'Enter', 'Shift', 'Meta', 'Control'].includes(e.key)) {
        memo.value += text;
    }

    let eventKeys = document.getElementsByClassName(e.code);
    if (eventKeys.length > 0) {
        if ((e.type == 'keydown' && !eventKeys[0].classList.contains('active')) ||
            (e.type == 'keyup' && eventKeys[0].classList.contains('active'))) {
            document.getElementsByClassName(e.code)[0].classList.toggle("active");
        }

    }
    e.preventDefault();
}