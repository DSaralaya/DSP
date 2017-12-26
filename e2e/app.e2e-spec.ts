import { DSP.1.0Page } from './app.po';

describe('dsp.1.0 App', () => {
  let page: DSP.1.0Page;

  beforeEach(() => {
    page = new DSP.1.0Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
