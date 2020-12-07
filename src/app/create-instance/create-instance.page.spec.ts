import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateInstancePage } from './create-instance.page';

describe('CreateInstancePage', () => {
  let component: CreateInstancePage;
  let fixture: ComponentFixture<CreateInstancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInstancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateInstancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
