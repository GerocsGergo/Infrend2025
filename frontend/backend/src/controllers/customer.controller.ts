import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Customer } from '../entity/Customer';
import { isValidAzonosito, isValidNev, isValidTelefonszam, isValidSzemelyiszam, isValidLakcim, isValidStatusz
  } from '../validators/customerValidator';


export class CustomerController{
    private customerTable: Repository<Customer>;
        constructor(dataSource) {
            this.customerTable = dataSource.getRepository(Customer);
        };

        getAllCustomer = async (req,res) => {
            try{
                const customers = await this.customerTable.find({
                  order: {
                    azonosito: 'ASC'
                  }
                });

                if (!customers) {
                    res.status(404).json({ message: 'Hiba történt az adatok lekérésében' });
                    return;
                }

                res.json(customers);
            } catch (err) {
                this.handleError(res, err);
            }
        };

        createCustomer = async (req, res) => {
          try {
              // Extract fields from the request body
              const { nev, telefonszam, szemelyiszam, lakcim } = req.body;
      
              // Validate required fields
              if (!nev || !telefonszam || !szemelyiszam || !lakcim) {
                  return res.status(400).json({ message: 'Minden mező kitöltése kötelező!' });
              }
      
              // Validate name
              if (!isValidNev(nev)) {
                  return res.status(400).json({ message: 'Érvénytelen név.' });
              }
      
              // Validate phone number
              if (!isValidTelefonszam(telefonszam)) {
                  return res.status(400).json({ message: 'Érvénytelen telefonszám.' });
              }
      
              // Check if the phone number already exists
              const existingTelefonszam = await this.customerTable.findOneBy({ telefonszam: telefonszam });
              if (existingTelefonszam) {
                  return res.status(400).json({ message: 'Ez a telefonszám már használatban van.' });
              }
      
              // Validate personal ID
              if (!isValidSzemelyiszam(szemelyiszam)) {
                  return res.status(400).json({ message: 'Érvénytelen személyiszám.' });
              }
      
              // Check if the personal ID already exists
              const existingSzemelyiszam = await this.customerTable.findOneBy({ szemelyiszam: szemelyiszam });
              if (existingSzemelyiszam) {
                  return res.status(400).json({ message: 'Ez a személyiszám már használatban van.' });
              }
      
              // Validate address
              if (!isValidLakcim(lakcim)) {
                  return res.status(400).json({ message: 'Érvénytelen lakcím.' });
              }
      
              // Create the new customer object
              const newCustomer = this.customerTable.create({
                  nev,
                  telefonszam,
                  szemelyiszam,
                  lakcim,
              });
      
              // Save the new customer to the database
              await this.customerTable.save(newCustomer);
      
              // Send a success response
              res.json({ message: 'Új ügyfél sikeresen hozzáadva!', customer: newCustomer });
      
          } catch (err) {
              // Handle any errors that occur
              this.handleError(res, err);
          }
      };
      

        findCustomers = async (req, res) => {
            try {
              const { azonosito, szemelyiszam, nev } = req.query;
              let customer = null;
          
              if (azonosito && azonosito != 0) {
                if (!isValidAzonosito(azonosito)) {
                  return res.status(400).json({ message: 'Nem érvényes azonosito.' });
                }
                customer = await this.customerTable.find({
                  where: {azonosito: Number(azonosito)},
                  order: {azonosito: 'ASC'} 
                });
              }
              else if (szemelyiszam) {
                if (!isValidSzemelyiszam(szemelyiszam)) {
                  return res.status(400).json({ message: 'Nem érvényes személyiszám.' });
                }
                customer = await this.customerTable.find({
                  where: {szemelyiszam},
                  order: {azonosito: 'ASC'}  });
              }
              else if (nev) {
                if (!isValidNev(nev)) {
                  return res.status(400).json({ message: 'Nem érvényes név.' });
                }
                customer = await this.customerTable.find({
                  where: { nev },
                  order: {azonosito: 'ASC'}  });
              }
              else {
                return res.status(400).json({ message: 'Nincs megadva keresési feltétel' });
              }
          
              if (!customer || (Array.isArray(customer) && customer.length === 0)) {
                return res.status(404).json({ message: 'Nincs ilyen ügyfél' });
              }
          
              res.json(customer);
            } catch (err) {
              this.handleError(res, err);
            }
          };

