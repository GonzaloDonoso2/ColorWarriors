export function reproducirSonido(nombreSonido: string) {

    const rutaSonido: string = `assets/audios/${ nombreSonido }.wav`;
    const sonido = new Audio(rutaSonido);

    sonido.volume = 0.1;
    sonido.play();
};

export function tiempoEsperaAnimacion(miliSegundos: number): Promise<void> {

  return new Promise(resolve => setTimeout(resolve, miliSegundos));
}
  
export function generarNumeroAleatorio(minimo: number, maximo: number): number {

  const numeroAleatorio: number = (Math.floor(Math.random() * (maximo - minimo + 1)) + minimo);

  return numeroAleatorio;
}
 