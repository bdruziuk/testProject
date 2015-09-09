var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {
  this.Given(/^I go on sample page$/, function (callback) {
	  console.log(arguments);
    // Write code here that turns the phrase above into concrete actions
    browser.get('http://localhost:9000/#/sample');
	callback()
  });

  this.Then(/^the title should equal "([^"]*)"$/, function (title, callback) {
    // Write code here that turns the phrase above into concrete actions
    expect(browser.getTitle()).to.eventually.equal(title).and.notify(callback);
  });
}