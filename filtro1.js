function main() {
  console.log("En main()....")

  //-- Acceso al objeto con la imagen
  var img = document.getElementById('imagesrc')

  //-- Acceso al objeto con el canvas
  var canvas = document.getElementById('display');

  //-- Acceso al deslizador
  deslizadorrojo = document.getElementById('deslizadorrojo')
  deslizadorverde = document.getElementById('deslizadorverde')
  deslizadorazul = document.getElementById('deslizadorazul')

  //-- Valor del deslizador
  rango_rojo = document.getElementById('rango_rojo')
  rango_verde = document.getElementById('rango_verde')
  rango_azul = document.getElementById('rango_azul')

  //-- Boton de Grises
  gris = document.getElementById('gris');

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Obtener el contexto del canvas para
  //-- trabajar con el
  var ctx = canvas.getContext("2d");

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Funcion de retrollamada del deslizador
  deslizadorrojo.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    rango_rojo.innerHTML = deslizadorrojo.value
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);
    //-- Obtener la imagen del canvas en pixeles
    var imgDataRojo = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //-- Obtener el array con todos los píxeles
    var data = imgDataRojo.data
    //-- Obtener el umbral de rojo del desliador
    var umbralrojo = deslizadorrojo.value
    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralrojo)
      data[i] = umbralrojo;
    }
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgDataRojo, 0, 0);
  }

  deslizadorverde.oninput = () => {
    rango_verde.innerHTML = deslizadorverde.value
    ctx.drawImage(img, 0,0);
    var imgDataVerde = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgDataVerde.data
    var umbralverde = deslizadorverde.value
    for (var i = 0; i < data.length; i+=4) {
      if (data[i+1] > umbralverde)
      data[i+1] = umbralverde;
    }
    ctx.putImageData(imgDataVerde, 0, 0);
  }

  deslizadorazul.oninput = () => {
    rango_azul.innerHTML = deslizadorazul.value
    ctx.drawImage(img, 0,0);
    var imgDataAzul = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgDataAzul.data
    var umbralazul = deslizadorazul.value
    for (var i = 0; i < data.length; i+=4) {
      if (data[i+2] > umbralazul)
      data[i+2] = umbralazul;
    }
    ctx.putImageData(imgDataAzul, 0, 0);
  }

  gris.onclick=()=>{
      var imgDataGris = ctx.getImageData(0, 0, canvas.width, canvas.height);
      //-- Obtener el array con todos los píxeles
      var data = imgDataGris.data;
      //-- Filtrar la imagen según el nuevo umbral
      for (var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var v = 0.2126*r + 0.7152*g + 0.0722*b;
        data[i] = data[i+1] = data[i+2] = v
        }
  ctx.putImageData(imgDataGris, 0, 0);
  }
}
