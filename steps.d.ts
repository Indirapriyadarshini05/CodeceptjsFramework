/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type LP = typeof import('./library/Login_fn.js');
type Helpers = import('./helpers_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, LP: LP }
  interface Methods extends Playwright, Helpers {}
  interface I extends ReturnType<steps_file>, WithTranslation<Helpers> {}
  namespace Translation {
    interface Actions {}
  }
}
