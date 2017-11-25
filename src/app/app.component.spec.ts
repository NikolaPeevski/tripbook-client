import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TopBarComponent } from './layout/TopBar.component';

import { RouterTestingModule } from '@angular/router/testing';
import { CustomMaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from './shared/Review.service';
import { httpWrapperService } from './shared/httpWrapper.service';
import { UserService } from './shared/User.service';
import { JWTHandlerService } from './shared/JWTHandler.service';
import { AreaService } from './shared/Area.service';
import { ParamsService } from './shared/params.service';
import { SearchService } from './shared/Search.service';
import { LocalsService } from './shared/Locals.service';
import { TripsService } from './shared/Trips.service';

import { HttpModule } from '@angular/http';

import { Angular2TokenService } from 'angular2-token';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TopBarComponent
      ],
      imports: [
        RouterTestingModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
        ReviewService,
        httpWrapperService,
        Angular2TokenService,
        UserService,
        JWTHandlerService,
        AreaService,
        ParamsService,
        SearchService,
        LocalsService,
        TripsService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
