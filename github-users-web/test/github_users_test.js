var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require("../app");
var should = chai.should();
var assert = require('assert');
var base_url = "http://localhost:3000/";
chai.use(chaiHttp);

describe("Main Web App", function() {
  describe("GET /", function() {
    it("it show home page", function(done) {
        chai.request(app).get("/").end(function(error, response, body) {
            response.should.have.status(200);            
            response.should.to.be.html;
            response.text.should.contain("Welcome to GitHub User's Favourite Programming Language"); 
            done();
        });
    })
  }),
  describe("GET /user?userName=ASDASDASDASDASDASDASDASD123123123123123", function() {
    it("it show a not existing user", function(done) {
            chai.request(app).get("/user?userName=ASDASDASDASDASDASDASDASD123123123123123").end(function(error, response, body) {
                response.should.have.status(200);            
                response.should.to.be.html;
                response.text.should.contain("[ASDASDASDASDASDASDASDASD123123123123123] doesn&#39;t exist or doesn&#39;t have repositories"); 
                done();
             
            });
    })
  }),
  describe("GET /user?userName=jjmena", function() {
    it("it show an existing user", function(done) {
         chai.request(app).get("/user?userName=jjmena").end(function(error, response, body) {
                response.should.have.status(200);            
                response.should.to.be.html;
                response.text.should.contain("[ jjmena] favourite language/s: Java,JavaScript"); 
                done();
             
            });
    });
  })
});