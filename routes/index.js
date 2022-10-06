const { Router } = require('express')
const router = Router()
const { verifyToken } = require('../middlewares')
const { createProduct,
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
    loginController } = require('../controllers')

// CRUD de Products

router.post('/api/v1/products', createProduct)
router.get('/api/v1/products', getProducts)
router.get('/api/v1/products/:idProduct', getProduct)
router.put('/api/v1/products/:idProduct', modifyProduct)
router.delete('/api/v1/products/:idProduct', deleteProduct)



// CRUD de Clients

router.get('/api/v1/clients', getClients)
router.get('/api/v1/clients/:idClient', getClient)
router.put('/api/v1/clients/:idClient', modifyClient)
router.delete('/api/v1/clients/:idClient', deleteClient)


// CRUD de Invoices

router.post('/api/v1/invoices', createInvoice)
router.get('/api/v1/invoices', getInvoices)
router.get('/api/v1/invoices/:idInvoice', getInvoice)
router.put('/api/v1/invoices/:idInvoice', modifyInvoice)
router.delete('/api/v1/invoices/:idInvoice', deleteInvoice)

router.post('/api/v1/invoices/detail', addInvoiceDetail)
router.get('/api/v1/invoices/detail:idInvoice', getInvoiceDetail)

// CRUD de Categorias

router.post('/api/v1/categories', createCategory)
router.get('/api/v1/categories', getCategories)
router.get('/api/v1/categories/:idInvoice', getCategory)
router.put('/api/v1/categories/:idInvoice', modifyCategory)
router.delete('/api/v1/categories/:idInvoice', deleteCategory)

//LOGIN

router.post('/api/v1/login', loginController)
router.post('/api/v1/register', registerController)

module.exports = router
