  export function isValidAzonosito(azonosito: any): boolean {
    return !isNaN(Number(azonosito));
  }
  
  export function isValidNev(nev: any): boolean {
    return typeof nev === 'string' && nev.trim() !== '';
  }
  
  export function isValidTelefonszam(telefonszam: any): boolean {
    return /^[0-9]{10,15}$/.test(telefonszam);
  }
  
  export function isValidSzemelyiszam(szemelyiszam: any): boolean {
    return typeof szemelyiszam === 'string' && szemelyiszam.trim() !== '';
  }
  
  export function isValidLakcim(lakcim: any): boolean {
    return typeof lakcim === 'string' && lakcim.trim() !== '';
  }
  
  export function isValidStatusz(statusz: any): boolean {
    return ['aktiv', 'torolt'].includes(statusz);
  }