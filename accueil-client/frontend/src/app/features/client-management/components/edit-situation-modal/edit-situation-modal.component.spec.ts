import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSituationModalComponent } from './edit-situation-modal.component';

describe('EditSituationModalComponent', () => {
  let fixture: ComponentFixture<EditSituationModalComponent>;
  let component: EditSituationModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSituationModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSituationModalComponent);
    component = fixture.componentInstance;
    component.isOpen = true;
    fixture.detectChanges();
  });

  it('should not emit save when nombreEnfants is invalid', () => {
    const saveSpy = vi.spyOn(component.saved, 'emit');

    component.form.patchValue({
      situationFamiliale: 'MARIE',
      nombreEnfants: -1
    });

    component.onSave();

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('should emit save with valid situation', () => {
    const saveSpy = vi.spyOn(component.saved, 'emit');

    component.form.patchValue({
      situationFamiliale: 'DIVORCE',
      nombreEnfants: 2
    });

    component.onSave();

    expect(saveSpy).toHaveBeenCalledWith({
      situationFamiliale: 'DIVORCE',
      nombreEnfants: 2
    });
  });
});
