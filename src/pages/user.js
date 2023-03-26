// import Especies from "../assets/especies.json";
// import UserDatosComponent from "../components/UserDatosComponent";
// import UserContrasenaComponent from "../components/UserContrasenaComponent";
// import AgregarEspecieComponent from "../components/AgregarEspecieComponent";
// import ModificarEspecieComponent from "../components/ModificarEspecieComponent";
// import EliminarEspecieComponent from "../components/EliminarEspecieComponent";

// const validate = (values) => {
//   const errors = {};
//   // VALIDAR ESPECIE
//   if (values.nombreComun.length > 55) {
//     errors.nombreComun = "El nombre común de la especie es muy largo";
//   }

//   if (values.nombreCientifico.length > 55) {
//     errors.nombreCientifico = "El nombre científico de la especie es muy largo";
//   }

//   if (!values.categoriaConservacion.length) {
//     errors.categoriaConservacion =
//       "Se debe seleccionar una categoría de conservación";
//   }

//   if (values.rangoGeografico.length > 55) {
//     errors.rangoGeografico = "El rango geográfico de la especie es muy largo";
//   }

//   if (values.latitud.length > 55) {
//     errors.latitud = "La latitud de la especie es muy larga";
//   }

//   if (values.longitud.length > 55) {
//     errors.longitud = "La longitud de la especie es muy larga";
//   }
//   return errors;
// };

