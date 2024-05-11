import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  scenarios: {
    shared_iter_scenario: {
      executor: 'shared-iterations',
      vus: 50,
      iterations: 100,
      startTime: '0s',   
    },
    per_vu_scenario: {
      executor: 'per-vu-iterations',
      vus: 20,
      iterations: 200,
      startTime: '5s',
    }

  },
};


export default function () {
  let url = 'http://localhost:8000/api/v1/dof/patients';
  let payload = JSON.stringify({

      "resourceType": "Patient",
      "id": "4e7a9bc302c347dfad967a7f81ac9013",
      "meta": {
          "security": [
              {
                  "system": "http://terminology.fhir.wellsky.io/context/corporate-client",
                  "code": "wellsky::ws.pg"
              },
              {
                  "system": "http://terminology.fhir.wellsky.io/context/solution-client",
                  "code": "playground::ws.playground"
              }
          ]
      },
      "identifier": [
          {
              "use": "official",
              "type": {
                  "coding": [
                      {
                          "system": "http://terminology.hl7.org/ValueSet/v2-0203",
                          "code": "SS",
                          "display": "Social Security number"
                      }
                  ]
              },
              "system": "http://wellsky.com/api/fhir/namingsystem/identifier",
              "value": "123-444-5555"
          }
      ],
      "active": true,
      "name": [
          {
              "use": "usual",
              "family": "Wonderland",
              "given": [
                  "Carolyn1"
              ]
          }
      ],
      "gender": "female",
      "birthDate": "1935-12-13",
      "maritalStatus": {
          "coding": [
              {
                  "system": "http://hl7.org/fhir/ValueSet/marital-status",
                  "code": "L"
              }
          ]
      },
      "telecom": [
          {
              "system": "phone",
              "value": "123-444-6666",
              "use": "home"
          }
      ],
      "address": [
          {
              "use": "home",
              "type": "both",
              "line": [
                  "50 Bald Hill Ave"
              ],
              "city": "Beltsville",
              "state": "MD",
              "postalCode": "20705"
          }
      ]
  });

  let headers = { 'Content-Type': 'application/json' };

  let res = http.post(url, payload, { headers: headers });
  
  check(res, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
  });
  
  sleep(1);
}

