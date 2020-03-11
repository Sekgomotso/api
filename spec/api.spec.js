const visitor = require('../src/api.js');
const axios = require('axios');

const person = {
    visitor_name: "Juju",
    visitors_age: 29,
    date_of_visit: "8/8/2020",
    time_of_visit: "23:00",
    assistant: "Tumi",
    comment: "Ok"
}

describe('api tests', () => {
    it('should add new visitor', () =>{
        expect(person.visitor_name).toBe("Juju")
    })

    it('should return age', () => {
        expect(person.visitors_age).toBe(29)
    })
})

// pm.test("Status code is 200", function () {
//     pm.response.to.have.status(200);
// });
// pm.test("Body is correct", function () {
//     pm.response.to.have.body("response_body_string");
// });