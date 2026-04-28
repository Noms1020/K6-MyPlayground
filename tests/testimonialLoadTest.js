
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

    // call login to get token
    const loginResponse = loginRequest(PAYLOADS.login);
    validateLoginResponse(loginResponse);

    const token = JSON.parse(loginResponse.body).data?.token;

    if (!token) {
        console.error('No token received — skipping');
        return;
    }

    //  POST testimonial and extract testimonial ID
    const postResponse = postTestimonial(PAYLOADS.testimonial, token);
    validateTestimonialResponse(postResponse);

    const testimonialId = JSON.parse(postResponse.body).data?.Id;

    if (!testimonialId) {
        console.error('No testimonial ID — skipping update and delete');
        return;
    }

  //update testimonial using the testimonial iD that was extracted above
    const updateResponse = updateTestimonial(testimonialId, PAYLOADS.updateTestimonial, token);
    validateUpdateTestimonialResponse(updateResponse);

    //delete testimonial
    const deleteResponse = deleteTestimonial(testimonialId, token);
    validateDeleteTestimonialResponse(deleteResponse);

    sleep(1); 

}
