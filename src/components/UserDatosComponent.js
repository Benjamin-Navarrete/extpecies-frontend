// import user from "../assets/img/user.png";
// import "./UserDatosComponent.scss";
// import { useFormik } from "formik";

// // VALIDAR USUARIO
// const validate = (values) => {
//   const errors = {};

//   if (!values.nombre) {
//     errors.nombre = "Campo requerido";
//   } else if (!/^[A-ZñÑáéíóúÁÉÍÓÚ]{1,55}$/i.test(values.nombre)) {
//     errors.nombre = "Nombre contiene caracteres inválidos";
//   }

//   if (!values.apellido) {
//     errors.apellido = "Campo requerido";
//   } else if (!/^[A-ZñÑáéíóúÁÉÍÓÚ]{1,55}$/i.test(values.apellido)) {
//     errors.apellido = "Apellido contiene caracteres inválidos";
//   }

//   if (!values.email) {
//     errors.email = "Campo requerido";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Dirección de correo inválida";
//   }

//   if (!values.telefono) {
//     errors.telefono = "Campo requerido";
//   } else if (!/^[+0-9]{8,12}$/i.test(values.telefono)) {
//     errors.telefono = "Teléfono inválido";
//   }
//   return errors;
// };

// const UserDatosComponent = () => {
//   // FORMIK USUARIO
//   const formikUsuario = useFormik({
//     initialValues: {
//       nombre: "",
//       apellido: "",
//       email: "",
//       telefono: "",
//       actualizaciones: null,
//     },
//     validate,
//     onSubmit: (values) => {
//       alert("Form enviado, datos: " + JSON.stringify(values, null, 2));
//     },
//   });
//   return (
//     <div className="col-12 col-lg-6">
//       <h5 className="text-center mb-3">Datos Personales</h5>
//       <form onSubmit={formikUsuario.handleSubmit}>
//         <div className="row">
//           <div className="col-12 col-md-5 mb-3">
//             <img src={user} alt="user" width="225px" className="circulo" />
//           </div>
//           <div className="col-12 col-md-7">
//             <div className="row">
//               <div className="col-4 text-end">
//                 <label className="fw-semibold mb-3" for="nombre">
//                   Nombres :
//                 </label>
//               </div>
//               <div className="col-8 col-md-8">
//                 <input
//                   id="nombre"
//                   name="nombre"
//                   type="text"
//                   className="form-control"
//                   onChange={formikUsuario.handleChange}
//                   onBlur={formikUsuario.handleBlur}
//                   value={formikUsuario.values.nombre}
//                 />
//                 {formikUsuario.touched.nombre && formikUsuario.errors.nombre ? (
//                   <div className="labelError">
//                     {formikUsuario.errors.nombre}
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-4 col-lg-4 text-end">
//                 <label className="fw-semibold mb-3" for="apellido">
//                   Apellidos :
//                 </label>
//               </div>
//               <div className="col-8 col-lg-8">
//                 <input
//                   id="apellido"
//                   name="apellido"
//                   type="text"
//                   className="form-control"
//                   onChange={formikUsuario.handleChange}
//                   onBlur={formikUsuario.handleBlur}
//                   value={formikUsuario.values.apellido}
//                 />
//                 {formikUsuario.touched.apellido &&
//                 formikUsuario.errors.apellido ? (
//                   <div className="labelError">
//                     {formikUsuario.errors.apellido}
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-4 col-lg-4 text-end">
//                 <label className="fw-semibold mb-3" for="email">
//                   Correo :
//                 </label>
//               </div>
//               <div className="col-8 col-lg-8">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   className="form-control"
//                   onChange={formikUsuario.handleChange}
//                   onBlur={formikUsuario.handleBlur}
//                   value={formikUsuario.values.email}
//                 />
//                 {formikUsuario.touched.email && formikUsuario.errors.email ? (
//                   <div className="labelError">{formikUsuario.errors.email}</div>
//                 ) : null}
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-4 col-lg-4 text-end">
//                 <label className="fw-semibold mb-3" for="telefono">
//                   Teléfono :
//                 </label>
//               </div>
//               <div className="col-8 col-lg-8">
//                 <input
//                   id="telefono"
//                   name="telefono"
//                   type="text"
//                   className="form-control"
//                   onChange={formikUsuario.handleChange}
//                   onBlur={formikUsuario.handleBlur}
//                   value={formikUsuario.values.telefono}
//                 />
//                 {formikUsuario.touched.telefono &&
//                 formikUsuario.errors.telefono ? (
//                   <div className="labelError">
//                     {formikUsuario.errors.telefono}
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//             <div className="row justify-content-end form-check">
//               <div className="col-10 col-lg-10 m-3">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   name="actualizaciones"
//                   id="checkbox"
//                   onChange={formikUsuario.handleChange}
//                   value={formikUsuario.values.actualizaciones}
//                 />
//                 <label className="form-check-label" for="flexCheckChecked">
//                   Deseo recibir actualizaciones de las especies en mi correo.
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="row justify-content-center mb-3">
//             <div className="col-10 col-lg-10">
//               <input className="form-control" type="file" id="formFile" m />
//             </div>
//           </div>
//         </div>
//         <div className="row justify-content-center mb-3">
//           <div className="col-3 col-lg-3 mb-3">
//             <input
//               className="btn btn-primary"
//               type="submit"
//               value="Guardar Cambios"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserDatosComponent;
