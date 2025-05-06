  export function isValidSorszam(sorszam: any): boolean {
    return !isNaN(Number(sorszam));
  }
  
  export function isValidCim(cim: any): boolean {
    return typeof cim === 'string' && cim.trim().length > 0;
  }
  
  export function isValidTipus(tipus: any): boolean {
    return tipus === 'kazetta' || tipus === 'DVD';
  }
  
  export function isValidStatusz(statusz: any): boolean {
    return ['szabad', 'kikölcsönzött', 'selejtezett'].includes(statusz);
  }
  
  export function isValidDatum(datum: any): boolean {
    return !isNaN(Date.parse(datum));
  }
  