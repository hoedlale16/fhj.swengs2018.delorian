import { TestBed, async, inject } from '@angular/core/testing';

import { AdminRoleGuard } from './admin-role.guard';

describe('AdminRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminRoleGuard]
    });
  });

  it('should ...', inject([AdminRoleGuard], (guard: AdminRoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
