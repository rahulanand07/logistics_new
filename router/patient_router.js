import { test_api } from "../controller/patient_controller.js";

import { Router } from "express";

const router = Router()

router.get("/test",test_api)


export {router}