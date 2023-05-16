import AxiosMockAdapter from 'axios-mock-adapter';
import axios from './axios';

// ----------------------------------------------------------------------

const axiosMockAdapter = new AxiosMockAdapter(axios, {});

export default axiosMockAdapter;
