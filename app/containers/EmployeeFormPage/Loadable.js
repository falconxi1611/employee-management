/**
 *
 * Asynchronously loads the component for EmployeeFormPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
