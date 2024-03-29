import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController";
import patientCotroller from "../controllers/patientCotroller"
import specialtyController from "../controllers/specialtyController"
import clinicController from "../controllers/clinicController"
import handbookController from "../controllers/handbookController"
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/alo', (req, res) => {
        return res.send(`Hello Kha`)
    });
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/api/login', userController.handleLogin);

    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/update-user', userController.handleUpdateUser);
    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-infor-doctors', doctorController.postInforDoctor);
    router.get('/api/get-detail-doctor', doctorController.getDetailDoctor);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor);
    router.post('/api/send-redemy', doctorController.sendRedemy);

    router.post('/api/patient-book-appointment', patientCotroller.postBookAppoinment);
    router.post('/api/verify-book-appointment', patientCotroller.postVerifyAppoinment);

    router.post('/api/create-new-specialty', specialtyController.createSpecailty);
    router.get('/api/get-all-specialties', specialtyController.getAllSpecialties);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);

    router.post('/api/create-new-handbook', handbookController.createHandbook);
    router.get('/api/get-all-handbooks', handbookController.getAllHandbooks);
    router.get('/api/get-detail-handbook-by-id', handbookController.getDetailHandbookById);

    router.post('/api/create-new-clinic', clinicController.createClinic);
    router.get('/api/get-all-clinics', clinicController.getAllClinics);
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinictyById);


    return app.use("/", router);
}

module.exports = initWebRoutes;