import { TestBed } from '@angular/core/testing';
import { AuthModule } from './auth.module';
describe('AuthModule', () => {
  let pipe: AuthModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AuthModule] });
    pipe = TestBed.get(AuthModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
