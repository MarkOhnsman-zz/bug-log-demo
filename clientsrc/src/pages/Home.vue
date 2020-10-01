<template>
  <div class="home">
    <h1>This is your home page.</h1>
    <form @submit.prevent="createBug" class="form-inline">
      <div class="form-group">
        <label for="title"></label>
        <input
          type="text"
          class="form-control"
          name="title"
          id="title"
          placeholder="title"
          aria-describedby="helpId"
          v-model="state.newBug.title"
          required
        />
      </div>
      <div class="form-group">
        <label for="description"></label>
        <input
          type="text"
          class="form-control"
          name="description"
          id="description"
          placeholder="description"
          aria-describedby="helpId"
          v-model="state.newBug.description"
          required
        />
      </div>
      <button type="submit" class="btn btn-success">submit</button>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState, Getters } from '../AppState'
import { bugsService } from '../services/BugService'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      profile: computed(() => AppState.profile),
      bugs: computed(() => AppState.bugs),
      closedBugs: computed(Getters.openBugs),
      newBug: {
        title: '',
        description: ''
      }
    })

    return {
      state,
      async createBug() {
        await bugsService.create(state.newBug)
        state.newBug = { title: '', description: '' }
      }
    }
  }
}

</script>

<style scoped>
</style>
