import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientListComponent } from './client-list.component';

describe('ClientListComponent', () => {
  let fixture: ComponentFixture<ClientListComponent>;
  let component: ClientListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
  });

  it('should render one line per item', () => {
    component.items = [
      {
        id: '1',
        displayName: 'Jean Dupont',
        cityPostal: '75000 Paris',
        statusLabel: 'CELIBATAIRE'
      },
      {
        id: '2',
        displayName: 'Camille Martin',
        cityPostal: '33000 Bordeaux',
        statusLabel: 'MARIE'
      }
    ];

    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('li button');
    expect(buttons.length).toBe(2);
  });

  it('should emit selected client id', () => {
    component.items = [
      {
        id: '1',
        displayName: 'Jean Dupont',
        cityPostal: '75000 Paris',
        statusLabel: 'CELIBATAIRE'
      }
    ];

    let selected = '';
    component.selectClient.subscribe((id) => {
      selected = id;
    });

    fixture.detectChanges();
    (fixture.nativeElement.querySelector('li button') as HTMLButtonElement).click();

    expect(selected).toBe('1');
  });
});
