// import Especies from "../assets/especies.json";
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

// const EliminarEspecieComponent = () => {
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

//   const especie = 0;

//   return (
//     <div className="col-12">
//       <div className="row justify-content-center mb-1">
//         <div className="col-6">
//           <div className="input-group mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Buscar Especie por nombre científico o común"
//               aria-label="Recipient's username"
//               aria-describedby="button-addon2"
//             ></input>
//             <button
//               className="btn btn-outline-secondary"
//               type="button"
//               id="button-addon2"
//             >
//               Buscar
//             </button>
//           </div>
//         </div>
//         <form onSubmit={formikEspecies.handleSubmit}>
//           <div className="row mb-1">
//             <div className="col-4 text-end">
//               <h6>Nombre Común :</h6>
//             </div>
//             <div className="col-6">
//               <h6>{Especies[especie].nombreComun}</h6>
//             </div>
//           </div>
//           <div className="row mb-1">
//             <div className="col-4 text-end">
//               <h6 className="fst-italic">Nombre Científico :</h6>
//             </div>
//             <div className="col-6">
//               <h6>{Especies[especie].nombreCientifico}</h6>
//             </div>
//           </div>
//           <div className="row mb-1">
//             <div className="col-4 text-end">
//               <h6>Categoría de Conservación :</h6>
//             </div>
//             <div className="col-6">
//               <h6>{Especies[especie].categoriaConservacion}</h6>
//             </div>
//           </div>
//           <div className="row mb-1">
//             <div className="col-4 text-end">
//               <h6>Rango Geográfico :</h6>
//             </div>
//             <div className="col-6">
//               <h6>{Especies[especie].rangoGeografico}</h6>
//             </div>
//           </div>
//           <div className="row justify-content-center">
//             <div className="col-3 text-center">
//               <input
//                 type="submit"
//                 className="btn btn-danger m-3"
//                 value="Eliminar Especie"
//               />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EliminarEspecieComponent;
