import {defineConfig} from 'sanity';import {structureTool} from 'sanity/structure';import {schemaTypes} from './schemaTypes';
const projectId=process.env.SANITY_STUDIO_PROJECT_ID;
if(!projectId) throw new Error('Set SANITY_STUDIO_PROJECT_ID before starting Studio.');
export default defineConfig({name:'vankard',title:'Vankard Content Studio',projectId,dataset:process.env.SANITY_STUDIO_DATASET || 'production',plugins:[structureTool()],schema:{types:schemaTypes}});
