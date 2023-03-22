export const withPoints = (num: number) => {
  let numConPuntosComas;

  if (num) {
    const numString = num.toString(); // convierte el número a un string
    const numSplit = numString.split("."); // divide el string en partes entera y decimal

    // agrega comas a la parte entera
    const parteEntera = numSplit[0];
    const parteEnteraConComas = parteEntera.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    );

    // junta la parte entera con las comas y la parte decimal con el punto
    if (numSplit.length > 1) {
      const parteDecimal = numSplit[1];
      numConPuntosComas = parteEnteraConComas + "," + parteDecimal;
    } else {
      numConPuntosComas = parteEnteraConComas;
    }

    return numConPuntosComas;
  }
};
