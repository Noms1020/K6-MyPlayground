import http from 'k6/http';
import {TEST_CONFIG} from '../config/constants.js';
import {PAYLOADS} from '../data/payloads.js';
import {loginRequest} from '../requests/authRequest.js';
import {validateLoginResponse} from '../checks/authChecks.js';
import {sleep} from 'k6';

export const options = {
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration
};
export default function loginTest(){
    const response = loginRequest(PAYLOADS.login);
    console.log(`Response status: ${response}`);
    console.log(`Response body: ${response.body}`);
    validateLoginResponse(response);
    //sleep(TEST_CONFIG.sleepTime);   
}
