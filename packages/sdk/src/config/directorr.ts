import { configure, action } from 'mobx'
import { config } from '@nimel/directorr'

configure({
  enforceActions: 'observed',
  useProxies: 'never',
  // computedRequiresReaction: true,
  // reactionRequiresObservable: true,
  // observableRequiresReaction: true,
})

config.configure({ batchFunction: action })