// const User = () => {
//   return (
//     <div className="card">
//       <div className="card-body">
//         <div className="row">
//           <ul className="nav nav-tabs" id="myTab" role="tablist">
//             <li className="nav-item" role="presentation">
//               <button
//                 className="nav-link active"
//                 id="home-tab"
//                 data-bs-toggle="tab"
//                 data-bs-target="#home-tab-pane"
//                 type="button"
//                 role="tab"
//                 aria-controls="home-tab-pane"
//                 aria-selected="true"
//               >
//                 Mi Cuenta
//               </button>
//             </li>
//             <li className="nav-item" role="presentation">
//               <button
//                 className="nav-link"
//                 id="mis-especies-tab"
//                 data-bs-toggle="tab"
//                 data-bs-target="#mis-especies-tab-pane"
//                 type="button"
//                 role="tab"
//                 aria-controls="mis-especies-tab-pane"
//                 aria-selected="false"
//               >
//                 Mis Especies
//               </button>
//             </li>
//             <li className="nav-item" role="presentation">
//               <button
//                 className="nav-link"
//                 id="editar-especie-tab"
//                 data-bs-toggle="tab"
//                 data-bs-target="#editar-especie-tab-pane"
//                 type="button"
//                 role="tab"
//                 aria-controls="editar-especie-tab-pane"
//                 aria-selected="false"
//               >
//                 Editar Especie
//               </button>
//             </li>
//           </ul>
//           <div className="tab-content" id="myTabContent">
//             {/* SECCION MI CUENTA */}
//             <div
//               className="tab-pane fade show active"
//               id="home-tab-pane"
//               role="tabpanel"
//               aria-labelledby="home-tab"
//               tabIndex="0"
//             >
//               <h3 className="text-center mb-4">Mi cuenta</h3>
//               <div className="row">
//                 {/* DATOS PERSONALES */}
//                 <UserDatosComponent />
//                 {/* CAMBIAR CONTRASEÑA */}
//                 <UserContrasenaComponent />
//               </div>
//             </div>
//             {/* SECCION MIS ESPECIES*/}
//             <div
//               className="tab-pane fade"
//               id="mis-especies-tab-pane"
//               role="tabpanel"
//               aria-labelledby="mis-especies-tab"
//               tabIndex="0"
//             >
//               <h3 className="text-center mb-5">Mis Especies Guardadas</h3>
//               {Especies.map((dato) => {
//                 return (
//                   <div className="row justify-content-center">
//                     <div className="col-2 col-lg-2 mb-3">
//                       <img
//                         src={dato.img}
//                         alt={dato.nombreComun}
//                         width="200px"
//                         className="img-fluid"
//                       />
//                     </div>
//                     <div className="col-5 col-lg-5 mb-3">
//                       <h3>Nombre Especie: {dato.nombreComun}</h3>
//                       <h6 className="fst-italic">
//                         Nombre Científico: "{dato.nombreCientifico}"
//                       </h6>
//                       <p>
//                         Categoría de Conservación: {dato.categoriaConservacion}
//                       </p>
//                       <p>Rango Geográfico: {dato.rangoGeografico}</p>
//                     </div>
//                     <div className="col-3 col-lg-3 mb-3">
//                       <button type="button" className="btn btn-danger">
//                         Eliminar {dato.nombreComun} de Mis Especies
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             {/* SECCION EDITAR ESPECIE */}
//             <div
//               className="tab-pane fade"
//               id="editar-especie-tab-pane"
//               role="tabpanel"
//               aria-labelledby="editar-especie-tab"
//               tabIndex="0"
//             >
//               {/* ACORDEON AGREGAR, MODIFICAR, ELIMINAR */}
//               <div className="accordion" id="accordionExample">
//                 <div className="accordion-item">
//                   {/* AGREGAR ESPECIE */}
//                   <h2 className="accordion-header" id="headingOne">
//                     <button
//                       className="accordion-button collapsed"
//                       type="button"
//                       data-bs-toggle="collapse"
//                       data-bs-target="#agregar"
//                       aria-expanded="false"
//                       aria-controls="agregar"
//                     >
//                       <strong>Agregar Especie</strong>
//                     </button>
//                   </h2>
//                   <div
//                     id="agregar"
//                     className="accordion-collapse collapse"
//                     aria-labelledby="headingOne"
//                     data-bs-parent="#accordionExample"
//                   >
//                     <div className="row accordion-body m-1">
//                       <AgregarEspecieComponent />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="accordion-item">
//                   {/* MODIFICAR ESPECIE */}
//                   <h2 className="accordion-header" id="headingTwo">
//                     <button
//                       className="accordion-button collapsed"
//                       type="button"
//                       data-bs-toggle="collapse"
//                       data-bs-target="#modificar"
//                       aria-expanded="false"
//                       aria-controls="modificar"
//                     >
//                       <strong>Modificar Especie</strong>
//                     </button>
//                   </h2>
//                   <div
//                     id="modificar"
//                     className="accordion-collapse collapse"
//                     aria-labelledby="headingTwo"
//                     data-bs-parent="#accordionExample"
//                   >
//                     <div className="row accordion-body m-1">
//                       <div className="col-12">
//                         <div className="row justify-content-center mb-1">
//                           <div className="col-6">
//                             <div className="input-group mb-3">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Buscar Especie por nombre científico o común"
//                                 aria-label="Recipient's username"
//                                 aria-describedby="button-addon2"
//                               ></input>
//                               <button
//                                 className="btn btn-outline-secondary"
//                                 type="button"
//                                 id="button-addon2"
//                               >
//                                 Buscar
//                               </button>
//                             </div>
//                           </div>
//                           <ModificarEspecieComponent />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="accordion-item">
//                   {/* ELIMINAR ESPECIE */}
//                   <h2 className="accordion-header" id="headingThree">
//                     <button
//                       className="accordion-button collapsed"
//                       type="button"
//                       data-bs-toggle="collapse"
//                       data-bs-target="#eliminar"
//                       aria-expanded="false"
//                       aria-controls="eliminar"
//                     >
//                       <strong>Eliminar Especie</strong>
//                     </button>
//                   </h2>
//                   <div
//                     id="eliminar"
//                     className="accordion-collapse collapse"
//                     aria-labelledby="headingThree"
//                     data-bs-parent="#accordionExample"
//                   >
//                     <div className="accordion-body m-1">
//                       <EliminarEspecieComponent />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;
