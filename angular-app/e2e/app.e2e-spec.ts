import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for skillcape-v2', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be skillcape-v2', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('skillcape-v2');
    })
  });

  it('navbar-brand should be skillcape-network@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('skillcape-network@0.0.1');
  });

  
    it('Skill component should be loadable',() => {
      page.navigateTo('/Skill');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Skill');
    });

    it('Skill table should have 7 columns',() => {
      page.navigateTo('/Skill');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });

  

});
