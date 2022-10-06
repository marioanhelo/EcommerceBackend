const connect = require ('../database')
const { createToken } = require('../utils')

 //REGISTER
 const registerController = async (req,res)=>{
    const{ first_name, last_name, birthday, gender, email, role, client_password } = req.body
    try {
        const dbResponse = await connect.query(
            "INSERT INTO clients (first_name, last_name, birthday, gender, email, role, client_password) VALUES ($1, $2,$3,$4, $5, $6, crypt($7,gen_salt('bf')))",
        [first_name, last_name, birthday, gender, email, role, client_password])
        if(dbResponse.rowCount > 0){
            res.status(201).send({
                message:"Client Created"
            })
        }else{
            res.status(409).send({
                message:"Error, client not created"
            })
        }
    } catch (error) {
        if (error.code =="23505"){
            res.status(409).send({
                message:"Error, the email account is already in use"
            })
        }else{
            res.status(409).send({
                error
            })
        }
    }
  }

//Login
const loginController = async (req, res) => {
    const { email, bodyPassword } = req.body
    try {
      const dbResponse = await connect.query(
        "SELECT * FROM clients WHERE email = $1 AND client_password = crypt($2, client_password)",
        [email, bodyPassword]
      )
      if (dbResponse.rowCount > 0) {
        const data = {
          id: dbResponse.rows[0].id,
          email: dbResponse.rows[0].email
        }
        const token = createToken(data)
        res.status(200).send({
          data: token
        })
      } else {
        res.status(404).send({
          message: "Usuario o contraseña incorrectos."
        })
      }
    } catch (error) {
      res.status(404).send({
        error
      })
    }
  }


//  Products Controllers

const createProduct = async (req, res) => {
    const {product_name, description, price, category_id, brand, sku, image, stock, is_active} = req.body
    try {
        const dbResponse = await connect.query('INSERT INTO products (product_name, description, price, category_id, brand, sku, image, stock, is_active) VALUES ($1, $2, $3, $4 ,$5, $6, $7, $8, $9)',
        [product_name, description, price, category_id, brand, sku, image, stock, is_active] )
        if(dbResponse.rowCount > 0){
            res.status(201).send({
                message:"Product Created"
            })
        }else{
            res.status(409).send({
                message:"Error, the product could not be created at this time"
            })
        }

    } catch (error) {
        res.status(409).send({
            error
        })
    }
}
const getProducts = async (req, res) => {
    try {
        const dbResponse = await connect.query(`SELECT products.*, cat.category_name FROM products
        INNER JOIN categories AS cat
        ON products.category_id = cat.category_id`)
        res.status(200).send({
            data:dbResponse.rows
        })
    } catch (error) {
        res.status(404).send({
            error
        })
    }
}
const getProduct = async (req, res) => {
    const id = req.params.idProduct
    try {
        const dbResponse = await connect.query(`SELECT products.*, cat.category_name FROM products
        INNER JOIN categories AS cat
        ON products.category_id = cat.category_id WHERE product_id = $1`,[id])
        if(dbResponse.rowCount > 0){
            res.status(200).send({
                data:dbResponse.rows
            })
        }else{
            res.status(404).send({
                message:'Product not found'
            })
        }

    } catch (error) {
        res.status(404).send({
            error
        })
    }
}
const modifyProduct = async (req, res) => {
    const id = req.params.idProduct
    const {product_name, description, price, category_id, brand, sku, image, stock, is_active} = req.body
    try {
        const dbResponse = await connect.query(`
        UPDATE products
        SET
            product_name = $1,
            description = $2,
            price = $3,
            category_id = $4,
            brand = $5,
            sku = $6,
            image = $7,
            stock = $8,
            is_active = $9
        WHERE product_id = $10`,
        [product_name, description, price, category_id, brand, sku, image, stock, is_active, id])

        if(dbResponse.rowCount > 0){
            res.status(200).send({
                message:"Product modified"
            })
        }else{
            res.status(409).send({
                message:"Error, product not modified in this time, try later"
            })
        }
    } catch (error) {
        res.status(400).send({
            error
        })
    }
}
const deleteProduct = async (req, res) => {
    const id = req.params.idProduct
    try {
        const dbResponse = await connect.query(`DELETE FROM products where product_id = $1`,[id])
        if(dbResponse.rowCount > 0){
            res.status(200).send({
                message:"Product deleted"
            })
        }else{
            res.status(409).send({
                message:"Error, product not deleted in this time, try later"
            })
        }
    } catch (error) {
        res.status(400).send({
            error
        })
    }
}

