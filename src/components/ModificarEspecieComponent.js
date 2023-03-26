// import { useFormik } from "formik";

// const validate = (values) => {
//   const errors = {};
//   // VALIDAR ESPECIE
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

// const ModificarEspecieComponent = () => {
//   // FORMIK ESPECIES
//   const formikEspecies = useFormik({
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
//     <form onSubmit={formikEspecies.handleSubmit}>
//       <div className="row mb-1">
//         <div className="col-3 text-end">
//           <h6>Nombre Común :</h6>
//         </div>
//         <div className="col-6">
//           <input
//             id="nombreComun"
//             className="form-control"
//             type="text"
//             aria-label="default input example"
//             onChange={formikEspecies.handleChange}
//             onBlur={formikEspecies.handleBlur}
//             value={formikEspecies.values.nombreComun}
//           ></input>
//           {formikEspecies.touched.nombreComun &&
//           formikEspecies.errors.nombreComun ? (
//             <div className="labelError">
//               {formikEspecies.errors.nombreComun}
//             </div>
//           ) : null}
//         </div>
//       </div>
//       <div className="row mb-1">
//         <div className="col-3 text-end">
//           <h6 className="fst-italic">Nombre Científico :</h6>
//         </div>
//         <div className="col-6">
// 					<input
//             id="nombreCientifico"
//             className="form-control fst-italic"
//             type="text"
//             aria-label="default input example"
//             onChange={formikEspecies.handleChange}
//             onBlur={formikEspecies.handleBlur}
//             value={formikEspecies.values.nombreCientifico}
//           ></input>
//           {formikEspecies.touched.nombreCientifico &&
//           formikEspecies.errors.nombreCientifico ? (
//             <div className="labelError">
//               {formikEspecies.errors.nombreCientifico}
//             </div>
//           ) : null}
//         </div>
//       </div>
//       <div className="row mb-1">
//         <div className="col-3 text-end">
//           <h6>Categoría de Conservación :</h6>
//         </div>
//         <div className="col-6">
//           <select className="form-select" aria-label="Default select example">
//             <option selected>Seleccionar Categoría de Conservación</option>
//             <option value="DD">Datos Insuficientes</option>
//             <option value="LC">Preocupación Menor</option>
//             <option value="NT">Casi Amenazado</option>
//             <option value="VU">Vulnerable</option>
//             <option value="EN">En Peligro</option>
//             <option value="CR">En Peligro Crítico</option>
//             <option value="EW">Extinto en Estado Silvestre</option>
//             <option value="EX">Extinto</option>
//             <option value="NE">No Evaluado</option>
//           </select>
//         </div>
//       </div>
//       <div className="row mb-1">
//         <div className="col-3 text-end">
//           <h6>Rango Geográfico :</h6>
//         </div>
//         <div className="col-6">
// 					<input
//             id="rangoGeografico"
//             className="form-control"
//             type="text"
//             aria-label="default input example"
//             onChange={formikEspecies.handleChange}
//             onBlur={formikEspecies.handleBlur}
//             value={formikEspecies.values.rangoGeografico}
//           ></input>
//           {formikEspecies.touched.rangoGeografico &&
//           formikEspecies.errors.rangoGeografico ? (
//             <div className="labelError">
//               {formikEspecies.errors.rangoGeografico}
//             </div>
//           ) : null}
//         </div>
//       </div>
//       <div className="row mb-1">
//         <div className="col-3 text-end">
//           <h6>Latitud :</h6>
//         </div>
//         <div className="col-6">
// 					<input
//             id="latitud"
//             className="form-control"
//             type="text"
//             aria-label="default input example"
//             onChange={formikEspecies.handleChange}
//             onBlur={formikEspecies.handleBlur}
//             value={formikEspecies.values.latitud}
//           ></input>
//           {formikEspecies.touched.latitud &&
//           formikEspecies.errors.latitud ? (
//             <div className="labelError">
//               {formikEspecies.errors.latitud}
//             </div>
//           ) : null}
//         </div>
//       </div>
//       <div className="row mb-1">
//         <div className="col-3 text-end">
//           <h6>Longitud :</h6>
//         </div>
//         <div className="col-6">
// 					<input
//             id="longitud"
//             className="form-control"
//             type="text"
//             aria-label="default input example"
//             onChange={formikEspecies.handleChange}
//             onBlur={formikEspecies.handleBlur}
//             value={formikEspecies.values.longitud}
//           ></input>
//           {formikEspecies.touched.longitud &&
//           formikEspecies.errors.longitud ? (
//             <div className="labelError">
//               {formikEspecies.errors.longitud}
//             </div>
//           ) : null}
//         </div>
//       </div>
//       <div className="row justify-content-center">
//         <div className="col-3 text-center">
// 				<input
//               type="submit"
//               className="btn btn-primary m-3"
//               value="Modificar Especie"
//             />
//         </div>
//       </div>
//     </form>
//   );
// };

// export default ModificarEspecieComponent;
