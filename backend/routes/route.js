import express from 'express'
import * as controller from '../controllers/userController.js'

const router = express.Router()

router.get('/',controller.fetchData)
router.post('/',controller.createData)

export default router