import { Angular2NgrxFirebaseAuthPage } from './app.po';

describe('angular2-ngrx-firebase-auth App', function() {
  let page: Angular2NgrxFirebaseAuthPage;

  beforeEach(() => {
    page = new Angular2NgrxFirebaseAuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
