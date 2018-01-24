
/* @flow */

import Watcher from './watcher'
import { log, nextTick } from '../util'

// 当前已有的id队列
let has: { [key: number]: ?true } = {}

// 队列
const queue: Array<Watcher> = []

// 是否正在执行队列刷新
let flushing = false

// 是否等待刷新
let waiting = false

function flushSchedulerQueue() {
  log('flushSchedulerQueue start')
  let watcher, id
  flushing = true

  queue.sort((a, b) => a.id - b.id)

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (let index = 0; index < queue.length; index++) {
    watcher = queue[index]
    id = watcher.id
    has[id] = null
    watcher.get()
  }

  // 清空
  queue.length = 0

  flushing = false
  waiting = false

  log('flushSchedulerQueue end')
}

export function queueWatcher(watcher: Watcher) {
  const id = watcher.id
  log('queueWatcher', id)

  // 队列里面没有
  if (has[id] == null) {
    queue.push(watcher)
  }

  // 防止重复提交
  if (!waiting) {
    waiting = true
    nextTick(flushSchedulerQueue)
  }
}
