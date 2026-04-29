export const TEST_CONFIG = {
    vus: 15,
    duration: '10s',
    //sleepTime:1
};

export const LOAD_TEST_CONFIG = {
    stages: [
        { duration: '30s', target: 10  },
        { duration: '1m',  target: 10  },
        { duration: '30s', target: 50  },
        { duration: '1m',  target: 50  },
        { duration: '30s', target: 100 },
        { duration: '1m',  target: 100 },
        { duration: '30s', target: 0   },
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed:   ['rate<0.05'],
        checks:            ['rate>0.95'],
    },
};

export const HEADERS = {
    json: {
    'Content-Type': 'application/json',
},
};