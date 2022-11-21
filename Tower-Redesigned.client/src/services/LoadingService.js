import { AppState } from "../AppState"

class LoadingService {
  
  async startLoading() {
    AppState.loading = true
  }

  async stopLoading() {
    AppState.loading = false
  }

}

export const loadingService = new LoadingService()