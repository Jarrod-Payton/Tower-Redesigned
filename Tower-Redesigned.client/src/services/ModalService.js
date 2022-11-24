import { Modal, Offcanvas } from "bootstrap";
class ModalService {

  async toggleEditProfileOffCanvas() {
    Offcanvas.getOrCreateInstance(
      document.getElementById("EditProfileOffCanvas")
    ).toggle();
  }

  async toggleCreateEventModal() {
    Modal.getOrCreateInstance(
      document.getElementById("CreateModal")
    ).toggle()
  }

  async toggleEditEventModal() {
    Modal.getOrCreateInstance(
      document.getElementById("EditModal")
    ).toggle()
  }

}

export const modalService = new ModalService()