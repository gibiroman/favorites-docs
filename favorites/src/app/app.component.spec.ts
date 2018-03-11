import { TestBed, async, inject } from '@angular/core/testing';
import {HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { HttpModule, Http } from '@angular/http';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpModule,
        HttpClientTestingModule,
        MatCardModule
      ],
      providers: [
        AppComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('getJson should return the expected Observable<any> array', async() => {
    inject([Http], (http: Http) => {
      const expected = this.http.get('test.json');
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      const result = app.getJson('test-data/test.json');
      expected(expected).toEqual(result);
    });
  });

  it('if json is empty should render 0 cards', async(() => {
    inject([Http], (http: Http) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      spyOn(app, 'getJson').and.returnValue(this.http.get('test-data/empty.json'));
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('mat-card').length).toEqual(0);
    });
  }));

  it('if json not empty, should rende the expected number of cards', async(() => {
    inject([Http], (http: Http) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      spyOn(app, 'getJson').and.returnValue(this.http.get('test-data/test.json'));
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('mat-card').length).toEqual(2);
    });
  }));

  it('should display the correct title', async(() => {
    inject([Http], (http: Http) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      spyOn(app, 'getJson').and.returnValue(this.http.get('test-data/test.json'));
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const cardsArray = compiled.querySelectorAll('mat-card');
      expect(cardsArray[0].querySelector('mat-title').toEqual('text.file'));
      expect(cardsArray[0].querySelector('mat-title').toEqual('text.folder'));
    });
  }));
});
