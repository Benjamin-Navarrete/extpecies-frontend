// Archivo src\components\Forms\SpecieForm.js
import Modal from 'react-modal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '@/components/Inputs/InputField';
import SelectField from '../Inputs/SelectField';
import TextArea from '@/components/Inputs/TextArea';

const conservationStatus = [
  { code: 'LC', name: 'Preocupación menor (LC)' },
  { code: 'NT', name: 'Casi amenazado (NT)' },
  { code: 'VU', name: 'Vulnerable (VU)' },
  { code: 'EN', name: 'En peligro (EN)' },
  { code: 'CR', name: 'En peligro crítico (CR)' },
  { code: 'EW', name: 'Extinto en estado silvestre (EW)' },
  { code: 'EX', name: 'Extinto (EX)' }
];

const kingdom = [
  { name: 'Animalia' },
  { name: 'Fungi' },
  { name: 'Plantae' }
];

const phylum = [
  { name: 'Basidiomycota' },
  { name: 'Ascomycota' },
  { name: 'Tracheophyta' },
  { name: 'Bryophyta' },
  { name: 'Marchantiophyta' },
  { name: 'Rhodophyta' },
  { name: 'Charophyta' },
  { name: 'Anthocerotophyta' },
  { name: 'Chlorophyta' },
  { name: 'Chordata' },
  { name: 'Arthropoda' },
  { name: 'Mollusca' },
  { name: 'Cnidaria' },
  { name: 'Echinodermata' },
  { name: 'Annelida' },
  { name: 'Onychophora' },
  { name: 'Nemertina' },
  { name: 'Platyhelminthes' }
];

const SpecieForm = ({
  modalIsOpen,
  speciesForm,
  currentSpecies,
  handleCloseModal,
  handleSubmit
}) => {
  const validationSchema = Yup.object({
    nombreComun: Yup.string().required('El nombre común es obligatorio'),
    nombreCientifico: Yup.string().required(
      'El nombre científico es obligatorio'
    ),
    imagen: Yup.string()
      .url('La imagen debe ser una URL válida')
      .required('La imagen es obligatoria'),
    reino: Yup.string().required('El reino es obligatorio'),
    filo: Yup.string().required('El filo es obligatorio'),
    clase: Yup.string().required('La clase es obligatoria'),
    orden: Yup.string().required('El orden es obligatorio'),
    familia: Yup.string().required('La familia es obligatoria'),
    genero: Yup.string().required('El género es obligatorio'),
    estadoConservacion: Yup.string().required(
      'El estado de conservación es obligatorio'
    ),
    sitio: Yup.string().required('El sitio es obligatorio'),
    numeroLocaciones: Yup.number()
      .min(0, 'El número de locaciones debe ser mayor o igual a cero')
      .required('El número de locaciones es obligatorio'),
    limiteElevacionSuperior: Yup.number()
      .min(0, 'El límite de elevación superior debe ser mayor o igual a cero')
      .nullable(),
    limiteElevacionInferior: Yup.number()
      .min(0, 'El límite de elevación inferior debe ser mayor o igual a cero')
      .nullable(),
    descripcionGeografica: Yup.string().required(
      'La descripción geográfica es obligatoria'
    ),
    tendenciaPoblacion: Yup.string().required(
      'La tendencia poblacional es obligatoria'
    ),
    detallesPoblacion: Yup.string().required(
      'Los detalles poblacionales son obligatorios'
    ),
    sistemaHabitat: Yup.string().required('El sistema hábitat es obligatorio'),
    tiposHabitat: Yup.string().nullable(),
    detallesHabitat: Yup.string().required(
      'Los detalles hábitat son obligatorios'
    ),
    detallesAmenazas: Yup.string().required(
      'Los detalles amenazas son obligatorios'
    ),
    accionesConservacion: Yup.string().required(
      'Las acciones de conservación son obligatorias'
    ),
    bibliografia: Yup.string().required('La bibliografía es obligatoria'),
    latitud: Yup.number()
      .min(-90, 'La latitud debe estar entre -90 y 90 grados')
      .max(90, 'La latitud debe estar entre -90 y 90 grados')
      .nullable(),
    longitud: Yup.number()
      .min(-180, 'La longitud debe estar entre -180 y 180 grados')
      .max(180, 'La longitud debe estar entre -180 y 180 grados')
      .nullable()
  });

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      className="max-w-lg mx-auto bg-white rounded-lg p-4  shadow-xl mt-24 mb-24"
      style={{ content: { maxHeight: '80vh', overflowY: 'auto' } }}
    >
      <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        {currentSpecies ? 'Editar' : 'Crear'} especie
      </h2>
      <Formik
        initialValues={speciesForm}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-3">
            <InputField
              label="Nombre común"
              type="text"
              name="nombreComun"
              autoComplete="name"
            />
            <InputField
              label="Nombre científico"
              type="text"
              name="nombreCientifico"
            />
            <InputField
              label="Imagen"
              type="text"
              name="imagen"
              autoComplete="url"
            />
            <SelectField
              label="Reino"
              name="reino"
              placeholder="Selecciona el reino"
            >
              {kingdom.map(status => (
                <option key={status.name} value={status.name}>
                  {status.name}
                </option>
              ))}
            </SelectField>
            <SelectField
              label="Filo"
              name="filo"
              placeholder="Selecciona el filo"
            >
              {phylum.map(status => (
                <option key={status.name} value={status.name}>
                  {status.name}
                </option>
              ))}
            </SelectField>
            <InputField label="Clase" type="text" name="clase" />
            <InputField label="Orden" type="text" name="orden" />
            <InputField label="Familia" type="text" name="familia" />
            <InputField label="Género" type="text" name="genero" />
            <SelectField
              label="Estado de conservación"
              name="estadoConservacion"
              placeholder="Selecciona el estado de conservación"
            >
              {conservationStatus.map(status => (
                <option key={status.code} value={status.code}>
                  {status.name}
                </option>
              ))}
            </SelectField>
            <InputField label="Sitio" type="text" name="sitio" />
            <InputField
              label="Número de locaciones"
              type="number"
              name="numeroLocaciones"
            />
            <InputField
              label="Límite de elevación superior (m)"
              type="number"
              name="limiteElevacionSuperior"
            />
            <InputField
              label="Límite de elevación inferior (m)"
              type="number"
              name="limiteElevacionInferior"
            />
            <TextArea
              label="Descripción geográfica"
              type="text"
              name="descripcionGeografica"
            />
            <InputField
              label="Tendencia poblacional"
              type="text"
              name="tendenciaPoblacion"
            />
            <TextArea
              label="Detalles poblacionales"
              type="text"
              name="detallesPoblacion"
            />
            <InputField
              label="Sistema hábitat"
              type="text"
              name="sistemaHabitat"
            />
            <InputField label="Tipos hábitat" type="text" name="tiposHabitat" />
            <TextArea
              label="Detalles hábitat"
              type="text"
              name="detallesHabitat"
            />
            <TextArea
              label="Detalles amenazas"
              type="text"
              name="detallesAmenazas"
            />
            <TextArea
              label="Acciones de conservación"
              type="text"
              name="accionesConservacion"
            />
            <TextArea label="Bibliografía" type="text" name="bibliografia" />
            <InputField label="Latitud (grados)" type="number" name="latitud" />
            <InputField
              label="Longitud (grados)"
              type="number"
              name="longitud"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SpecieForm;
