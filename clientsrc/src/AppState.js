import { reactive } from 'vue'
// eslint-disable-next-line no-unused-vars
import Bug from './models/Bug'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  profile: {},
  /** @type {Bug[]} */
  bugs: []
})

// NOTE Getters are used for repeated computeds
export const Getters = {
  openBugs() {
    return AppState.bugs.filter(b => !b.closed)
  }
}
