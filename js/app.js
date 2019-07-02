import  { Menu } from './menu.js'
import  { Form } from './form.js'

function app() {
  new Menu()
  new Form()
}

document.addEventListener('DOMContentLoaded', app)