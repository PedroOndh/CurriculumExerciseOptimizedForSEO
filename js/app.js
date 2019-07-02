class Form {
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

class Menu {
  constructor() {
      // elementos del DOM
      this.main = document.querySelector('main')
      this.aside = document.querySelector('aside')
      this.bars = document.querySelector(".fa-bars")
      this.times = document.querySelector(".fa-times")
      this.elementsToScroll = document.querySelectorAll(".goto")
      this.menuItems = document.querySelectorAll("aside li")
      this.offsets = {}
      this.showOnScroll()
      this.openCloseMenu()
      this.prepararNavegacion()
      window.addEventListener('scroll', this.changeMenuStyle.bind(this))
      this.menuItems.forEach((item) => {item.addEventListener('click', this.goTo.bind(this))})
  }

  showOnScroll() {
    window.addEventListener('scroll', scrollHeader)
    let main = this.main
    let aside = this.aside

    function scrollHeader() {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        main.classList.add("scrolled")
        aside.classList.add("scrolled")
      } else {
        main.classList.remove("scrolled")
        aside.classList.remove("scrolled")
      }
    }
  }

  openCloseMenu() {
    this.bars.addEventListener('click', () => { this.aside.classList.remove("closed"); })
    this.times.addEventListener('click', () => { this.aside.classList.add("closed"); })
  }

  changeMenuStyle () {
    let pageOffset = window.pageYOffset
    let menuItem = 0
    if (pageOffset < this.offsets['#quien-soy']) {
      menuItem = 0
    } else if (pageOffset >= this.offsets['#quien-soy'] && pageOffset < this.offsets['#estudios']) {
      menuItem = 1
    } else if (pageOffset >= this.offsets['#estudios'] && pageOffset < this.offsets['#experiencia']) {
      menuItem = 2
    } else if (pageOffset >= this.offsets['#experiencia'] && pageOffset < this.offsets['#sobre-mi']) {
      menuItem = 3
    } else if (pageOffset >= this.offsets['#sobre-mi'] && pageOffset < this.offsets['#contacto']) {
      menuItem = 4
    }else {
      menuItem = 5
    }
    this.menuItems.forEach(
        (item) => item.classList.remove('active')
    )
    this.menuItems[menuItem].classList.add('active')
  }

  prepararNavegacion() {
      this.elementsToScroll.forEach(
          (item) => {
              let cumulative =  (this.cumulativeOffset(item) - 200)
              this.offsets['#'+item.id] = cumulative
          }
      )

  }

  cumulativeOffset (element) {
      var top = 0
      do {
          top += element.offsetTop || 0
          element = element.offsetParent
      } while(element)
      return top;
  }

  goTo(item) {
    let elementClass = item.target.classList
    let elementClass2 = elementClass[0].substring(5)
    let elementClass3 = `#${elementClass2}`
    let scrollNumber = this.offsets[elementClass3]

      window.scroll({
        top: scrollNumber + 1, 
        left: 0, 
        behavior: 'smooth'
      })
    
  }
}

function app() {
  new Menu()
  new Form()
}

document.addEventListener('DOMContentLoaded', app)