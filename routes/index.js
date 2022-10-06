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
    registerController,
    loginController } = require('../controllers')

// CRUD de Products

router.post('/products', createProduct)
router.get('/products', getProducts)
router.get('/products/:idProduct', getProduct)
router.put('/products/:idProduct', modifyProduct)
router.delete('/products/:idProduct', deleteProduct)



// CRUD de Clients

router.get('/clients', getClients)
router.get('/clients/:idClient', getClient)
router.put('/clients/:idClient', modifyClient)
router.delete('/clients/:idClient', deleteClient)


// CRUD de Invoices

router.post('/invoices', createInvoice)
router.get('/invoices', getInvoices)
router.get('/invoices/:idInvoice', getInvoice)
router.put('/invoices/:idInvoice', modifyInvoice)
router.delete('/invoices/:idInvoice', deleteInvoice)


// CRUD de Categorias

router.post('/categories', createCategory)
router.get('/categories', getCategories)
router.get('/categories/:idInvoice', getCategory)
router.put('/categories/:idInvoice', modifyCategory)
router.delete('/categories/:idInvoice', deleteCategory)

//LOGIN

router.post('/login', loginController)
router.post('/register', registerController)

module.exports = router
