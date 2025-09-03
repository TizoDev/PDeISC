import { getRows, registroCorrecto, insertInto, updateProyecto, updatePortafolio, deleteProyecto, updateProyectosinImagen } from './funcionesbd.js';

await updateProyectosinImagen(3, "Proyecto", "Descripcion");