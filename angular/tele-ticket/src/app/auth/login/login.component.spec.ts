import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { AuthHomeService } from '../services/auth.service';
import { User } from '../../models/users/user';
import { Observable } from 'rxjs/Observable';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let submitEl: DebugElement;
    let loginEl: DebugElement;
    let passwordEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
            ],
            providers: [
                { provide: ToastrService },
                { provide: AuthHomeService },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        // create component and test fixture
        fixture = TestBed.createComponent(LoginComponent);

        // get test component from the fixture
        component = fixture.componentInstance;

        // Manually trigger the ngOnInit lifecycle function on our component
        // Angular won't do this for us
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('Form invalid when empty', () => {
        expect(component.rForm.valid).toBeFalsy();
    })

    it(`should create a 'FormGroup' comprised of FormControls`, () => {
        component.ngOnInit();
        expect(component.rForm instanceof FormGroup).toBe(true);
    })

    it('Email field validity', () => {
        let errors = {};
        let email = component.rForm.controls['email'];
        expect(email.valid).toBeFalsy();

        // Email field is required

        errors = email.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set email to something
        email.setValue('test');
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['pattern']).toBeTruthy();
        
        // Set email to something correct
        email.setValue('test@gmail.com');
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['email']).toBeFalsy();
        expect(errors['pattern']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
        expect(errors['maxlength']).toBeFalsy();
    })

    it('Password field validity', () => {
        let errors = {};
        let password = component.rForm.controls['password'];
        expect(password.valid).toBeFalsy();

        // Password field is required

        errors = password.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set password to something
        password.setValue('123');
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
     

        // Set password to something correct
        password.setValue('123456789');
        errors = password.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeFalsy();
        expect(errors['maxlength']).toBeFalsy();
    })

    // it('Submitting a form emits a user', () => {
    //     expect(component.rForm.valid).toBeFalsy();
    //     component.rForm.controls['email'].setValue('zhi@gmail.com');
    //     component.rForm.controls['password'].setValue('12345678');
    //     expect(component.rForm.valid).toBeTruthy();

    //     let user: any;

    //     // Subscribe to the Observable and store the user in a local variable
    //     // component.loginUser.subscribe((value) => user = value);

    //     component.auth.login(user).subscribe((value) => {
    //         value === 'ok'
    //     });

    //     // Trigger the login function
    //     component.loginUser();

    //     // Now we can check to make sure the emitted value is correct
    //     expect(user.email).toBe('zhi@gmail.com');
    //     expect(user.password).toBe('12345678');


    // })
});