          modifyCustomer = async (req, res) => {
            try {
              const azonosito = req.params['azonosito'];
              
              // Check if azonosito is valid
              if (!isValidAzonosito(azonosito)) {
                return res.status(400).json({ message: 'Érvénytelen azonositó.' });
              }
          
              const customer = await this.customerTable.findOneBy({ azonosito: Number(azonosito) });
          
              if (!customer) {
                return res.status(404).json({ message: 'Nincs ilyen ügyfél.' });
              }
          
              const { nev, telefonszam, szemelyiszam, lakcim } = req.body;
          
              // Validate and update each field if provided
              if (nev !== undefined) {
                if (!isValidNev(nev)) {
                  return res.status(400).json({ message: 'Érvénytelen név.' });
                }
                customer.nev = nev;
              }
          
              if (telefonszam !== undefined) {
                if (!isValidTelefonszam(telefonszam)) {
                  return res.status(400).json({ message: 'Érvénytelen telefonszám.' });
                }

                const existingTelefonszam = await this.customerTable.findOneBy({ telefonszam: telefonszam });
                if (existingTelefonszam != null) {
                  return res.status(400).json({ message: 'Ez a telefonszám már használatban van.' });
                }

                customer.telefonszam = telefonszam;
              }
              
        
              if (szemelyiszam !== undefined) {
                if (!isValidSzemelyiszam(szemelyiszam)) {
                  return res.status(400).json({ message: 'Érvénytelen személyiszám.' });
                }

                const existingSzemelyiszam = await this.customerTable.findOneBy({ szemelyiszam: szemelyiszam });
                if (existingSzemelyiszam != null) {
                  return res.status(400).json({ message: 'Ez a személyiszám már használatban van.' });
                }

                customer.szemelyiszam = szemelyiszam;
              }
             
          
              if (lakcim !== undefined) {
                if (!isValidLakcim(lakcim)) {
                  return res.status(400).json({ message: 'Érvénytelen lakcím.' });
                }
                customer.lakcim = lakcim;
              }
          
              await this.customerTable.save(customer);
          
              res.json({ message: 'Ügyfél adatati sikeresen frissítve!', customer: customer });
          
            } catch (err) {
              this.handleError(res, err);
            }
          };

        deleteCustomer = async (req,res) => {
                try {
                  const azonosito = req.params['azonosito'];
              
                  if (!isValidAzonosito(azonosito)) {
                    return res.status(400).json({ message: 'Érvénytelen azonositó.' });
                  }
              
                  const customer = await this.customerTable.findOneBy({ azonosito: Number(azonosito) });
              
                  if (!customer) {
                    return res.status(404).json({ message: 'Nincs ilyen ügyfél.' });
                  }
              
                  customer.statusz = 'torolt';
                  await this.customerTable.save(customer);
              
                  res.json({ message: 'Ügyfél státusza sikeresen módosítva: Törölt', customer });
                } catch (err) {
                  this.handleError(res, err);
                }

        };

        activateCustomer = async (req, res) => {
            try {
                const azonosito = req.params['azonosito'];
            
                if (!isValidAzonosito(azonosito)) {
                  return res.status(400).json({ message: 'Érvénytelen azonositó.' });
                }
            
                const customer = await this.customerTable.findOneBy({ azonosito: Number(azonosito) });
            
                if (!customer) {
                  return res.status(404).json({ message: 'Nincs ilyen ügyfél.' });
                }
        
                customer.statusz = 'aktiv';
                await this.customerTable.save(customer);
            
                res.json({ message: 'Ügyfél státusza sikeresen módosítva: Aktív', customer });
              } catch (err) {
                this.handleError(res, err);
              }
        }

        openCustomer = async (req, res) => {
          try {
            const azonosito = req.params['azonosito'];
        
            if (!isValidAzonosito(azonosito)) {
              return res.status(400).json({ message: 'Érvénytelen azonositó.' });
            }

            const customer = await this.customerTable.findOneBy({ azonosito: Number(azonosito) });
        
            if (!customer) {
              return res.status(404).json({ message: 'Nincs ilyen ügyfél.' });
            }
        
            res.json(customer);
        
          } catch (err) {
            this.handleError(res, err);
          }
        };

        handleError = (res: Response, err: any, status = 500, message = 'Ismeretlen szerver hiba.') => {
            if (err) {
                console.error(err);
            }
            res.status(status).json({ message });
        };


}