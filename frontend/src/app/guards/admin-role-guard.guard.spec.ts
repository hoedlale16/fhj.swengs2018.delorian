import { TestBed, async, inject } from '@angular/core/testing';

import { AdminRoleGuardGuard } from './admin-role-guard.guard';

describe('AdminRoleGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminRoleGuardGuard]
    });
  });

  it('should ...', inject([AdminRoleGuardGuard], (guard: AdminRoleGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
