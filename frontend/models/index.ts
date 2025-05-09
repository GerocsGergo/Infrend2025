
export interface VersionDTO {
    version: string;
}

export interface CustomerDTO {
    azonosito: number;
    nev: string;
    telefonszam: string;
    szemelyiszam: string;
    lakcim: string;
    statusz: string;
}

export interface MediaDTO {
    sorszam: number;
    cim: string;
    beszerzes_datuma: Date;
    tipus: string;
    statusz: string;
}

export interface BorrowingDTO {
    id: number;
    media: {
        sorszam: number;
        cim: string;
        beszerzes_datuma: Date;
        tipus: string;
        statusz: string;
      };
      customer: {
        azonosito: number;
        nev: string;
        telefonszam: string;
        szemelyiszam: string;
        lakcim: string;
        statusz: string;
      };
    kolcsonzes_datuma: Date;
    visszahozas_datuma: Date | null;
  }

  export interface BorrowingLateDTO {
    id: number;
    daysLate: number;
  }

  