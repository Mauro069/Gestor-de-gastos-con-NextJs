export const withPoints = (num: number) => {
  if (num) {
    const numString = num.toFixed(2); // redondea el número a dos decimales
    const numSplit = numString.split("."); // divide el string en partes entera y decimal

    // agrega comas a la parte entera
    const parteEntera = numSplit[0];
    const parteEnteraConComas = parteEntera.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    );

    // junta la parte entera con las comas y la parte decimal con el punto
    const parteDecimal = numSplit[1];
    const numConPuntosComas = parteEnteraConComas + "," + parteDecimal;

    return numConPuntosComas;
  } else return 0;
};