//  Clients Controllers


const getClients = async (req, res) => {
    try {
        const dbResponse = await connect.query('SELECT * FROM clients')
        res.status(200).send({
            data:dbResponse.rows
        })
    } catch (error) {
        res.status(404).send({
            error
        })
    }
}
const getClient = async (req, res) => {
    const id = req.params.idClient
    try {
        const dbResponse = await connect.query('SELECT * FROM clients WHERE client_id = $1',[id])
        if(dbResponse.rowCount > 0){
            res.status(200).send({
                data:dbResponse.rows
            })
        }else{
            res.status(404).send({
                message:'Client not found'
            })
        }

    } catch (error) {
        res.status(404).send({
            error
        })
    }
}
const modifyClient = async (req, res) => {
    const id = req.params.idClient
    const {first_name, last_name, birthday, gender, email, role} = req.body
    try {
        const dbResponse = await connect.query(`
        UPDATE clients
        SET
            first_name = $1,
            last_name = $2,
            birthday = $3,
            gender = $4,
            email = $5,
            role = $6
        WHERE client_id = $7`,
        [first_name, last_name, birthday, gender, email, role, id])

        if(dbResponse.rowCount > 0){
            res.status(200).send({
                message:"Client modified"
            })
        }else{
            res.status(409).send({
                message:"Error, client not modified in this time, try later"
            })
        }
    } catch (error) {
        res.status(400).send({
            error
        })
    }
}
const deleteClient = async (req, res) => {
    const id = req.params.idClient
    try {
        const dbResponse = await connect.query(`DELETE FROM clients where client_id = $1`,[id])
        if(dbResponse.rowCount > 0){
            res.status(200).send({
                message:"Client deleted"
            })
        }else{
            res.status(409).send({
                message:"Error, client not deleted in this time, try later"
            })
        }
    } catch (error) {
        res.status(400).send({
            error
        })
    }
}

//  Invoices Controllers


