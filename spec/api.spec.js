pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Body is correct", function () {
    pm.response.to.have.body("response_body_string");
});