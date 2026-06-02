import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal.component';

describe('ConfirmDeleteModalComponent', () => {
  let fixture: ComponentFixture<ConfirmDeleteModalComponent>;
  let component: ConfirmDeleteModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteModalComponent);
    component = fixture.componentInstance;
    component.isOpen = true;
    component.clientFullName = 'Bousquet Philippe';
    fixture.detectChanges();
  });

  it('should emit confirm on confirm action', () => {
    const confirmSpy = vi.spyOn(component.confirmed, 'emit');

    component.onConfirm();

    expect(confirmSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit cancel on cancel action', () => {
    const cancelSpy = vi.spyOn(component.canceled, 'emit');

    component.onCancel();

    expect(cancelSpy).toHaveBeenCalledTimes(1);
  });
});
