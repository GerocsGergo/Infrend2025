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
                const customers = await this.customerTable.find();

                if (!customers) {
                    res.status(404).json({ message: 'The data does not exist.' });
                    return;
                }

                res.json(customers);
            } catch (err) {
                this.handleError(res, err);
            }
        };

        findCustomers = async (req, res) => {
            try {
              const { azonosito, szemelyiszam, nev } = req.query;
              let customer = null;
          
              if (azonosito) {
                if (!isValidAzonosito(azonosito)) {
                  return res.status(400).json({ message: 'Invalid azonosito.' });
                }
                customer = await this.customerTable.findOneBy({ azonosito: Number(azonosito) });
              }
              else if (szemelyiszam) {
                if (!isValidSzemelyiszam(szemelyiszam)) {
                  return res.status(400).json({ message: 'Invalid személyiszám.' });
                }
                customer = await this.customerTable.findOneBy({ szemelyiszam });
              }
              else if (nev) {
                if (!isValidNev(nev)) {
                  return res.status(400).json({ message: 'Invalid név.' });
                }
                customer = await this.customerTable.find({ where: { nev } });
              }
              else {
                return res.status(400).json({ message: 'No search parameter provided.' });
              }
          
              if (!customer || (Array.isArray(customer) && customer.length === 0)) {
                return res.status(404).json({ message: 'Customer not found.' });
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
                return res.status(400).json({ message: 'Invalid azonosito.' });
              }
          
              const customer = await this.customerTable.findOneBy({ azonosito: Number(azonosito) });
          
              if (!customer) {
                return res.status(404).json({ message: 'Customer not found.' });
              }
          
              const { nev, telefonszam, szemelyiszam, lakcim } = req.body;
          
              // Validate and update each field if provided
              if (nev !== undefined) {
                if (!isValidNev(nev)) {
                  return res.status(400).json({ message: 'Invalid név.' });
                }
                customer.nev = nev;
              }
          
              if (telefonszam !== undefined) {
                if (!isValidTelefonszam(telefonszam)) {
                  return res.status(400).json({ message: 'Invalid telefonszám.' });
                }
                customer.telefonszam = telefonszam;
              }
          
              if (szemelyiszam !== undefined) {
                if (!isValidSzemelyiszam(szemelyiszam)) {
                  return res.status(400).json({ message: 'Invalid személyiszám.' });
                }
                customer.szemelyiszam = szemelyiszam;
              }
          
              if (lakcim !== undefined) {
                if (!isValidLakcim(lakcim)) {
                  return res.status(400).json({ message: 'Invalid lakcím.' });
                }
                customer.lakcim = lakcim;
              }
          
              await this.customerTable.save(customer);
          
              res.json({ message: 'Customer updated successfully.', customer: customer });
          
            } catch (err) {
              this.handleError(res, err);
            }
          };

        deleteCustomer = async (req,res) => {
                try {
                  const azonosito = req.params['azonosito'];
              
                  if (!isValidAzonosito(azonosito)) {
                    return res.status(400).json({ message: 'Invalid azonosito.' });
                  }
              
                  const customer = await this.customerTable.findOneBy({ azonosito: Number(azonosito) });
              
                  if (!customer) {
                    return res.status(404).json({ message: 'Customer not found.' });
                  }
              
                  customer.statusz = 'torolt';
                  await this.customerTable.save(customer);
              
                  res.json({ message: 'Customer marked as deleted (torolt).', customer });
                } catch (err) {
                  this.handleError(res, err);
                }

        };

        activateCustomer = async (req, res) => {
            try {
                const azonosito = req.params['azonosito'];
            
                if (!isValidAzonosito(azonosito)) {
                  return res.status(400).json({ message: 'Invalid azonosito.' });
                }
            
                const customer = await this.customerTable.findOneBy({ azonosito: Number(azonosito) });
            
                if (!customer) {
                  return res.status(404).json({ message: 'Customer not found.' });
                }
        
                customer.statusz = 'aktiv';
                await this.customerTable.save(customer);
            
                res.json({ message: 'Ügyfél új státusza: törölt.', customer });
              } catch (err) {
                this.handleError(res, err);
              }
        }

        openCustomer = async (req, res) => {
          try {
            const azonosito = req.params['azonosito'];
        
            if (!isValidAzonosito(azonosito)) {
              return res.status(400).json({ message: 'Invalid azonosito.' });
            }

            const customer = await this.customerTable.findOneBy({ azonosito: Number(azonosito) });
        
            if (!customer) {
              return res.status(404).json({ message: 'Customer not found.' });
            }
        
            res.json(customer);
        
          } catch (err) {
            this.handleError(res, err);
          }
        };

        handleError = (res: Response, err: any, status = 500, message = 'Unknown server error.') => {
            if (err) {
                console.error(err);
            }
            res.status(status).json({ message });
        };

}