  export function isValidAzonosito(azonosito: any): boolean {
    return !isNaN(Number(azonosito));
  }
  
  export function isValidNev(nev: any): boolean {
    return typeof nev === 'string' && nev.trim() !== '' && /^[A-Za-záéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/.test(nev); //A-Za-z aztat jelenti h A-tol Z-ig nezi
  }
  
  export function isValidTelefonszam(telefonszam: any): boolean { //06 30 715 2767   11számbol áll
    return /^[0-9]{11}$/.test(telefonszam);
  }
  
  export function isValidSzemelyiszam(szemelyiszam: any): boolean { //1-120101-1234    11számbol áll
    return typeof szemelyiszam === 'string' && /^[0-9]{11}$/.test(szemelyiszam);
  }
  
   export function isValidLakcim(lakcim: any): boolean {
    return typeof lakcim === 'string' && lakcim.trim() !== '';
  }
  
  export function isValidStatusz(statusz: any): boolean {
    return ['aktiv', 'torolt'].includes(statusz);
  }

 




  //nagyon meno rész lenne ha mukodne
  export async function isValidLakcim2(lakcim: string): Promise<boolean> {
    if (typeof lakcim !== 'string' || lakcim.trim() === '') {
      console.error('Invalid address input');
      return false;
    }
  
    const city = extractCity(lakcim);
  
    // If city is invalid or cannot be extracted, return false
    if (!city) {
      console.error("No valid city name found in the address:", lakcim);
      return false;
    }
  
    // Validate the city against the Back4App API
    const isCityValid = await isValidCity(city);
    if (!isCityValid) {
      console.error(`The city "${city}" is not a valid Hungarian city.`);
      return false;
    }
  
    return true; // If all checks pass, return true
  
 
 }


  function extractCity(address: string): string | null {
    const parts = address.trim().split(' ');
  
    // Check if the first part is a valid city name (e.g., letters only)
    if (parts.length > 1 && /^[A-Za-záéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$/.test(parts[0])) {
      return parts[0]; // Return the first part if it looks like a valid city name
    }
    return null; // Return null if it's not a valid city name
  }

  
  async function isValidCity(cityName: string): Promise<boolean> {
    try {
      const response = await fetch('https://parseapi.back4app.com/classes/List_of_cities_hungary', {
        headers: {
          'X-Parse-Application-Id': 'imXMTQZxAi2oVJPX1OIdhR1gb2ovqTVT4LBAnER5',
          'X-Parse-REST-API-Key': 'PjseLwlShYLkdU7QcpvacjsmvhxjwSXqVc49TCOy'
        }
      });
  
      if (!response.ok) {
        console.error(`Back4App API call failed with status: ${response.status}`);
        return false;
      }
  
      const data = await response.json() as { results: CityResult[] };
      const cityNames = data.results.map((city) => city.name.toLowerCase());
  
      return cityNames.includes(cityName.toLowerCase()); // Check if the city exists in the list
  
    } catch (error) {
      console.error('Error while validating city name:', error);
      return false;
    }
  }
  
  type CityResult = {
    name: string;
  };
  
  

  