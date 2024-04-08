import { test_api,get_patient_by_id } from "../controller/patient_controller.js";

import { Router } from "express";

const router = Router()

router.get("/test",test_api)
router.get("/patient/patient-by-id/:id",get_patient_by_id)


export {router}