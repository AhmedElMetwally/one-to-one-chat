import { FormGroup , Validators , FormControl } from '@angular/forms';

// create new form 
// with email and password
// formControlName : ('' , [Validators])
export const signinMyform: FormGroup = new FormGroup({ 
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('', [Validators.required , Validators.minLength(8) , Validators.maxLength(30)])
})

// create new form 
// with name and email and password
// formControlName : ('' , [Validators])
export const signupMyform : FormGroup = new FormGroup({ 
    name : new FormControl('' , [Validators.required , Validators.minLength(5),Validators.maxLength(30)]),
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('', [Validators.required , Validators.minLength(8) , Validators.maxLength(30)])
}) 