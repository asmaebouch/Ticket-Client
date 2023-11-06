import { FormGroup } from "@angular/forms";

export default class ValidateForm{
    static validateAllFormFileds(formGroup:FormGroup){
        Object.keys(formGroup.controls).forEach(field=>{
    const control = formGroup.get(field);
    if(control instanceof FormGroup){
      control.markAsDirty({onlySelf:true});
    }else if(control instanceof FormGroup){
      this.validateAllFormFileds(control)
    }
    
        })
    }
}