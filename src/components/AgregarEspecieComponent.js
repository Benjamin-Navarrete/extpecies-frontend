// import { useFormik } from "formik";

// // VALIDAR ESPECIE
// const validate = (values) => {
//   const errors = {};

//   if (!values.nombreComun) {
//     errors.nombreComun = "Campo requerido";
//   } else if (values.nombreComun.length > 55) {
//     errors.nombreComun = "El nombre común de la especie es muy largo";
//   }

//   if (!values.nombreCientifico) {
//     errors.nombreCientifico = "Campo requerido";
//   } else if (values.nombreCientifico.length > 55) {
//     errors.nombreCientifico = "El nombre científico de la especie es muy largo";
//   }

//   if (!values.rangoGeografico) {
//     errors.rangoGeografico = "Campo requerido";
//   } else if (values.rangoGeografico.length > 55) {
//     errors.rangoGeografico = "El rango geográfico de la especie es muy largo";
//   }

//   if (!values.latitud) {
//     errors.latitud = "Campo requerido";
//   } else if (values.latitud.length > 55) {
//     errors.latitud = "La latitud de la especie es muy larga";
//   }

//   if (!values.longitud) {
//     errors.longitud = "Campo requerido";
//   } else if (values.longitud.length > 55) {
//     errors.longitud = "La longitud de la especie es muy larga";
//   }
//   return errors;
// };

// const AgregarEspecieComponent = () => {
//   // FORMIK ESPECIES
//   const formikAgregar = useFormik({
//     initialValues: {
//       nombreComun: "",
//       nombreCientifico: "",
//       categoriaConservacion: "",
//       rangoGeografico: "",
//       latitud: "",
//       longitud: "",
//     },
//     validate,
//     onSubmit: (values) => {
//       alert("Especie enviada, datos: " + JSON.stringify(values, null, 2));
//     },
//   });
//   return (
//     <div className="col-12">
//       <form onSubmit={formikAgregar.handleSubmit}>
//         <div className="row mb-1">
//           <div className="col-3 text-end">
//             <h6>Nombre Común :</h6>
//           </div>
//           <div className="col-6">
//             <input
//               id="nombreComun"
//               name="nombreComun"
//               className="form-control"
//               type="text"
//               aria-label="default input example"
//               onChange={formikAgregar.handleChange}
//               onBlur={formikAgregar.handleBlur}
//               value={formikAgregar.values.nombreComun}
//             />
//             {formikAgregar.touched.nombreComun &&
//             formikAgregar.errors.nombreComun ? (
//               <div className="labelError">
//                 {formikAgregar.errors.nombreComun}
//               </div>
//             ) : null}
//           </div>
//         </div>
//         <div className="row mb-1">
//           <div className="col-3 text-end">
//             <h6 className="fst-italic">Nombre Científico :</h6>
//           </div>
//           <div className="col-6">
//             <input
//               id="nombreCientifico"
//               name="nombreCientifico"
//               className="form-control fst-italic"
//               type="text"
//               aria-label="default input example"
//               onChange={formikAgregar.handleChange}
//               onBlur={formikAgregar.handleBlur}
//               value={formikAgregar.values.nombreCientifico}
//             />
//             {formikAgregar.touched.nombreCientifico &&
//             formikAgregar.errors.nombreCientifico ? (
//               <div className="labelError">
//                 {formikAgregar.errors.nombreCientifico}
//               </div>
//             ) : null}
//           </div>
//         </div>
//         <div className="row mb-1">
//           <div className="col-3 text-end">
//             <h6>Categoría de Conservación :</h6>
//           </div>
//           <div className="col-6">
//             <select
//               id="categoriaConservacion"
//               name="categoriaConservacion"
//               className="form-select"
//               aria-label="Default select example"
//             >
//               <option selected>Seleccionar Categoría de Conservación</option>
//               <option value="DD">Datos Insuficientes</option>
//               <option value="LC">Preocupación Menor</option>
//               <option value="NT">Casi Amenazado</option>
//               <option value="VU">Vulnerable</option>
//               <option value="EN">En Peligro</option>
//               <option value="CR">En Peligro Crítico</option>
//               <option value="EW">Extinto en Estado Silvestre</option>
//               <option value="EX">Extinto</option>
//               <option value="NE">No Evaluado</option>
//             </select>
//           </div>
//         </div>
//         <div className="row mb-1">
//           <div className="col-3 text-end">
//             <h6>Rango Geográfico :</h6>
//           </div>
//           <div className="col-6">
//             <input
//               id="rangoGeografico"
//               name="rangoGeografico"
//               className="form-control"
//               type="text"
//               aria-label="default input example"
//               onChange={formikAgregar.handleChange}
//               onBlur={formikAgregar.handleBlur}
//               value={formikAgregar.values.rangoGeografico}
//             />
//             {formikAgregar.touched.rangoGeografico &&
//             formikAgregar.errors.rangoGeografico ? (
//               <div className="labelError">
//                 {formikAgregar.errors.rangoGeografico}
//               </div>
//             ) : null}
//           </div>
//         </div>
//         <div className="row mb-1">
//           <div className="col-3 text-end">
//             <h6>Latitud :</h6>
//           </div>
//           <div className="col-6">
//             <input
//               id="latitud"
//               name="latitud"
//               className="form-control"
//               type="text"
//               aria-label="default input example"
//               onChange={formikAgregar.handleChange}
//               onBlur={formikAgregar.handleBlur}
//               value={formikAgregar.values.latitud}
//             />
//             {formikAgregar.touched.latitud && formikAgregar.errors.latitud ? (
//               <div className="labelError">{formikAgregar.errors.latitud}</div>
//             ) : null}
//           </div>
//         </div>
//         <div className="row mb-1">
//           <div className="col-3 text-end">
//             <h6>Longitud :</h6>
//           </div>
//           <div className="col-6">
//             <input
//               id="longitud"
//               name="longitud"
//               className="form-control"
//               type="text"
//               aria-label="default input example"
//               onChange={formikAgregar.handleChange}
//               onBlur={formikAgregar.handleBlur}
//               value={formikAgregar.values.longitud}
//             />
//             {formikAgregar.touched.longitud && formikAgregar.errors.longitud ? (
//               <div className="labelError">{formikAgregar.errors.longitud}</div>
//             ) : null}
//           </div>
//         </div>
//         <div className="row justify-content-center">
//           <div className="col-3 text-center">
//             <input
//               type="submit"
//               className="btn btn-success m-3"
//               value="Agregar Especie"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AgregarEspecieComponent;
