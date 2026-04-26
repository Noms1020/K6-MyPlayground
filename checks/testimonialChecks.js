import { check } from 'k6';

export function validateTestimonialResponse(response) {
    return check(response, {
        'status is 201':      (res) => res.status === 201,
        'body is not empty':  (res) => res.body.length > 0,
        'has testimonial id': (res) => JSON.parse(res.body).data?.id !== undefined,
    });
}

export function validateUpdateTestimonialResponse(response) {
    return check(response, {
        'status is 200':        (res) => res.status === 200,
        'body is not empty':    (res) => res.body.length > 0,
        'title was updated':    (res) => JSON.parse(res.body).data?.title === 'Updated Title',
        'rating was updated':   (res) => JSON.parse(res.body).data?.rating === 5,
    });
}

export function validateDeleteTestimonialResponse(response) {
    return check(response, {
        'status is 200':          (res) => res.status === 200,
        'body is not empty':      (res) => res.body.length > 0,
        'deleted successfully':   (res) => JSON.parse(res.body).success === true,
    });
}
