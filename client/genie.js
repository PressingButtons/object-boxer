import {ColliderMap} from '/client/js/ColliderMap.js';

let project = null;

const createProject = ( data ) => {
  project = new ProjectObject( data.name, data.width, data.height );
}
