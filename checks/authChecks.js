import {check} from 'k6';

export function validateLoginResponse(response){
    return check(response, {
        'status is 200': (res) => res.status === 200,

        'body is not empty': (res) => res.body.length > 0
    });

}

export function validateTestimonialResponse(response) {
    return check(response, {
        'status is 201':      (res) => res.status === 201,
        'body is not empty':  (res) => res.body.length > 0,
        'has testimonial id': (res) => JSON.parse(res.body).data?.id !== undefined,
    });
}

  