// import { useFormik } from "formik";

// const validate = (values) => {
//   const errors = {};
//   // VALIDAR CONTRASEÑA
//   if (!values.password) {
//     errors.password = "Campo requerido";
//   } else if (values.password.length < 6) {
//     errors.password = "La contraseña debe contener al menos 6 caracteres";
//   }

//   if (!values.newPassword) {
//     errors.newPassword = "Campo requerido";
//   } else if (values.newPassword.length < 6) {
//     errors.newPassword =
//       "La nueva contraseña debe contener al menos 6 caracteres";
//   } else if (values.newPassword == values.password) {
//     errors.newPassword = "La nueva contraseña no puede ser igual a la anterior";
//   }

//   if (!values.repeatPassword) {
//     errors.repeatPassword = "Campo requerido";
//   } else if (values.repeatPassword.length < 6) {
//     errors.repeatPassword = "La contraseña debe contener al menos 6 caracteres";
//   } else if (values.repeatPassword !== values.newPassword) {
//     errors.repeatPassword = "Las contraseñas no coinciden";
//   }
//   return errors;
// };

// const UserContrasenaComponent = () => {
//   // FORMIK CONTRASEÑA
//   const formikContrasena = useFormik({
//     initialValues: {
//       password: "",
//       newPassword: "",
//       repeatPassword: "",
//     },
//     validate,
//     onSubmit: (values) => {
//       alert("Form enviado, datos: " + JSON.stringify(values, null, 2));
//     },
//   });
//   return (
//     <div className="col-12 col-lg-6">
//       <h5 className="text-center mb-3">Cambiar Contraseña</h5>
//       <form onSubmit={formikContrasena.handleSubmit}>
//         <div className="row form outline mb-4">
//           <div className="row">
//             <div className="col-4 col-lg-4 text-end">
//               <label className="form-label mb-3 fw-semibold" for="password">
//                 Contraseña Actual
//               </label>
//             </div>
//             <div className="col-8 col-lg-8">
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 className="form-control"
//                 onChange={formikContrasena.handleChange}
//                 onBlur={formikContrasena.handleBlur}
//                 value={formikContrasena.values.password}
//               />
//               {formikContrasena.touched.password &&
//               formikContrasena.errors.password ? (
//                 <div className="labelError">
//                   {formikContrasena.errors.password}
//                 </div>
//               ) : null}
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-4 col-lg-4 text-end">
//               <label className="form-label mb-3 fw-semibold" for="newPassword">
//                 Nueva Contraseña
//               </label>
//             </div>
//             <div className="col-8 col-lg-8">
//               <input
//                 id="newPassword"
//                 name="newPassword"
//                 type="password"
//                 className="form-control"
//                 onChange={formikContrasena.handleChange}
//                 onBlur={formikContrasena.handleBlur}
//                 value={formikContrasena.values.newPassword}
//               />
//               {formikContrasena.touched.newPassword &&
//               formikContrasena.errors.newPassword ? (
//                 <div className="labelError">
//                   {formikContrasena.errors.newPassword}
//                 </div>
//               ) : null}
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-4 col-lg-4 text-end">
//               <label
//                 className="form-label mb-3 fw-semibold"
//                 for="repeatPassword"
//               >
//                 Confirmar Contraseña
//               </label>
//             </div>
//             <div className="col-8 col-lg-8">
//               <input
//                 id="repeatPassword"
//                 name="repeatPassword"
//                 type="password"
//                 className="form-control"
//                 onChange={formikContrasena.handleChange}
//                 onBlur={formikContrasena.handleBlur}
//                 value={formikContrasena.values.repeatPassword}
//               />
//               {formikContrasena.touched.repeatPassword &&
//               formikContrasena.errors.repeatPassword ? (
//                 <div className="labelError">
//                   {formikContrasena.errors.repeatPassword}
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//         <div className="row justify-content-center">
//           <div className="col-3 col-lg-3">
//             <input
//               className="btn btn-primary"
//               type="submit"
//               value="Actualizar Contraseña"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserContrasenaComponent;
