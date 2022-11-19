import { Modal, Offcanvas } from "bootstrap";
class ModalService {

  async toggleEditProfileOffCanvas() {
    Offcanvas.getOrCreateInstance(
      document.getElementById("EditProfileOffCanvas")
    ).toggle();
  }

  async toggleCreateModal() {
    Modal.getOrCreateInstance(
      document.getElementById("CreateModal")
    ).toggle()
  }

}

export const modalService = new ModalService()