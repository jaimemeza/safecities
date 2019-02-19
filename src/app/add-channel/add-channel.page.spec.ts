import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChannelPage } from './add-channel.page';

describe('AddChannelPage', () => {
  let component: AddChannelPage;
  let fixture: ComponentFixture<AddChannelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChannelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChannelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
