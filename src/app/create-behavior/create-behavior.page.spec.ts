import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateBehaviorPage } from './create-behavior.page';

describe('CreateBehaviorPage', () => {
  let component: CreateBehaviorPage;
  let fixture: ComponentFixture<CreateBehaviorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBehaviorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBehaviorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
