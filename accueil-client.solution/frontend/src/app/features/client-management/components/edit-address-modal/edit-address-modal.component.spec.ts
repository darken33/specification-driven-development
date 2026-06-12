import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAddressModalComponent } from './edit-address-modal.component';

describe('EditAddressModalComponent', () => {
  let fixture: ComponentFixture<EditAddressModalComponent>;
  let component: EditAddressModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAddressModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAddressModalComponent);
    component = fixture.componentInstance;
    component.isOpen = true;
    fixture.detectChanges();
  });

  it('should not emit save when form is invalid', () => {
    const saveSpy = vi.spyOn(component.saved, 'emit');

    component.form.patchValue({
      ligne1: '',
      codePostal: '33',
      ville: ''
    });

    component.onSave();

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('should emit save with valid address', () => {
    const saveSpy = vi.spyOn(component.saved, 'emit');

    component.form.patchValue({
      ligne1: '48 rue bauducheu',
      ligne2: '',
      codePostal: '33800',
      ville: 'Bordeaux'
    });

    component.onSave();

    expect(saveSpy).toHaveBeenCalledWith({
      ligne1: '48 rue bauducheu',
      ligne2: '',
      codePostal: '33800',
      ville: 'Bordeaux'
    });
  });
});