const createInvoice = async (req, res) => {
    const { total,invoice_date,id_client } = req.body;
  try {
    const dbResponse = await connect.query(
      "INSERT INTO invoice(total,invoice_date,id_client)values($1,$2,$3);",
      [total,invoice_date,id_client]
    );
    if (dbResponse.rowCount > 0) {
      res.status(201).send({
        message: "Invoice created",
      });
    } else {
      res.status(409).send({
        message: "Error, invoice not created in this time, try later",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
}
const getInvoices = async (req, res) => {
    try {
        const dbResponse = await connect.query('SELECT * FROM Invoices')
        res.status(200).send({
            data:dbResponse.rows
        })
    } catch (error) {
        res.status(404).send({
            error
        })
    }
}
const getInvoice = async (req, res) => {
    const id = req.params.idInvoice
    try {
        const dbResponse = await connect.query('SELECT * FROM invoices WHERE invoice_id = $1',[id])
        if(dbResponse.rowCount > 0){
            res.status(200).send({
                data:dbResponse.rows
            })
        }else{
            res.status(404).send({
                message:'Invoice not found'
            })
        }

    } catch (error) {
        res.status(404).send({
            error
        })
    }
}
const modifyInvoice = async (req, res) => {
    const id = req.params.idClient
    const {total, invoice_date, id_client} = req.body
    try {
        const dbResponse = await connect.query(`
        UPDATE invoices
        SET
            total = $1,
            invoice_date = $2,
            id_client = $3
        WHERE invoice_id = $4`,
        [total, invoice_date, id_client, id])

        if(dbResponse.rowCount > 0){
            res.status(200).send({
                message:"Invoice modified"
            })
        }else{
            res.status(409).send({
                message:"Error, client not modified in this time, try later"
            })
        }
    } catch (error) {
        res.status(400).send({
            error
        })
    }
}
const deleteInvoice = async (req, res) => {
    const id = req.params.idInvoice
    try {
        const dbResponse = await connect.query(`DELETE FROM invoices where invoice_id = $1`,[id])
        if(dbResponse.rowCount > 0){
            res.status(200).send({
                message:"Invoice deleted"
            })
        }else{
            res.status(409).send({
                message:"Error, invoice not deleted in this time, try later"
            })
        }
    } catch (error) {
        res.status(400).send({
            error
        })
    }
}

// Categories Controllers

const createCategory = async (req, res) => {
    const {category_name, is_active} = req.body
    try {
        const dbResponse = await connect.query('INSERT INTO categories (category_name, is_active) VALUES ($1, $2)',
        [category_name, is_active] )
        if(dbResponse.rowCount > 0){
            res.status(201).send({
                message:"Category Created"
            })
        }else{
            res.status(409).send({
                message:"Error, the category could not be created at this time"
            })
        }

    } catch (error) {
        res.status(409).send({
            error
        })
    }
}
const getCategories = async (req, res) => {
    try {
        const dbResponse = await connect.query('SELECT * FROM categories')
        res.status(200).send({
            data:dbResponse.rows
        })
    } catch (error) {
        res.status(404).send({
            error
        })
    }
}
const getCategory = async (req, res) => {
    const id = req.params.idCategory
    try {
        const dbResponse = await connect.query('SELECT * FROM categories WHERE category_id = $1',[id])
        if(dbResponse.rowCount > 0){
            res.status(200).send({
                data:dbResponse.rows
            })
        }else{
            res.status(404).send({
                message:'Category not found'
            })
        }

    } catch (error) {
        res.status(404).send({
            error
        })
    }
}
const modifyCategory = async (req, res) => {
    const id = req.params.idCategory
    const {category_name, is_active} = req.body
    try {
        const dbResponse = await connect.query(`
        UPDATE categories
        SET
            category_name = $1,
            is_active = $2,
        WHERE category_id = $3`,
        [category_name, is_active, id])

        if(dbResponse.rowCount > 0){
            res.status(200).send({
                message:"Category modified"
            })
        }else{
            res.status(409).send({
                message:"Error, category not modified in this time, try later"
            })
        }
    } catch (error) {
        res.status(400).send({
            error
        })
    }
}
const deleteCategory = async (req, res) => {
    const id = req.params.idCategory
    try {
        const dbResponse = await connect.query(`DELETE FROM categories where category_id = $1`,[id])
        if(dbResponse.rowCount > 0){
            res.status(200).send({
                message:"Category deleted"
            })
        }else{
            res.status(409).send({
                message:"Error, category not deleted in this time, try later"
            })
        }
    } catch (error) {
        res.status(400).send({
            error
        })
    }
}

const addInvoiceDetail = async (req, res) => {
    const { id_invoice, id_product, qty, unit_price, total } = req.body;
    try {
      const dbResponse = await connect.query(
        "INSERT INTO invoice_detail(id_invoice, id_product, qty, unit_price, total)values($1,$2,$3,$4);",
        [id_invoice, id_product, qty, unit_price, total]
      );
      if (dbResponse.rowCount > 0) {
        res.status(201).send({
          message: "Detail created",
        });
      } else {
        res.status(409).send({
          message: "Error, detail not created in this time, try later",
        });
      }
    } catch (error) {
      res.status(404).send({
        error,
      });
    }
}
const getInvoiceDetail = async (req, res) => {
    const { id } = req.params;
  try {
    const dbResponse = await connect.query(
      `SELECT id_invoice,id_product,qty,unit_price FROM invoice_detail
    INNER JOIN products ON invoice_detail.id_product=product.product_id WHERE id_invoice=$1;`,
      [id]
    );
    console.log(dbResponse.rows);
    res.status(200).send({
      data: dbResponse.rows,
    });
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
}


  module.exports = {
    createProduct,
    getProducts,
    getProduct,
    modifyProduct,
    deleteProduct,
    getClients,
    getClient,
    modifyClient,
    deleteClient,
    createInvoice,
    getInvoices,
    getInvoice,
    modifyInvoice,
    deleteInvoice,
    createCategory,
    getCategories,
    getCategory,
    modifyCategory,
    deleteCategory,
    addInvoiceDetail,
    getInvoiceDetail,
    registerController,
    loginController,
  }

