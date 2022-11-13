import { AppState } from "../AppState"

class ResetService {
  async resetAll() {
    AppState.events = []
    AppState.openedEvent = {}
    AppState.tickets = []
    AppState.comments = []
  }

  async resetEvents() {
    AppState.events = []
    AppState.openedEvent = {}
  }

  async resetComments() {
    AppState.comments = []
  }

  async resetTickets() {
    AppState.tickets
  }

  async resetOpenedEvent() {
    AppState.openedEvent = {}
  }
}

export const resetService = new ResetService()