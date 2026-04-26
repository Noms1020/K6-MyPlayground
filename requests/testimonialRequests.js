import http from 'k6/http';
import { URLS } from '../config/urls.js';
import { HEADERS } from '../config/constants.js';

export function postTestimonial(payload, token) {
    const headers = { ...HEADERS.json, Authorization: `Bearer ${token}` };
    const body = JSON.stringify(payload);

    return http.post(URLS.testimonials, body, { headers });
}

export function updateTestimonial(testimonialId, payload, token) {
    const headers = { ...HEADERS.json, Authorization: `Bearer ${token}` };
    const url = `${URLS.testimonials}/${testimonialId}`;
    const body = JSON.stringify(payload);

    return http.put(url, body, { headers });
}

export function deleteTestimonial(testimonialId, token) {
    const headers = { ...HEADERS.json, Authorization: `Bearer ${token}` };
    const url = `${URLS.testimonials}/${testimonialId}`;

    return http.del(url, null, { headers });
}
