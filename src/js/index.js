// Objetos, Variáveis e Arrays

const colors = [
    '#3498db', // Azul Claro
    'blue',
    '#2ecc71', // Verde Claro
    'green',
    '#f1c40f', // Amarelo
    '#f39c12', // Laranja
    'black',
    'white',
    'purple',
    'brown',
    'grey',
    '#ea2027' // Vermelho
]

const pencil = {
    position: {
        x: 0,
        y: 0,
    },
    color: 'black',
    pencilSize: 10,
}

const paint = document.getElementById('paint').getContext('2d')
const size = document.getElementById('paint').getBoundingClientRect()
const paintBucket = document.getElementById('paint-bucket')

var mouseHold

// Eventos

document.getElementById('paint').addEventListener('mousemove', (event) => {
    pencil.position.x = event.clientX - size.left
    pencil.position.y = event.clientY - size.top
})

document.getElementById('paint').addEventListener('mousedown', () => {
    mouseHold = 1
})

document.getElementById('paint').addEventListener('mouseup', () => {
    mouseHold = 0
})

document.getElementById('paint').addEventListener('mouseout', () => {
    mouseHold = 0
})

document.getElementById('pencil-size').addEventListener('input', () => {
    document.getElementById('pencil-size').value.length == 0 ? document.getElementById('pencil-size').value = 1 : null
    document.getElementById('pencil-size').value < 1 ? document.getElementById('pencil-size').value = 1 : null
    pencil.pencilSize = document.getElementById('pencil-size').value
})

paintBucket.addEventListener('click', () => {
    paintBucket.classList.toggle('checked')
})

document.getElementById('clear').addEventListener('click', () => {
    const clearConfirm = confirm('Deseja realmente limpar o desenho?') 
    clearConfirm == true ? setWhiteScreen() : null
})

for (var c = 0; c < document.getElementsByClassName('button').length; c++) {
    document.getElementsByClassName('button')[c].addEventListener('click', (event) => {
        for (c = 0; c < document.getElementsByClassName('button').length; c++) {
            document.getElementsByClassName('button')[c].classList.remove('active')
        }
        document.getElementById(event.target.id).classList.toggle('active')
        pencil.color = colors[event.target.id.slice(6) - 1]
    })
}

// Funções

function setWhiteScreen() {
    paint.fillStyle = 'white'
    paint.fillRect(0, 0, paint.canvas.width, paint.canvas.height)
}

function setButtonBackground() {
    for (var c = 0; c < colors.length; c++) {
        document.getElementById(`button${c + 1}`).style.backgroundColor = colors[c]
    }
}

function fillPixel() {
    paint.fillStyle = pencil.color
    if (paintBucket.classList.contains('checked') == true) {
        paint.fillRect(0, 0, document.getElementById('paint').width, document.getElementById('paint').height)
        downloadCanvas()
        return
    }
    paint.fillRect(pencil.position.x, pencil.position.y, pencil.pencilSize, pencil.pencilSize)
    downloadCanvas()
}

function checkMouseHold() {
    if (mouseHold == 1) {
        fillPixel()
    }
}

function downloadCanvas() {
    const link = document.getElementById('download-canvas-link')
    link.download = 'picture.png'
    link.href = document.getElementById('paint').toDataURL("image/png;base64");
}

// Chamada de Função

setWhiteScreen()
setButtonBackground()
downloadCanvas()
setInterval(checkMouseHold, 1)