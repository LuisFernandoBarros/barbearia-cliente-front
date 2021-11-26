import { FormControl, FormGroup } from '@angular/forms';

export class FormValidations {


  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  static onlyNumbersValidator(control: FormControl) {
    const telefone = control.value;
    if (telefone && telefone !== '') {
      const validaTelefone = /^[0-9]+$/;
      return validaTelefone.test(telefone) ? null : { numeroInvalido: true };
    }
    return null;
  }

  static onlyCharsValidator(control: FormControl) {
    const texto = control.value;
    if (texto && texto !== '') {
      const validatexto = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
      return validatexto.test(texto) ? null : { textoInvalido: true };
    }
    return null;
  }

  static isFormValido(form: FormGroup) {
    return form.status != "INVALID";
  }

  static senhaEqualsTo(senhaField: string) {
    const validator = (formControl: FormControl) => {
      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const senhaRepeat = (<FormGroup>formControl.root).get(senhaField);

      if (senhaRepeat == null || senhaRepeat.value !== formControl.value) {
        return { senhaEqualsTo: true };
      }

      return null;
    };
    return validator;
  }

  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: otherField };
      }

      return null;
    };
    return validator;
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {

    let config = new Map<string, string>();    

    config.set('required', `${fieldName} é obrigatório.`);
    config.set('minlength', `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`);
    config.set('maxlength', `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`);
    config.set('cepInvalido', 'CEP inválido.');
    config.set('emailInvalido', 'Email já cadastrado!');
    config.set('email', 'Email inválido.');
    config.set('equalsTo', 'Campos não são iguais');
    config.set('senhaEqualsTo', 'Senhas não são iguais');
    config.set('pattern', 'Campo inválido');
    config.set('numeroInvalido', 'Número inválido.');
    config.set('textoInvalido', 'Apenas letras');


    return config.get(validatorName);
  }
}