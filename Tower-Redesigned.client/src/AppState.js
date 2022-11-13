import { reactive } from 'vue'
import { Account } from "./models/Account.js"
import { Comment } from "./models/Comment.js"
import { Event } from "./models/Event.js"
import { Ticket } from "./models/Ticket.js"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {Account} */
  account: {},
  /** @type {Event[]} */
  events: [],
  /** @type {Event} */
  openedEvent: {},
  /** @type {Comment[]} */
  comments: [],
  /** @type {Ticket[]} */
  tickets: []
})
