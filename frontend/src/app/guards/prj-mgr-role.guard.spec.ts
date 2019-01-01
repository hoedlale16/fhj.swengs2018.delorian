import { TestBed, async, inject } from '@angular/core/testing';

import { PrjMgrRoleGuard } from './prj-mgr-role.guard';

describe('PrjMgrRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrjMgrRoleGuard]
    });
  });

  it('should ...', inject([PrjMgrRoleGuard], (guard: PrjMgrRoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
