
import { sleep }                                from 'k6';
import { TEST_CONFIG }                          from '../config/constants.js';
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
    vus:      TEST_CONFIG.vus,
    duration: TEST_CONFIG.duration,
};

export default function testimonialTest() {

    // Step 1: Login to get token
    const loginResponse = loginRequest(PAYLOADS.login);
    console.log(`Login status: ${loginResponse.status}`);
    validateLoginResponse(loginResponse);

    const token = JSON.parse(loginResponse.body).data?.token;

    if (!token) {
        console.error('No token received — skipping testimonial requests');
        return;
    }

    // Step 2: Post a new testimonial
    const postResponse = postTestimonial(PAYLOADS.testimonial, token);
    console.log(`Post Testimonial status: ${postResponse.status}`);
    console.log(`Post Testimonial body: ${postResponse.body}`);
    validateTestimonialResponse(postResponse);

    // Step 3: Extract testimonial ID from post response
    const testimonialId = JSON.parse(postResponse.body).data?.Id;
    console.log(`Testimonial ID: ${testimonialId}`);

    if (!testimonialId) {
        console.error('No testimonial ID received — skipping update and delete');
        return;
    }

    // Step 4: Update the testimonial
    const updateResponse = updateTestimonial(testimonialId, PAYLOADS.updateTestimonial, token);
    console.log(`Update Testimonial status: ${updateResponse.status}`);
    console.log(`Update Testimonial body: ${updateResponse.body}`);
    validateUpdateTestimonialResponse(updateResponse);

    // Step 5: Delete the testimonial
    const deleteResponse = deleteTestimonial(testimonialId, token);
    console.log(`Delete Testimonial status: ${deleteResponse.status}`);
    console.log(`Delete Testimonial body: ${deleteResponse.body}`);
    validateDeleteTestimonialResponse(deleteResponse);

    // sleep(TEST_CONFIG.sleepTime);
}
