
import { sleep } from 'k6';
import { TEST_CONFIG } from '../config/constants.js';
import { loginRequest } from '../requests/authRequest.js';
import { getProfile } from '../requests/profileRequests.js';
import { validateLoginResponse } from '../checks/authChecks.js';
import { PAYLOADS } from '../data/payloads.js';

export const options ={
    vus: TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration,
};

export default function(){
    const loginRequestPayload  = loginRequest(PAYLOADS.login);
    validateLoginResponse(loginRequestPayload);

    const body = loginRequestPayload.json();

    const token = body.data.token;

    const response = getProfile(token);
    console.log(`Response status: ${response}`);
    console.log(`Response body: ${response.body}`);

}