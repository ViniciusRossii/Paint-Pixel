# Paint Pixel

 Uma ferramenta de desenho feita com HTML, CSS e JS.
 ***
 
 # Explicação dos Códigos
 
 ### Posição do Lápis
 
 A posição do lápis fica salva dentro de um objeto nomeado de Pencil, nesse objeto também fica armazenado a cor e o tamanho do lápis. Observe abaixo:
 
 ```
 const pencil = {
    position: {
        x: 0,
        y: 0,
    },
    color: 'black',
    pencilSize: 10,
}
 ```
 A Posição é atualizada pelo trecho de código que é executado ao usuário mexer o mouse, como mostra os comandos abaixo.
 ```
 document.getElementById('paint').addEventListener('mousemove', (event) => {
    pencil.position.x = event.clientX - size.left
    pencil.position.y = event.clientY - size.top
})
 ```
 
 ### Tamanho do Lápis
 
 O tamanho do lápis é atualizado instantaneamente após o usuário inserir o valor no campo de números, caso ele deixe em branco ou em um valor menor que 1, será redefinido para o tamanho padrão, que no caso é 1.
 ```
 document.getElementById('pencil-size').addEventListener('input', () => {
    document.getElementById('pencil-size').value.length == 0 ? document.getElementById('pencil-size').value = 1 : null
    document.getElementById('pencil-size').value < 1 ? document.getElementById('pencil-size').value = 1 : null
    pencil.pencilSize = document.getElementById('pencil-size').value
})
 ```
 ### Cores Disponíveis
 Todas as cores ficam armazenadas em um Array:
 ```
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
 ```
 E são disponibilizadas para uso pelo seguinte trecho:
 ```
 for (var c = 0; c < document.getElementsByClassName('button').length; c++) {
    document.getElementsByClassName('button')[c].addEventListener('click', (event) => {
        for (c = 0; c < document.getElementsByClassName('button').length; c++) {
            document.getElementsByClassName('button')[c].classList.remove('active')
        }
        document.getElementById(event.target.id).classList.toggle('active')
        pencil.color = colors[event.target.id.slice(6) - 1]
    })
}
 ```
 O background da opção de cor também é atualizado automaticamente:
 ```
 function setButtonBackground() {
    for (var c = 0; c < colors.length; c++) {
        document.getElementById(`button${c + 1}`).style.backgroundColor = colors[c]
    }
}
 ```
 Sendo assim, apenas alterando a cor na Array, o código é atualizado instantaneamente, assim facilitando a manutenção.
 ### Renderizando o desenho
 Assim que o mouse é pressionado, o seguinte trecho de código é acionado:
 
 ```
 function fillPixel() {
    paint.fillStyle = pencil.color
    if (paintBucket.checked == true) {
        paint.fillRect(0, 0, document.getElementById('paint').width, document.getElementById('paint').height)
        downloadCanvas()
        return
    }
    paint.fillRect(pencil.position.x, pencil.position.y, pencil.pencilSize, pencil.pencilSize)
    downloadCanvas()
}
 ```
 Caso o Paint Bucket esteja marcado, pintará toda a tela, caso não esteja, pintará apenas os pixels marcados pelo tamanho do pincel
 ### Download do Desenho
 O desenho é disponibilizado pro usuário pelo seguinte código:
 ```
 function downloadCanvas() {
    const link = document.getElementById('download-canvas-link')
    link.download = 'picture.png'
    link.href = document.getElementById('paint').toDataURL("image/png;base64");
}
 ```
 Sendo atualizado toda vez que houver alguma atualização no Canvas.
 ***
 ## Futuras atualizações
 - [ ] Cores Personalizadas
 - [ ] Botão de Apagar
 - [ ] O Desenho ficará salvo mesmo após dar refresh na página
 - [x] Responsividade
 
 E muito mais!
***
##### Feito por Vinicius Rossi
