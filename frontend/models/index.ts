
export interface VersionDTO {
    version: string;
}

export interface UserDTO { //FOR TEH TEST 
    id: number;
    nev: string;
    eletkor: number;
}

export interface CustomerDTO {
    azonosito: number;
    nev: string;
    telefonszam: string;
    szemelyiszam: string;
    lakcim: string;
    statusz: string;
}

export interface ProductDTO {
    sorszam: number;
    cim: string;
    beszerzes_datuma: Date;
    statusz: string;
    kolcsonozte: string;
    kolcsonzes_ideje: Date;
    tipus: string;
}