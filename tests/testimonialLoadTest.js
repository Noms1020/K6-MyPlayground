
import { sleep }                                from 'k6';
import { LOAD_TEST_CONFIG }                     from '../config/constants.js';
import { PAYLOADS }                             from '../data/payloads.js';
import { loginRequest }                         from '../requests/authRequest.js';
import { postTestimonial,
         updateTestimonial,
         deleteTestimonial }                    from '../requests/testimonialRequests.js';
import { validateLoginResponse }                from '../checks/authChecks.js';
import { validateTestimonialResponse,
         validateUpdateTestimonialResponse,
         validateDeleteTestimonialResponse }    from '../checks/testimonialChecks.js';

export const options = {
    stages:     LOAD_TEST_CONFIG.stages,
    thresholds: LOAD_TEST_CONFIG.thresholds,
};

export default function testimonialLoadTest() {

    // Step 1: Login to get token
    const loginResponse = loginRequest(PAYLOADS.login);
    validateLoginResponse(loginResponse);

    const token = JSON.parse(loginResponse.body).data?.token;

    if (!token) {
        console.error('No token received — skipping');
        return;
    }

    // Step 2: POST testimonial
    const postResponse = postTestimonial(PAYLOADS.testimonial, token);
    validateTestimonialResponse(postResponse);

    const testimonialId = JSON.parse(postResponse.body).data?.Id;

    if (!testimonialId) {
        console.error('No testimonial ID — skipping update and delete');
        return;
    }

    // Step 3: UPDATE testimonial
    const updateResponse = updateTestimonial(testimonialId, PAYLOADS.updateTestimonial, token);
    validateUpdateTestimonialResponse(updateResponse);

    // Step 4: DELETE testimonial
    const deleteResponse = deleteTestimonial(testimonialId, token);
    validateDeleteTestimonialResponse(deleteResponse);

    sleep(1); // Pause 1s between iterations to avoid hammering the server
}
