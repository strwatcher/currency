import { createEvent, createStore, sample } from "effector";

export const $source = createStore('')
export const $target = createStore('')

export const sourceAndTargetSwitched = createEvent()

sample({
    clock: sourceAndTargetSwitched,
    source: $source,
    target: $target
})

sample({
    clock: sourceAndTargetSwitched,
    source: $target,
    target: $source
})
