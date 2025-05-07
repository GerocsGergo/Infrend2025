  
  export function isValidSorszam(sorszam: any): boolean {
    return !isNaN(Number(sorszam));
  }

  export function isValidAzonosito(azonosito: any): boolean {
    return !isNaN(Number(azonosito));
  }

  export function isValidKolcsonzesDatuma(datuma: any): boolean {
    const date = new Date(datuma);
    return !isNaN(date.getTime());
  }
  