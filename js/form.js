export class Form {
  constructor() {
      // elementos del DOM
      this.formContact =  document.querySelector('#contact')
      this.inputName = document.querySelector('#name')
      this.inputEmail = document.querySelector('#email')
      this.selectSeleccion = document.querySelector('#selection')
      this.selectOther = document.querySelector('#selection-other')
      this.inputPhone = document.querySelector('#phone')
      this.textMessage = document.querySelector('#message')
      this.errorMessage = document.querySelector('#error-message')

      this.data = {
          name: '',
          email: '',
          meet_me: '',
          meet_me_other: '',
          phone: '',
          message: '',
      }

      this.selectSeleccion.addEventListener('change', this.selectionOther.bind(this))
      this.formContact.addEventListener('submit', this.leerContact.bind(this)) 

  }

  selectionOther(){
    if (this.getSelector(this.selectSeleccion) === 'otro'){
      this.selectOther.classList.add("visible")
    }else{
      this.selectOther.classList.remove("visible")
      this.selectOther.value = ''
    }
  }

  leerContact(objEv) {
      objEv.preventDefault()
      if (this.validar()) {
          this.guardarDatos()
          this.errorMessage.innerHTML = '';
      }
  }

  guardarDatos() {
      this.data = {
          name:  this.inputName.value,
          email: this.inputEmail.value ,
          meet_me: this.getSelector(this.selectSeleccion),
          meet_me_other: this.selectOther.value,
          phone: this.inputPhone.value,
          message: this.textMessage.value
      }

  console.dir(this.data)
  }

  getSelector(nodo) {
    let i = nodo.selectedIndex
    return nodo[i].value
  }

  validar() {
    if (this.validarMensaje() && this.validarNumero()){
      return true
    } else {
      return false
    }
  }

  validarMensaje() {
    if (this.textMessage.value.split(' ').length < 51) {
      return true
    }
    this.errorMessage.innerHTML = 'El mensaje es demasiado largo '
      return false

  }

  validarNumero() {
    let phoneNumber = this.inputPhone.value
    let value = true;
    if (phoneNumber.length === 9 && phoneNumber.match(/^[0-9]+$/) != null){
      return true
    }
      this.errorMessage.innerHTML = 'Introduce un numero de teléfono de 9 digitos'
      return false
  }
}